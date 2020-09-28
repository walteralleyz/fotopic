import React, { useState } from 'react';

import { baseLink, links } from '../helpers/routes';
import { sendData } from '../helpers/fetch';

import { Holder as HolderAbout } from '../components/forms/about';

function About() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    const handleSend = () => {
        if(name && email && msg) {
            sendData(
                baseLink + links.email.base + links.email.send,
                JSON.stringify({ name, email, msg }),
                'POST'
            )
            .then(data => window.alert('Enviado!'));
        }
    };

    return (
        <HolderAbout
            userData={{ name, email, msg }}
            changer={{ setName, setEmail, setMsg }}
            send={handleSend}
        />
    )
}

export default About;