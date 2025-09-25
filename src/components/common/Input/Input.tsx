import { TextField, Input as AriaInput, FieldError, InputProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { Controller, useFormContext } from 'react-hook-form';

type InternalInputProps = {
  name: string;
  errorMessage?: string;
  containerClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  showRequiredIcon?: boolean;
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
} & InputProps;

// Reusable component that can be used when we don't need to use react-hook-form
export const Input = ({
  name,
  placeholder,
  errorMessage,
  value,
  onChange,
  onInput,
  onKeyDown,
  containerClassName = '',
  inputClassName = '',
  type = 'text',
  isRequired = false,
  showRequiredIcon = false,
}: InternalInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const baseInputStyles = twMerge(
    `focus:outline-none text-l-blue border-[1px] rounded-lg`,
    !!errorMessage ? 'border-c-orange ' : 'border-[#E1DFE1]',
  );

  return (
    <TextField aria-label={name} isInvalid={!!errorMessage} className={containerClassName}>
      <div className="relative">
        {placeholder && (value === '' || !value) && (
          <span className="text-l-blue pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 transform text-sm">
            {placeholder}
            {showRequiredIcon && <span className="text-c-orange"> *</span>}
          </span>
        )}
        <AriaInput
          type={type}
          value={value ?? ''}
          onChange={handleChange}
          onInput={onInput}
          onKeyDown={onKeyDown}
          aria-label={name}
          placeholder={!isRequired && !showRequiredIcon ? placeholder : ''}
          className={twMerge(baseInputStyles, inputClassName)}
        />
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
export const RHFInput = ({ name, ...inputProps }: InternalInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest }, fieldState: { error } }) => (
        <Input value={value ?? ''} onChange={onChange} errorMessage={error?.message} {...rest} {...inputProps} />
      )}
    />
  );
};
