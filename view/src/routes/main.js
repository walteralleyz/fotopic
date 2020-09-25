import React, { useCallback, useEffect, useState } from 'react';

import { getData } from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import { getDataStorage } from '../helpers/auth';

export default function Main() {
    const [itemList, setItemList] = useState(false);
    const [user, setUser] = useState(false);

    const items = useCallback(() => {
        if(user) {
            const link = `${baseLink}${links.items.base}/${user.id}`;

            getData(link, user.token)
            .then(data => setItemList(data));
        }
    }, [user]);

    useEffect(() => setUser(getDataStorage('user')), []);
    useEffect(() => items(), [items]);

    return (
        <div>{itemList ? 'items' : 'main'}</div>
    )
}