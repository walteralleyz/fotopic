import React from 'react';

const Toast = ({ text, status }) => (
    <div className={`toast toast--${status}`}>
        { text }
    </div>
);

export default Toast;