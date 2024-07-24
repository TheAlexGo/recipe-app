import {
  FC,
  FormEventHandler,
  JSX,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react';

import cn from 'classnames';

import { getInputClasses } from '@/components/Input/class';

interface ITextarea
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  rows?: 1 | 2 | 3 | 5;
}

export const TextArea: FC<ITextarea> = ({
  value: _value,
  defaultValue,
  rows = 1,
  ...props
}): JSX.Element => {
  const [value, setValue] = useState(_value || defaultValue || '');
  const inputHandler: FormEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(_value || defaultValue || '');
  }, [_value, defaultValue]);

  return (
    <div className={getInputClasses({})}>
      <div
        className={cn(
          'relative grid after:invisible after:whitespace-pre-wrap after:content-[attr(data-value)]',
          {
            'after:min-h-4': rows === 1,
            'after:min-h-8': rows === 2,
            'after:min-h-16': rows === 3,
            'after:min-h-64': rows === 5,
          },
        )}
        data-value={`${value} `}
      >
        <textarea
          {...props}
          className="absolute inset-0 resize-none overflow-hidden focus-visible:outline-0"
          rows={rows}
          onInput={inputHandler}
          value={value}
        />
      </div>
    </div>
  );
};
