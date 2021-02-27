import React from 'react';
import classnames from 'classnames';
function Container(props) {
    const { children, fluid = false } = props;

    return (
        <div className={`container ${classnames({'container--fluid': fluid})}`}>
            {children}
        </div>
    )
}

export default Container;