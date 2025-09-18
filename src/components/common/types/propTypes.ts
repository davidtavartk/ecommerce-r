export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export interface CircleButtonProps {
  photoSrc?: string;
  size?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}
