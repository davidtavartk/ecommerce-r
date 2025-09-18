import Image from 'next/image';
import { CircleButtonProps } from '../types/propTypes';

const CircleButton = ({ photoSrc, size = 100, onClick, children }: CircleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex cursor-pointer items-center justify-center rounded-full ${!photoSrc ? 'border border-[#E1DFE1]' : ''}`}
      style={{ width: size, height: size }}
      type="button"
    >
      {photoSrc ? (
        <Image src={photoSrc} alt="avatar" width={size} height={size} className="aspect-square rounded-full object-cover" />
      ) : (
        children
      )}
    </button>
  );
};

export default CircleButton;
