import React from 'react';

import Form from '../modular/form';
import Input from '../modular/input';
import Select from '../modular/select';
import Button from '../modular/button';

const Holder = ({ section, item, quantity, type, handleAdd, products }) => (
    <Form title='Cadastro de Item'>
        <Select
            value={section.value}
            changer={e => section.changer(e.currentTarget.value)}
            name='Setor'
            options={[
                { value: 'mercearia', text: 'Mercearia' },
                { value: 'acougue', text: 'Açougue' },
                { value: 'frios', text: 'Frios' },
                { value: 'adega', text: 'Adega' },
                { value: 'higiene', text: 'Higiene' },
                { value: 'horti', text: 'Hortifruti' },
                { value: 'padaria', text: 'Padaria' },
                { value: 'rotisseria', text: 'Rotisseria' }
            ]}
        />

        <Input
            type='text'
            value={item.value}
            changer={e => item.changer(e.currentTarget.value)}
            text='Ex.: Tomate'
            name='Produto'
            list='prod'
        />

        <Input
            type='number'
            value={quantity.value}
            changer={e => quantity.changer(e.currentTarget.value)}
            text='Ex.: 10'
            name='Quantidade'
        />

        <Select
            value={type.value}
            changer={e => type.changer(e.currentTarget.value)}
            name='Unidade'
            options={[
                { value: 'kg', text: 'Kg' },
                { value: 'un', text: 'Unidade' }
            ]}
        />

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Button
                type='submit'
                color='purple'
                text='Adicionar Item'
                handler={handleAdd}
            />
        </div>

        <datalist id='prod'>
            {products && products.map((p, i) => (
                <option key={i} value={p}>{p}</option>
            ))}
        </datalist>
    </Form>
);

export default Holder;