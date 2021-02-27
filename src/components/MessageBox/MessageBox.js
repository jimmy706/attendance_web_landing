import React from 'react';

function MessageBox(props) {
    const { type = 'error', message = '', title = '' } = props;
    return (
        <div className={`message-box message-box--${type}`}>
            {title ? <h4 className='message-box__title'>{title}</h4> : null}
            <p className='message-box__message'>{message}</p>
        </div>
    )
}

export default MessageBox;