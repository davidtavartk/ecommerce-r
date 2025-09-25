import { twMerge } from 'tailwind-merge';
import { LoadingSpinnerProps } from '../../types/propTypes';

const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={twMerge('border-c-orange/20 border-t-c-orange animate-spin rounded-full', sizeClasses[size], className)} />
  );
};

export default LoadingSpinner;
