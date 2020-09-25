import React, { useCallback, useEffect, useState } from 'react';

import { getData } from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import { getDataStorage } from '../helpers/auth';

export default function Main() {
    const [itemList, setItemList] = useState('');
    const user = getDataStorage('user');

    const items = useCallback(() => {
        const link = `${baseLink}${links.items.base}/${user.id}`;

        getData(link)
        .then(data => setItemList(data));
    }, [user]);

    useEffect(() => items(), [items]);

    return (
        <div>Main</div>
    )
}