import React from 'react';
import { Link } from 'react-router-dom';

import Emoji from '../components/emoji';

const Nav = ({ title, options }) => (
    <ul className='nav__list'>
        <li>
            <Link to={title.route} className='nav__title'>
                <Emoji description={title.description} icon={title.icon} />
                &nbsp; {title.text}
            </Link>
        </li>
        <li className='text-right'>
            <ul className='nav__list'>
                {options.map((option, index) => (
                    <li className='small-text-middle' key={`option-${index}`}>
                        <Link to={option.route}>
                            <Emoji description={option.descrition} icon={option.icon} />
                            &nbsp; {option.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    </ul>
);

export default Nav;