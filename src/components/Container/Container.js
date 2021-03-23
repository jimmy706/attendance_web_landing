import React from 'react';
import classnames from 'classnames';
function Container(props) {
    const { children, fluid = false, className } = props;

    return (
        <div className={`container ${classnames({ 'container--fluid': fluid })} ${className}`}>
            {children}
        </div>
    )
}

export default Container;