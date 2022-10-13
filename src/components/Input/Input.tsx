import classNames from 'classnames';
import React from 'react';
import './Input.scss';

type Props = {
  type: string;
  value: string;
  placeholder: string;
  handleChange: (value: string) => void;
  errorMessage: string;
  hasError: boolean;
  inputHint?: string;
};

export const Input:React.FC<Props> = React.memo(({ 
  type, value, placeholder, handleChange, errorMessage, hasError, inputHint
}) => {
  return (
    <>
      <input 
        type={type} 
        className={classNames('Input', {
          'Input--hasError' : hasError,
        })}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}

      />

      <div className="Error">
        {hasError 
          ? (
          <p className='Error__Message'>
            {errorMessage}
          </p>
        ) : (
          <p className='InputHint'>
            {inputHint}
          </p>
        )}
      </div>
    </>
  )}
)
