import { ButtonProps } from '../types/propTypes';

const Button = ({ filled = false, className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={` ${filled ? '' : 'text-black'} ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
