export const routes = {
    signin: '/signin',
    signup: '/signup',
    signout: '/signout',
    new: '/new',
    edit: '/edit/:ID',
    about: '/about',
    api: '/api',
    main: '/'
};

export const baseLink = `https://sprlist.herokuapp.com/api`;

export const links = {
    items: {
        base: '/item',
        new: '/new'
    },

    user: {
        base: '/user',
        signup: '/signup',
        signin: '/signin',
        verify: '/verifysign'
    },

    email: {
        base: '/email',
        send: '/incoming'
    }
};
