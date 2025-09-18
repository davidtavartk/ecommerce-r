import { useState, useEffect } from 'react';
import { TextField, Input as AriaInput, FieldError, InputProps } from 'react-aria-components';
import { useDebounce } from '@/hooks/useDebounce';
import { twMerge } from 'tailwind-merge';
import { Controller, useFormContext } from 'react-hook-form';

type InternalInputProps = {
  name: string;
  errorMessage?: string;
  containerClassName?: string;
  inputClassName?: string;
  debounceMs?: number;
} & InputProps;

// Reusable component that can be used when we don't need to use react-hook-form
export const Input = ({
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
  containerClassName = '',
  inputClassName = '',
  debounceMs = 0,
  type = 'text',
}: InternalInputProps) => {
  const [localValue, setLocalValue] = useState(value ?? '');
  const debouncedValue = useDebounce(localValue, debounceMs ?? 0);

  // Update local value when external value changes
  useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  // Call onChange when debounced value changes
  useEffect(() => {
    if (debounceMs && debouncedValue !== value && onChange) {
      onChange(debouncedValue as any);
    }
  }, [debouncedValue, onChange, debounceMs, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    // If no debounce, call onChange immediately
    if (!debounceMs && onChange) {
      onChange(e);
    }
  };

  const baseInputStyles = twMerge(
    ``,
    !!errorMessage ? '' : '',
    type === 'number'
      ? 'appearance-textfield [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      : '',
  );

  return (
    <TextField aria-label={name} isInvalid={!!errorMessage} className={twMerge('space-y-2', containerClassName)}>
      <div className="relative">
        <AriaInput
          type={type}
          value={localValue}
          onChange={handleChange}
          aria-label={name}
          placeholder={placeholder}
          className={twMerge(baseInputStyles, inputClassName)}
        />
      </div>
      <FieldError className="text-md text-red-600">{errorMessage}</FieldError>
    </TextField>
  );
};

// Reusable component that can be used when we need to use react-hook-form and automatically integrate with the form
export const RHFInput = ({ name, debounceMs, ...inputProps }: InternalInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
        <Input
          value={value ?? ''}
          onChange={onChange}
          errorMessage={error?.message}
          debounceMs={debounceMs}
          {...rest}
          {...inputProps}
        />
      )}
    />
  );
};
