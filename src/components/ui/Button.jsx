import React from 'react';

// Ganti dengan library styling favorit Anda (CSS Modules, Tailwind, etc.)
const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const disabledStyle = {
  backgroundColor: '#cccccc',
  cursor: 'not-allowed',
};

export function Button({ children, ...props }) {
  const style = props.disabled ? { ...buttonStyle, ...disabledStyle } : buttonStyle;
  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
}