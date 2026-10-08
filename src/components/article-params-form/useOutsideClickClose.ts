import { useEffect } from 'react';

import type { RefObject } from 'react';

type UseOutsideClickCloseParams = {
  isOpen: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
}: UseOutsideClickCloseParams): void => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleMouseDown = (event: MouseEvent): void => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return (): void => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, rootRef, onClose]);
};
