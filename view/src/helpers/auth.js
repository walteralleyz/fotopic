export const isAuthenticated = key => {
    const user = getDataStorage(key) || {};

    return user.id && user.email && user.token;
};

export const saveDataStorage = (key, data) => {
    if(typeof window !== 'undefined')
        localStorage.setItem(key, JSON.stringify(data));
};

export const getDataStorage = key => {
    if(typeof window !== 'undefined')
        return JSON.parse(localStorage.getItem(key));
}

export const removeStorage = key => {
    if(typeof window !== 'undefined')
        localStorage.removeItem(key);
}