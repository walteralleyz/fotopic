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
        <tfoot>
            <tr>
                <td colSpan={4}><i style={{ fontWeight: 'bold' }}>Total Estimado: {calcTotal(obj)}</i></td>
            </tr>
        </tfoot>
    </table>
);

const calcTotal = obj => {
    let prices = [];
    let total;

    for(let o of obj) {
        let singular = o.item.trim().split(' ');
        let price = singular[singular.length -1];

        price = parseFloat(singular[singular.length -1]
            .replace(',', '.')
            .replace('R$', '')
        );

        if(!isNaN(price))
            prices.push(o.quantity * price);
    }

    total = prices.length && prices.reduce((a, b) => a + b);

    return !isNaN(total) && `R$${total.toFixed(2)}`;
}

export default Table;