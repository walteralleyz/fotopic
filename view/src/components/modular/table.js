import React from 'react';

import Emoji from './emoji';

const Table = ({ item, i, obj, remove, edit }) => (
    <table className='table' key={`table-${i}`}>
        <thead>
            <tr>
                <td className='text--light text--bold text--shadow text--small' colSpan={3}>
                    Mercado: {item.store} -&nbsp;
                    {new Date(+item.updatedAt).toLocaleDateString()}
                </td>

                <td className='d--flex justify--evenly clicable'>
                    <Emoji icon={'pencil'} description={'Editar'} handler={() => edit(item.id)} />
                    <Emoji icon={'exit'} description={'Excluir'} handler={() => remove(item.id)} />
                </td>
            </tr>
            <tr>
                <th>Seção</th>
                <th>Item</th>
                <th>Qtd</th>
                <th>Und</th>
            </tr>
        </thead>
        <tbody>
            {obj.map((product, i) => (
                <tr key={`product-${i}`}>
                    <td>{product.section}</td>
                    <td>{product.item}</td>
                    <td>{product.quantity}</td>
                    <td>{product.type}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default Table;