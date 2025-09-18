'use client';

import { useState, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import CircleButton from '../Button/CircleButton';

interface AvatarInputProps {
  name: string;
  size?: number;
}

export const RHFAvatarInput = ({ name, size = 88 }: AvatarInputProps) => {
  const { control } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (file: File | null, onChange: (file: File | undefined) => void) => {
    if (file) {
      onChange(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleRemove = (onChange: (file: File | undefined) => void) => {
    onChange(undefined);
    setPreview(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className='flex gap-5 items-center'>
          <div className="flex cursor-pointer items-center gap-4" onClick={handleClick}>
            <CircleButton photoSrc={preview || undefined} size={size}>
              <Image src="/svgs/cameraIcon.svg" alt="upload" width={24} height={24} />
            </CircleButton>
            <span className="text-sm">Upload image</span>
          </div>

          {preview && (
            <span
              className="cursor-pointer text-sm hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(onChange);
              }}
            >
              Remove
            </span>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null, onChange)}
            className="hidden"
          />
        </div>
      )}
    />
  );
};
