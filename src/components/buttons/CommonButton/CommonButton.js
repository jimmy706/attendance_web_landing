import React from 'react';

function CommonButton(props) {
    const { children, className, buttonType = 'default', type = 'button', width = 'auto', disabled = false, loading = false } = props;

    return (
        <button
            style={{ width }}
            type={type}
            className={`button 
            ${disabled || loading ? 'disabled' : ''} 
            button--${buttonType}`}
        >
            {
                loading ? (
                    <div className='button__loading'>

                    </div>
                ) : children
            }
        </button>
    )
}



export default CommonButton;