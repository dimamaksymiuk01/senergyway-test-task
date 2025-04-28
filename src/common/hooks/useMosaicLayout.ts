import { UseMosaicLayoutProps, UseMosaicLayoutResult } from '@/common/interfaces';
import { useEffect } from 'react';
import { MosaicNode } from 'react-mosaic-component';
import { CompanyId } from '@/common/types';
import { buildLayout, getVisibleCompanies } from '@/common/utils';
import { useLocalStorage } from '@/common/hooks/useLocalStorage.ts';

export const useMosaicLayout = ({
  currentCompanies,
  isMobile,
}: UseMosaicLayoutProps): UseMosaicLayoutResult => {
  const [savedLayout, setSavedLayout] = useLocalStorage<MosaicNode<CompanyId> | null>(
    'mosaic-layout',
    null,
  );

  const [savedActiveWindows, setSavedActiveWindows] = useLocalStorage<CompanyId[]>(
    'active-windows',
    [],
  );

  const [fullScreenWindow, setFullScreenWindow] = useLocalStorage<CompanyId | null>(
    'fullscreen-window',
    null,
  );

  const [previousLayout, setPreviousLayout] =
    useLocalStorage<MosaicNode<CompanyId> | null>('previous-layout', null);

  useEffect(() => {
    const visibleCompanies = getVisibleCompanies(currentCompanies);

    if (!savedLayout || currentCompanies.some((id) => !savedActiveWindows.includes(id))) {
      const initial = visibleCompanies.length
        ? buildLayout(visibleCompanies, isMobile)
        : null;
      setSavedLayout(initial);
      setSavedActiveWindows(visibleCompanies);
      setFullScreenWindow(null);
    }
  }, [currentCompanies, isMobile]);

  const closeWindow = (id: CompanyId) => {
    if (fullScreenWindow === id) exitFullScreen();

    const newActiveWindows = savedActiveWindows.filter((windowId) => windowId !== id);
    setSavedActiveWindows(newActiveWindows);

    const updateLayoutAfterClose = (
      layout: MosaicNode<CompanyId> | null,
      id: CompanyId,
    ): MosaicNode<CompanyId> | null => {
      if (!layout) return null;

      if (typeof layout === 'string') {
        return layout === id ? null : layout;
      }

      const { direction, first, second, splitPercentage } = layout;

      const updatedFirst = updateLayoutAfterClose(first, id);
      const updatedSecond = updateLayoutAfterClose(second, id);

      if (!updatedFirst && !updatedSecond) return null;
      if (!updatedFirst) return updatedSecond;
      if (!updatedSecond) return updatedFirst;

      return {
        direction,
        first: updatedFirst,
        second: updatedSecond,
        splitPercentage,
      };
    };

    setSavedLayout((prevLayout) => updateLayoutAfterClose(prevLayout, id));
  };

  const restoreWindow = (id: CompanyId) => {
    if (savedActiveWindows.includes(id)) return;

    setSavedActiveWindows((prev) => [...prev, id]);

    setSavedLayout((prev) =>
      prev
        ? {
            direction: isMobile ? 'column' : 'row',
            first: prev,
            second: id,
            splitPercentage: 70,
          }
        : id,
    );
  };

  const enterFullScreen = (id: CompanyId) => {
    setPreviousLayout(savedLayout);
    setFullScreenWindow(id);
    setSavedLayout(id);
  };

  const exitFullScreen = () => {
    if (previousLayout) {
      setSavedLayout(previousLayout);
      setFullScreenWindow(null);
    }
  };

  const resetLayout = () => {
    const visibleCompanies = getVisibleCompanies(currentCompanies);
    const initial = visibleCompanies.length
      ? buildLayout(visibleCompanies, isMobile)
      : null;

    setSavedLayout(initial);
    setSavedActiveWindows(visibleCompanies);
    setFullScreenWindow(null);
  };

  const onChangeLayout = (newLayout: MosaicNode<CompanyId> | null) => {
    setSavedLayout(newLayout || null);
  };

  return {
    layout: savedLayout,
    activeWindows: savedActiveWindows,
    fullScreenWindow,
    closeWindow,
    restoreWindow,
    enterFullScreen,
    exitFullScreen,
    resetLayout,
    onChangeLayout,
  };
};
