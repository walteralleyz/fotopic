import React from 'react';

import Button from './button';

const Modal = ({ title, code, setCode, verifySign }) => (
    <div className='modal'>
        <div className='modal__container'>
            <div className='modal__head'>
                <h3>{title}</h3>
            </div>
            <div className='modal__body'>
                <div className='holder--code'>
                    <input
                        onChange={e => e.currentTarget.value = e.currentTarget.value.split('')[0]}
                        onKeyPress={e => setCode({ ...code, a: +e.key })}
                        type='number'
                        max={9}
                        value={code.a}
                    />
        
                    <input
                        onChange={e => e.currentTarget.value = e.currentTarget.value.split('')[0]}
                        onKeyPress={e => setCode({ ...code, b: +e.key })}
                        type='number'
                        max={9}
                        min={0}
                        value={code.b}
                    />
        
                    <input
                        onChange={e => e.currentTarget.value = e.currentTarget.value.split('')[0]}
                        onKeyPress={e => setCode({ ...code, c: +e.key })}
                        type='number'
                        max={9}
                        min={0}
                        value={code.c}
                    />
        
                    <input
                        onChange={e => e.currentTarget.value = e.currentTarget.value.split('')[0]}
                        onKeyPress={e => setCode({ ...code, d: +e.key })}
                        type='number'
                        max={9}
                        min={0}
                        value={code.d}
                    />
                </div>
                <Button
                    type='submit'
                    text='Confirmar'
                    color='red'
                    size='large'
                    handler={verifySign}
                />
            </div>
        </div>
    </div>
);

export default Modal;