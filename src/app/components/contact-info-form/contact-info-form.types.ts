import { Vehicle } from "@/interfaces/vehicle";

export type ContactInfoFormProps = {
  carId?: number;
  className?: string;
};

export interface ContactFormViewProps {
  carId?: number;
  className?: string;
  vehicle?: Vehicle;
  isPending: boolean;
  canSendMessage: () => boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
