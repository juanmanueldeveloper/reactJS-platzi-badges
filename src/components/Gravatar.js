import md5 from 'md5';
import React from 'react';

function Gravatar(props){
    const email = props.email;
    const hash = md5(email);

    return (
        <img className={props.className} src={`https://www.gravatar.com/avatar/${hash}`} alt="Avatar" />
    )
}

export default Gravatar;