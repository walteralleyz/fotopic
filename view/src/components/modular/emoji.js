import React from 'react';

const Emoji = ({ icon, description, handler }) => (
    <span 
        role='img' 
        aria-label={description} 
        title={description}
        onClick={handler}
    >
        {EmojiList[icon]}
    </span>
);

const EmojiList = {
    'laptop': <>&#128187;</>,
    'book': <>&#128214;</>,
    'market': <>&#128722;</>,
    'phone': <>&#128226;</>,
    'doc': <>&#128221;</>,
    'exit': <>&#10060;</>,
    'pencil': <>&#128397;</>
};

Emoji.defaultProps = {
    handler: () => null
};

export default Emoji;