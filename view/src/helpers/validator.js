export const isEmail = email => {
    // eslint-disable-next-line
    const regex = /\S+@\S+\.\S+/;
    const matcher = regex.test(email);

    return matcher;
}