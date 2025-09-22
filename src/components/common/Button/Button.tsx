import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '../types/propTypes';

const Button = ({ className = '', disabled, children, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge('bg-c-orange flex cursor-pointer items-center justify-center rounded-[10px] py-2.5', className)}
      {...props}
      disabled={disabled}
    >
      <span className="flex items-center justify-center gap-2.5 text-sm text-white">{children}</span>
    </button>
  );
};

export default Button;
