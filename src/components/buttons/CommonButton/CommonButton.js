import React from 'react';

function CommonButton(props) {
    const { children, className, buttonType = 'default', type = 'button', width = 'auto', disabled = false, loading = false } = props;

    function handleClick(e) {
        if (props.onClick) {
            props.onClick(e);
        }
    }

    return (
        <button
            style={{ width }}
            type={type}
            className={`button 
            ${disabled || loading ? 'disabled' : ''} 
            button--${buttonType}`}
            onClick={handleClick}
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