import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'grad' | 'glass' | 'none';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'grad',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  style,
}) => {
  let baseClass = '';
  if (variant === 'grad') baseClass = 'btn-grad';
  else if (variant === 'glass') baseClass = 'btn-glass';
  const combinedClass = `${baseClass} ${className}`.trim();

  if (href) {
    // If it's an external link
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={combinedClass}
          style={style}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={combinedClass}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={combinedClass}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
