export interface ClearAllModalProps {
  isOpen: boolean;
  deleteAllPending: boolean;
  onClose: () => void;
  onClearAll: () => void;
}
