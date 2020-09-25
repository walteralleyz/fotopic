import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveDataStorage, getDataStorage } from '../helpers/auth';
import * as actions from '../actions/itemaction';

import Holder from '../components/forms/newlist';
import Aside from '../components/modular/aside';

function NewList({ itemsProps, addItem, removeItem }) {
    const [section, setSection] = useState('mercearia');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('kg');
    const [id, setId] = useState(0);

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

    useEffect(() => {
        restoreStorage();
    }, [restoreStorage]);

    return (
        <div className='holder--list'>
            <Aside products={itemsProps} handler={removeItemFromList} />

            <Holder
                type={{value: type, changer: setType}}
                section={{value: section, changer: setSection}}
                quantity={{value: quantity, changer: setQuantity}}
                item={{value: item, changer: setItem}}
                handleAdd={handleAdd}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    itemsProps: state.item
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(actions.addItem(item)),
    removeItem: id => dispatch(actions.removeItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewList);