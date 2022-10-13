import classNames from 'classnames';
import React from 'react';
import { PropsWithChildren } from 'react'
import './Button.scss'

interface CustomProps {
  clickHandler?: () => void;
  width120px?: boolean;
  isDisabled?: boolean;
}

type Props = PropsWithChildren<CustomProps>

export const Button:React.FC<Props> = React.memo(
  ({ isDisabled, width120px, clickHandler, children }) => {
  return (
      <button
        onClick={clickHandler} 
        className={classNames('Button', {
          'Button--width120px' : width120px,
          'Button--disabled' : isDisabled,
        })}
        disabled={isDisabled}
      >
          {children}
      </button>
  )}
)
