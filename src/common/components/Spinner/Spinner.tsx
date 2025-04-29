import { Loader2 } from 'lucide-react';
import { FC } from 'react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 24, className = '' }) => {
  return (
    <Loader2
      className={`animate-spin text-gray-500 ${className}`}
      size={size}
      strokeWidth={2}
    />
  );
};
