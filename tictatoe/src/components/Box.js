import React from 'react';

const BoxComponent = props => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default BoxComponent;