export interface EditModalProps {
  isOpen: boolean;
  currentTitle: string;
  editSessionPending: boolean;
  onClose: () => void;
  onChange: (val: string) => void;
  onUpdate: () => void;
}
