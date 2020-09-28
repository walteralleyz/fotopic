import React from 'react';

import Chave from '../../images/chave.png';

export const Holder = () => (
    <>
        <div className='content'>
            <h1>EndPoints para a API</h1>
            <ul>
                <li>
                    <h3>Listas</h3>
                    <ul>
                        <li>
                            Base: /item     <br />
                            Novo: /new      <br />
                            Deletar: /id    <br />
                            Buscar: /userID <br />
                        </li>
                    </ul>
                </li>
                <li>
                    <h3>Usuários</h3>
                    <ul>
                        <li>
                            Base: /user     <br />
                            Criar: /signup  <br />
                            Entrar: /signin <br />
                            Verificar Login: 
                            /verifysign     <br />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div className='content'>
            <h3>Autorização</h3>
            <p>
                Para fazer uma requisição, você precisa adicionar <br />
                um header chamado <i>x-access-token</i> <br />
                e passar o seu token de usuário!
            </p>

            <img 
                src={Chave} 
                alt='chave'
                style={{ position: 'absolute', top: 25, right: 25, maxWidth: '25px' }}
            />
        </div>
    </>
);