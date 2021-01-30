module.exports = {
    PORT: 3000,
    HOST: 'localhost',
    INITIAL_CALLBACK: (host, port) => {
        console.log(`Server starts at http://${host}:${port}/ `);
    },

    VERSION: '1.0.0',
    APP_NAME: 'Aprendendo nodeJS com MongoDB'
};
