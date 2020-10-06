import React, { useState, useEffect, useCallback } from 'react';

import { getData } from '../../helpers/fetch';
import { baseLink, links } from '../../helpers/routes';
import { getDataStorage } from '../../helpers/auth';

import Button from '../modular/button';
import Emoji from '../modular/emoji';

const Aside = ({ products, handler, store, submit, expand }) => {
    const [stores, setStores] = useState('');

    const getStores = useCallback(() => {
        getData(
            baseLink + links.scraper.base, 
            getDataStorage('user').token
        )
            .then(data => {
                if(!data.error) setStores(data.storeName);
            })
    }, []);

    useEffect(() => getStores(), [getStores]);

    return (
        <aside className='aside'>
            <div className={`holder--product ${expand.text === 'Fechar' && 'slide--down'}`}>
                {products.map((product, i) => (
                    <div key={`product-${i}`} className='product' data-id={i}>
                        <h4 className='product__title'>
                            {product.item}
                            <Emoji icon={'exit'} description={'excluir'} handler={handler} />
                        </h4>

                        <div className='product__description'>
                            <small>{product.section}</small>
                            <small>{product.quantity}</small>
                            <small>{product.type}</small>
                        </div>
                    </div>
                ))}
            </div>
            <div className='aside__bottom'>
                <span 
                    className='aside__expand' 
                    onClick={() => expand.handle(expand.text === 'Expandir' ? 'Fechar' : 'Expandir')}>
                        {expand.text}
                </span>

                <select
                    value={store.value}
                    onChange={e => store.changer(e.currentTarget.value)}
                    style={{ width: '100%' }}
                    required
                >
                    {stores && stores.map((s, i) => (
                        <option key={i} value={s}>
                            {s.substring(0, 1).toUpperCase() + s.substring(1)}
                        </option>
                    ))}
                </select>

                <Button
                    type='submit'
                    text='Salvar Lista'
                    size='full'
                    handler={submit}
                />
            </div>
        </aside>
    )
}

export default Aside;