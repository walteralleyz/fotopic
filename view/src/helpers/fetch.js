export const getData = async (link, token) => {
    const container = await fetch(link, {
        headers: new Headers({
            'x-access-token': token
        })
    });

    const response = await container.json();

    return response;
};

export const sendData = async (link, body, method, token) => {
    const container = await fetch(link, {
        method,
        body,
        headers: new Headers({
            'content-type': 'application/json',
            'x-access-token': token
        })
    });

    const response = await container.json();

    return response;
};