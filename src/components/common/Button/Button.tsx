import { ButtonProps } from '../types/propTypes';

const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button className={` ${className}`} {...props}>
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

export default Button;
