import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getData, sendData } from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import { getDataStorage, saveDataStorage } from '../helpers/auth';
import * as actions from '../actions/toastactions';

import Table from '../components/modular/table';
import Modal from '../components/modular/modal';

function Main({ toastStatus, toastText }) {
    const [itemList, setItemList] = useState(false);
    const [user, setUser] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [modal, setModal] = useState({
        title: 'Tem certeza que deseja excluir?',
        visible: false
    });

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const items = useCallback(() => {
        if(user) {
            const link = `${baseLink}${links.items.base}/${user.id}`;

            getData(link, user.token)
            .then(data => {
                if(!data.error)
                    setItemList(data)

                setLoading(false);
            });
        }
    }, [user]);

    const showModal = id => {
        setDeleteId(id);
        setModal({ ...modal, visible: true });
    };

    const remove = () => {
        sendData(
            baseLink + links.items.base + '/' + deleteId,
            null,
            'DELETE',
            user.token
        )
        .then(data => {
            toastText('Lista removida!');
            toastStatus('success');

            setModal({ ...modal, visible: false });
            items();
        });
    };

    const edit = id => {
        const buyList = itemList.filter((item) => item.id === id);
        const list = rebuildList(buyList[0]);

        saveDataStorage('list', list);
        setDeleteId(id);
        setRedirect(true);
    };

    useEffect(() => setUser(getDataStorage('user')), []);
    useEffect(() => items(), [items]);

    return (
        <div className='holder--table'>
        {!loading ? 
            itemList && itemList.length ? 
                itemList.map((item, i) => 
                    <Table 
                        item={item} 
                        i={i} 
                        obj={rebuildList(item)}
                        remove={showModal}
                        key={i}
                        edit={edit}
                    />)
            : 
                <div style={{ width: '100%', color: '#fff', textShadow: '0 0 1px #333' }}>
                    <h1 style={{ textAlign: 'center' }}>Você ainda não tem nenhuma lista!</h1>    
                </div>
        : <div className='loader'></div>
        }

            {modal.visible && <Modal title={modal.title} verifySign={remove}>
                <p style={{ marginBottom: '16px' }}>Deseja excluir?</p>
            </Modal>}

            {redirect && <Redirect to={`/edit/${deleteId}`} />}
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

const mapStateToProps = state => ({
    toastText: state.toast.text,
    toastStatus: state.toast.status
});

const mapDispatchToProps = dispatch => ({
    toastText: text => dispatch(actions.toastText(text)),
    toastStatus: status => dispatch(actions.toastStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);