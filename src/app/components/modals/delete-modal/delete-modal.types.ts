export interface DeleteModalProps {
  isOpen: boolean;
  deleteSessionPending: boolean;
  onClose: () => void;
  onDelete: () => void;
}
