import React from 'react';

const Emoji = ({ icon, description }) => (
    <span role='img' aria-label={description}>
        { EmojiList[icon] }
    </span>
);

const EmojiList = {
    'laptop': <>&#128187;</>,
    'book': <>&#128214;</>,
    'market': <>&#128722;</>
};

export default Emoji;