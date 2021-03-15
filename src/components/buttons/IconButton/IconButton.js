import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    transition: all .2s ease;
    display: flex;
    justify-content: center;
    align-items:center;
    border: 0;
    &:hover {
        background-color: #ededed;
    }
    &:active {
        background-color: #d1d1d1;
    }
`;

export default function IconButton(props) {
    function handleClick(e) {
        if (props.onClick) {
            props.onClick(e);
        }
    }

    return (
        <Button onClick={handleClick}>
            {props.children}
        </Button>

    )
}