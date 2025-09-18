import { ButtonProps } from '../types/propTypes';

const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button className={`bg-c-orange cursor-pointer rounded-[10px] py-2.5 ${className}`} {...props}>
      <span className="flex items-center justify-center text-[14px] text-white">{children}</span>
    </button>
  );
};

export default Button;
