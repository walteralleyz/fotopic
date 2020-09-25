import React from 'react';

import Button from '../modular/button';
import Emoji from '../modular/emoji';

const Aside = ({ products, handler }) => (
    <aside className='aside'>
        <div className='holder--product'>
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
        <div style={{ textAlign: 'center', position: 'absolute', bottom: '0', width: '100%' }}>
            <Button
                type='submit'
                text='Salvar Lista'
                size='full'
            />
        </div>
    </aside>
);

export default Aside;