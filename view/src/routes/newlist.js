import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveDataStorage, getDataStorage, removeStorage } from '../helpers/auth';
import { sendData } from '../helpers/fetch';
import { baseLink, links } from '../helpers/routes';
import * as actions from '../actions/itemaction';

import Holder from '../components/forms/newlist';
import Aside from '../components/modular/aside';

function NewList({ itemsProps, addItem, removeItem, clearItem }) {
    const [store, setStore] = useState('');
    const [section, setSection] = useState('mercearia');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('kg');
    const [id, setId] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const [expand, setExpand] = useState('Expandir');

    const { ID } = useParams();

    const handleAdd = () => {
        setId(prevCounter => prevCounter + 1);

        const itemDetails = { section, item, quantity, type, id }
        
        updateStorage(itemDetails);
        resetFields();
        addItem(itemDetails);
    };

    const updateStorage = item => {
        let storage = getDataStorage('list') || false;

        if(storage) {
            storage = [...storage, item];
            saveDataStorage('list', storage);
        } else saveDataStorage('list', [item]);
    };

    const resetFields = () => {
        setSection('mercearia');
        setItem('');
        setQuantity(0);
        setType('kg');
    };

    const restoreStorage = useCallback(() => {
        const storage = getDataStorage('list') || false;

        if(storage && !itemsProps.length) {
            setId(storage.length);

            for(let s of storage) {
                addItem(s);
            }
        }
    }, [addItem, itemsProps]);

    const removeItemFromList = e => {
        const parent = e.currentTarget.parentNode.parentNode;
        const parentId = parent.dataset.id;
        const dataStorage = itemsProps.filter((data, i) => i !== +parentId);

        saveDataStorage('list', dataStorage);
        removeItem(parentId);
    };

    const handleSubmit = () => {
        let jsonData = {
            store,
            section: [],
            item: [],
            type: [],
            quantity: []
        }

        const user = getDataStorage('user');
        const sendLink = ID
        ? baseLink + links.items.base + '/' + ID
        : baseLink + links.items.base + links.items.new;
        const method = ID ? 'PUT' : 'POST';

        if(store && store.length >= 4) {
            for(let i of itemsProps) {
                jsonData.section.push(i.section);
                jsonData.item.push(i.item);
                jsonData.type.push(i.type);
                jsonData.quantity.push(i.quantity);
            }

            sendData(
                sendLink,
                JSON.stringify({ email: user.email, ...jsonData }),
                method,
                user.token
            )
            .then(data => {
                if(!data.error) {
                    removeStorage('list');
                    setRedirect(true);
                }
            });
        }
    };

    useEffect(() => {
        restoreStorage();
    }, [restoreStorage]);

    useEffect(() => {
        clearItem()
    }, [clearItem]);

    return (
        <div className='holder--list'>
            <Aside 
                products={itemsProps} 
                handler={removeItemFromList} 
                store={{value: store, changer: setStore}}
                submit={handleSubmit}
                expand={{ text: expand, handle: setExpand }}
            />

            <Holder
                type={{value: type, changer: setType}}
                section={{value: section, changer: setSection}}
                quantity={{value: quantity, changer: setQuantity}}
                item={{value: item, changer: setItem}}
                handleAdd={handleAdd}
            />

            { redirect && <Redirect to='/' />}
        </div>
    )
}

const mapStateToProps = state => ({
    itemsProps: state.item
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(actions.addItem(item)),
    removeItem: id => dispatch(actions.removeItem(id)),
    clearItem: () => dispatch(actions.clearItem())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewList);