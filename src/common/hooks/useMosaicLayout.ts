import { useState, useRef, useEffect } from 'react';
import { MosaicNode, MosaicDirection, getLeaves } from 'react-mosaic-component';
import { CompanyId } from '@/common/types';
import { companiesDataInfo } from '@/common/constants';
import { UseMosaicLayoutProps, UseMosaicLayoutResult } from '@/common/interfaces';

export const useMosaicLayout = ({
  currentCompanies,
  isMobile,
}: UseMosaicLayoutProps): UseMosaicLayoutResult => {
  const [layout, setLayout] = useState<MosaicNode<CompanyId> | null>(null);
  const [activeWindows, setActiveWindows] = useState<CompanyId[]>([]);
  const [previousLayout, setPreviousLayout] = useState<MosaicNode<CompanyId> | null>(
    null,
  );
  const [fullScreenWindow, setFullScreenWindow] = useState<CompanyId | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const layoutBeforeDragRef = useRef<MosaicNode<CompanyId> | null>(null);
  const initialLayoutRef = useRef<MosaicNode<CompanyId> | null>(null);

  // Generate initial layout based on filtered companies
  const generateInitialLayout = (): MosaicNode<CompanyId> | null => {
    // Filter companies that should be visible
    const visibleCompanies = currentCompanies.filter(
      (id) => companiesDataInfo[id].mosaicPositioning?.defaultVisible !== false,
    );

    if (visibleCompanies.length === 0) return null;
    if (visibleCompanies.length === 1) return visibleCompanies[0];

    // Create mosaic structure based on sorted list of companies
    const buildLayout = (companies: CompanyId[]): MosaicNode<CompanyId> => {
      if (companies.length === 1) return companies[0];
      if (companies.length === 2) {
        return {
          direction: isMobile
            ? ('column' as MosaicDirection)
            : ('row' as MosaicDirection),
          first: companies[0],
          second: companies[1],
          splitPercentage: 50,
        };
      }

      // For three or more companies, create balanced structure
      const midIndex = Math.floor(companies.length / 2);
      const firstHalf = companies.slice(0, midIndex);
      const secondHalf = companies.slice(midIndex);

      return {
        direction:
          companies.length > 4 || isMobile
            ? ('column' as MosaicDirection)
            : ('row' as MosaicDirection),
        first: firstHalf.length === 1 ? firstHalf[0] : buildLayout(firstHalf),
        second: secondHalf.length === 1 ? secondHalf[0] : buildLayout(secondHalf),
        splitPercentage: (firstHalf.length / companies.length) * 100,
      };
    };

    return buildLayout(visibleCompanies);
  };

  // Update layoutRef when page changes or mode changes (mobile/desktop)
  useEffect(() => {
    initialLayoutRef.current = generateInitialLayout();
    setLayout(initialLayoutRef.current);

    // Update list of active windows
    setActiveWindows(
      currentCompanies.filter(
        (id) => companiesDataInfo[id].mosaicPositioning?.defaultVisible !== false,
      ),
    );
    setFullScreenWindow(null);
  }, [currentCompanies, isMobile]);

  // Apply z-index for windows and set drag event handlers
  useEffect(() => {
    const applyWindowStyles = () => {
      // For each company, check z-index settings
      currentCompanies.forEach((id) => {
        const company = companiesDataInfo[id];
        if (company.mosaicPositioning?.zIndex) {
          const windows = document.querySelectorAll(
            `[title="Company info: ${company.ticker}"]`,
          );
          windows.forEach((window) => {
            const windowParent = window.closest('.mosaic-window');
            if (windowParent) {
              (windowParent as HTMLElement).style.zIndex = String(
                company.mosaicPositioning?.zIndex || 10,
              );
            }
          });
        }
      });
    };

    applyWindowStyles();

    // Add global drag handlers
    const handleDragStart = (e: MouseEvent) => {
      // Find closest mosaic window
      const windowElement = (e.target as HTMLElement).closest('.mosaic-window');
      if (windowElement) {
        // Save current layout before drag
        layoutBeforeDragRef.current = layout;
        setIsDragging(true);
        // Set high z-index for dragged window
        (windowElement as HTMLElement).style.zIndex = '1000';
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      if (layout && activeWindows.length > 0) {
        const leaves = getLeaves(layout);
        if (leaves.length < activeWindows.length) {
          // Restore layout if window disappeared
          setLayout(layoutBeforeDragRef.current);
        }
      }
      // Restore z-index
      applyWindowStyles();
    };

    document.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mouseup', handleDragEnd);

    return () => {
      document.removeEventListener('mousedown', handleDragStart);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [layout, activeWindows, currentCompanies]);

  // Window operations
  const closeWindow = (id: CompanyId) => {
    if (fullScreenWindow === id) {
      exitFullScreen();
    }

    setActiveWindows((prev) => prev.filter((windowId) => windowId !== id));

    const updateLayout = (
      node: MosaicNode<CompanyId> | null,
    ): MosaicNode<CompanyId> | null => {
      if (node === null) return null;
      if (typeof node === 'string') {
        return node === id ? null : node;
      }

      const first = updateLayout(node.first);
      const second = updateLayout(node.second);

      if (first === null && second === null) return null;
      if (first === null) return second;
      if (second === null) return first;

      return { ...node, first, second };
    };

    const updatedLayout = updateLayout(layout);
    setLayout(updatedLayout || null);
  };

  const restoreWindow = (id: CompanyId) => {
    if (!activeWindows.includes(id)) {
      setActiveWindows((prev) => [...prev, id]);

      const newLayout = layout
        ? {
            direction: isMobile
              ? ('column' as MosaicDirection)
              : ('row' as MosaicDirection),
            first: layout,
            second: id,
            splitPercentage: 70,
          }
        : id;

      setLayout(newLayout);

      // Apply z-index for new window
      const zIndex = companiesDataInfo[id].mosaicPositioning?.zIndex;
      if (zIndex) {
        // Use MutationObserver instead of setTimeout
        const observer = new MutationObserver(() => {
          const windows = document.querySelectorAll(
            `[title="Company info: ${companiesDataInfo[id].ticker}"]`,
          );
          windows.forEach((window) => {
            const windowParent = window.closest('.mosaic-window');
            if (windowParent) {
              (windowParent as HTMLElement).style.zIndex = String(zIndex);
              observer.disconnect(); // Disconnect observation after applying style
            }
          });
        });

        // Observe DOM changes
        observer.observe(document.body, { childList: true, subtree: true });

        // Protect against memory leaks - disconnect observer after some time
        requestAnimationFrame(() => {
          observer.disconnect();
        });
      }
    }
  };

  const enterFullScreen = (id: CompanyId) => {
    setPreviousLayout(layout);
    setFullScreenWindow(id);
    setLayout(id);
  };

  const exitFullScreen = () => {
    if (previousLayout) {
      setLayout(previousLayout);
      setFullScreenWindow(null);
    }
  };

  // Reset to initial layout
  const resetLayout = () => {
    const initialLayout = initialLayoutRef.current;
    setLayout(initialLayout);

    // Update list of active windows
    const pageCompanies = currentCompanies.filter(
      (id) => companiesDataInfo[id].mosaicPositioning?.defaultVisible !== false,
    );

    setActiveWindows(pageCompanies);
    setFullScreenWindow(null);
  };

  // Layout change monitor
  const onChangeLayout = (newNode: MosaicNode<CompanyId> | null) => {
    if (isDragging && newNode) {
      // Check that no window was lost from active ones
      const newLeaves = getLeaves(newNode);
      const hasAllActiveWindows = activeWindows.every((id) => newLeaves.includes(id));

      if (!hasAllActiveWindows) {
        console.warn(
          'Detected missing windows during drag operation, restoring previous layout',
        );
        return;
      }
    }

    setLayout(newNode || null);
  };

  return {
    layout,
    previousLayout,
    activeWindows,
    fullScreenWindow,
    isDragging,
    closeWindow,
    restoreWindow,
    enterFullScreen,
    exitFullScreen,
    resetLayout,
    onChangeLayout,
  };
};
