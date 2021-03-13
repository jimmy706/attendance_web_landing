import React, { useState } from 'react';
import classnames from 'classnames';
import Container from '../Container/Container';
function Tabs(props) {
    const { tabs, activePosition, onChangeTab } = props;
    const [activePos, setActivePos] = useState(isNaN(Number(activePosition)) ? Number(activePosition) : 0);
    function renderTabs() {
        return tabs.map((tab, i) => (
            <Tabs.Tab
                onClick={() => handleChangeTab(i)}
                key={i}
                content={tab.content}
                icon={tab.icon}
                active={i === activePos} />
        ))
    }

    function handleChangeTab(position) {
        onChangeTab(position);
        setActivePos(position);
    }

    return (
        <div className='tabs-bar container1'>
            <ul className='tabs-bar__content'>
                {renderTabs()}
            </ul>
        </div>
    )
}

Tabs.Tab = function (props) {
    const { active } = props;

    return (
        <li
            onClick={props.onClick}
            className={`tabs-bar__item ${classnames({ active })}`}>
            {props?.icon} {props.content}
        </li>
    )
}

export default Tabs;