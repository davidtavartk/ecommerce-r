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
  isRequired?: boolean;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
} & InputProps;

// Reusable component that can be used when we don't need to use react-hook-form
export const Input = ({
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
  onInput,
  containerClassName = '',
  inputClassName = '',
  debounceMs = 0,
  type = 'text',
  isRequired = false,
}: InternalInputProps) => {
  const [isDebouncing, setIsDebouncing] = useState(false);
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
    `focus:outline-none text-l-blue border-[1px] rounded-lg`,
    !!errorMessage ? 'border-c-orange ' : 'border-[#E1DFE1]',
    // type === 'number'
    //   ? 'appearance-textfield [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    //   : '',
  );

  useEffect(() => {
    if (debounceMs > 0 && localValue !== value) {
      setIsDebouncing(true);
      const timer = setTimeout(() => setIsDebouncing(false), debounceMs);
      return () => clearTimeout(timer);
    }
  }, [localValue, value, debounceMs]);

  return (
    <TextField aria-label={name} isInvalid={!!errorMessage} className={containerClassName}>
      <div className="relative">
        {isRequired && placeholder && localValue === '' && (
          <span className="text-l-blue pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 transform text-sm">
            {placeholder}
          </span>
        )}
        <AriaInput
          type={type}
          value={localValue}
          onChange={handleChange}
          onInput={onInput}
          aria-label={name}
          placeholder={!isRequired ? placeholder : ''}
          className={twMerge(baseInputStyles, inputClassName)}
        />
        {isDebouncing && (
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <div className="h-3 w-3 animate-spin rounded-full border border-gray-300 border-t-orange-500" />
          </div>
        )}
        {errorMessage && errorMessage.trim() && errorMessage !== '__NO_DISPLAY__' && (
          <FieldError className="text-c-orange absolute top-full left-0 mt-0.5 px-1.5 text-[10px] font-light tracking-tight">
            {errorMessage}
          </FieldError>
        )}
      </div>
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
