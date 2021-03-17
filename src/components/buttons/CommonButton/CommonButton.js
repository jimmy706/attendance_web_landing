import React from 'react';
import classnames from 'classnames';

function CommonButton(props) {
    const { children, className, buttonType = 'default', type = 'button', width = 'auto', disabled = false, loading = false } = props;
    const cn = classnames('button', className ? className : '', `button--${buttonType}`, { 'disabled': disabled || loading });
    function handleClick(e) {
        if (props.onClick) {
            props.onClick(e);
        }
    }



    return (
        <button
            style={{ width }}
            type={type}
            className={cn}
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