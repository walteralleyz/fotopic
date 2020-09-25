import React, { useState } from 'react';

import Holder from '../components/forms/signup';

export default function Signup() {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    return (
        <Holder
            name={{value: userName, changer: setUserName}}
            email={{value: userEmail, changer: setUserEmail}}
        />
    )
}