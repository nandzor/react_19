
import React from 'react';

const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    width: 'calc(100% - 18px)', // Adjust for padding
};

export function Input(props) {
    return <input style={inputStyle} {...props} />;
}
