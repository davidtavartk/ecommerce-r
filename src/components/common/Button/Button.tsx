import { ButtonProps } from '../types/propTypes';

const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button className={`py-2.5 cursor-pointer rounded-[10px] ${className}`} {...props}>
      <span className="flex items-center justify-center text-[14px]">{children}</span>
    </button>
  );
};

export default Button;
