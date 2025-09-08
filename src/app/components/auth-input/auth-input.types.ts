export type AuthInputFieldProps = {
  iconImg: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
};
