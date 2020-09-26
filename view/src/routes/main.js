import React, { useCallback, useEffect, useState } from 'react';

import { getData, sendData } from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import { getDataStorage } from '../helpers/auth';

import Table from '../components/modular/table';
import Modal from '../components/modular/modal';

export default function Main() {
    const [itemList, setItemList] = useState(false);
    const [user, setUser] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [modal, setModal] = useState({
        title: 'Tem certeza que deseja excluir?',
        visible: false
    });

    const items = useCallback(() => {
        if(user) {
            const link = `${baseLink}${links.items.base}/${user.id}`;

            getData(link, user.token)
            .then(data => setItemList(data));
        }
    }, [user]);

    const showModal = id => {
        setDeleteId(id);
        setModal({ ...modal, visible: true });

        console.log(id);
    };

    const remove = () => {
        sendData(
            baseLink + links.items.base + '/' + deleteId,
            null,
            'DELETE',
            user.token
        )
        .then(data => window.location.reload());
    };

    useEffect(() => setUser(getDataStorage('user')), []);
    useEffect(() => items(), [items]);

    return (
        <div className='holder--table'>{itemList 
            ? itemList.map((item, i) => 
            <Table 
                item={item} 
                i={i} 
                obj={rebuildList(item)}
                remove={showModal}
                key={i}
            />)
            : 'main'}

            {modal.visible && <Modal title={modal.title} verifySign={remove}>
                <p style={{ marginBottom: '16px' }}>Deseja excluir?</p>
            </Modal>}
        </div>
    )
}

const rebuildList = list => {
    let newList = [];
    const parseItems = JSON.parse(list.items);

    for(let i = 0; i < parseItems.section.length; i++) {
        let json = {
            section: parseItems.section[i],
            item: parseItems.item[i],
            type: parseItems.type[i],
            quantity: parseItems.quantity[i]
        };

        newList.push(json);
    }

    return newList.sort((a, b) => a.section.localeCompare(b.section));
};