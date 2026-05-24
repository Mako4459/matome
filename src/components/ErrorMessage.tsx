import { AlertTriangle } from 'lucide-react';

type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <div className="error-message" role="alert">
      <AlertTriangle size={19} aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
