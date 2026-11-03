import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal/80"
          >
            {label}
            {props.required && <span className="text-copper ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-4 py-3 bg-white text-charcoal border text-sm font-sans placeholder:text-charcoal-400 focus:outline-none transition-colors duration-150 ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
              : 'border-charcoal/20 focus:border-copper focus:ring-1 focus:ring-copper'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1 font-sans">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-charcoal-400 mt-1 font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal/80"
          >
            {label}
            {props.required && <span className="text-copper ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full px-4 py-3 bg-white text-charcoal border text-sm font-sans placeholder:text-charcoal-400 focus:outline-none transition-colors duration-150 resize-y ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
              : 'border-charcoal/20 focus:border-copper focus:ring-1 focus:ring-copper'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-600 mt-1 font-sans">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-charcoal-400 mt-1 font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-charcoal/80"
          >
            {label}
            {props.required && <span className="text-copper ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-4 py-3 bg-white text-charcoal border text-sm font-sans focus:outline-none transition-colors duration-150 ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
              : 'border-charcoal/20 focus:border-copper focus:ring-1 focus:ring-copper'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-600 mt-1 font-sans">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
