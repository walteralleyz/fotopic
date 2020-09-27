import React from 'react';

import Button from '../modular/button';
import Emoji from '../modular/emoji';

const Aside = ({ products, handler, store, submit, expand }) => (
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
            <input
                type='text'
                value={store.value}
                onChange={e => store.changer(e.currentTarget.value)}
                placeholder={'Nome do Mercado'}
                style={{ width: '100%' }}
                minLength={4}
                required
            />

            <Button
                type='submit'
                text='Salvar Lista'
                size='full'
                handler={submit}
            />
        </div>
    </aside>
);

export default Aside;