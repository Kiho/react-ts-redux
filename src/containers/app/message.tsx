import * as React from 'react';

function Message(props) {
    return (
        <p className="post-message">
            {props.text ? props.text : props.children}
        </p>);
}

export default Message
