import React from 'react';
import classnames from 'classnames';
function Tabs(props) {
    const { tabs, activePosition, onChangeTab } = props;
    function renderTabs() {
        return tabs.map((tab, i) => (
            <Tabs.Tab
                onClick={() => handleChangeTab(i)}
                key={i}
                content={tab.content}
                icon={tab.icon}
                active={i === activePosition} />
        ))
    }

    function handleChangeTab(position) {
        onChangeTab(position);
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