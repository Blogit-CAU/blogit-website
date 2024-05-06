'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Property } from 'csstype';

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  size: 'None' | 'XS' | 'S' | 'L' | 'XL';
  disabled?: boolean;
  radius?: boolean;
  backgroundColor: Property.BackgroundColor;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  isSubmit?: boolean;
}

// eslint-disable-next-line react/display-name
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className,
      size,
      disabled = false,
      radius = true,
      backgroundColor,
      onClick,
      style,
      children,
    }: ButtonProps,
    ref,
  ) => {
    const baseClasses = 'font-bold transition-opacity duration-150 ease-in-out';
    const disabledClasses = disabled
      ? 'opacity-40 pointer-events-none'
      : 'hover:opacity-80 active:opacity-40';
    const radiusClasses = radius ? 'rounded-xl' : 'rounded-none';

    const sizeClasses = {
      None: '',
      XS: 'w-18 h-6',
      S: 'w-21 h-9',
      L: 'w-80 h-13',
      XL: 'w-full h-full',
    };

    return (
      <button
        type={type}
        className={classNames(
          `${baseClasses} ${sizeClasses[size]} ${backgroundColor} ${radiusClasses} ${disabledClasses} shadow-md hover:shadow-lg`,
          className,
        )}
        disabled={disabled}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        style={{
          backgroundColor: backgroundColor,
          ...style,
        }}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
