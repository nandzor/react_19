
import React from 'react';

const headerStyle = {
    backgroundColor: '#20232a',
    color: '#61dafb',
    padding: '20px',
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
};

export function Header() {
    return (
        <header style={headerStyle}>
            <h1>React 19 To-Do App</h1>
        </header>
    );
}
