export type SelectionDateModalProps = {
  show: boolean;
  onClose: () => void;
  onSaveDate: (date: string | null) => void;
};
