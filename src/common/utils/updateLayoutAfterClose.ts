import { MosaicNode } from 'react-mosaic-component';
import { CompanyId } from '@/common/types';

export const updateLayoutAfterClose = (
  node: MosaicNode<CompanyId> | null,
  idToRemove: CompanyId,
): MosaicNode<CompanyId> | null => {
  if (!node) return null;
  if (typeof node === 'string') return node === idToRemove ? null : node;

  const first = updateLayoutAfterClose(node.first, idToRemove);
  const second = updateLayoutAfterClose(node.second, idToRemove);

  if (!first && !second) return null;
  if (!first) return second;
  if (!second) return first;

  return { ...node, first, second };
};
