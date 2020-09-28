import React from 'react';

import { Holder as HolderAPI } from './api';
import { Holder as HolderContact } from './contact';

import New from '../../images/ex1.png';
import List from '../../images/ex2.png';

export const Holder = ({ userData, changer, send }) => (
    <article className='about'>
        <section>
            <div className='content'>
                <h1 className='content__title'>Para que serve esse Site?</h1>
                <p>
                    Esse Web App foi feito com a intenção de incrementar meu&nbsp;
                    <a href='https://github.com/walteralleyz' target='_blank' rel='noreferrer noopener'>portfólio</a>.
                    <br />Seu uso é extremamente simples:
                </p>

                <ul>
                    <li>Você pode criar uma lista de compras,</li>
                    <figure className='content__img'>
                        <img src={New} alt='criando lista' />
                        <figcaption>Formulário para criar uma lista</figcaption>
                    </figure>

                    <li>Você pode editar ou excluir uma lista de compras.</li>
                    <figure className='content__img'>
                        <img src={List} alt='lista criada' />
                        <figcaption>Menu com uma lista criada</figcaption>
                    </figure>
                </ul>
            </div>

            <div className='content'>
                <h4 className='content__title'>Autenticação</h4>
                <p>
                    Para acessar o aplicativo você não precisa usar senhas. Depois de inserir seu email, um código é enviado para seu email. Depois do acesso, você precisará fazer fornecer o código novamente se estiver usando outro navegador, ou apagar seu histórico.
                </p>
            </div>

            <HolderAPI />
        </section>

        <HolderContact
            userData={userData}
            changer={changer}
            send={send}
        />
    </article>
);