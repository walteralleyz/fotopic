import React from 'react';
import { Link } from 'react-router-dom';

import Emoji from '../components/emoji';

const Navbar = () => (
    <nav className='nav'>
        <ul className='nav__list'>
            <li>
                <Link to='/' className='nav__title'>
                    <Emoji description='sobre nos' icon='market' />
                    &nbsp; SuperLista
                </Link>
            </li>
            <li className='text-right'>
                <ul className='nav__list'>
                    <li className='small-text-middle'>
                        <Link to='/about'>
                            <Emoji description='sobre nos' icon='book' />
                            &nbsp; Sobre Nós
                        </Link>
                    </li>
                    <li className='small-text-middle'>
                        <Link to='/api'>
                            <Emoji description='api' icon='laptop' />
                            &nbsp; API
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
);

export default Navbar;