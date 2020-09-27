export const routes = {
    signin: '/signin',
    signup: '/signup',
    signout: '/signout',
    new: '/new',
    edit: '/edit/:ID',
    main: '/'
};

export const baseLink = `https://${window.location.host}`;

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
    }
};
