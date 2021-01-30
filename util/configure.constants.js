const PORT = process.env.SV_PORT;
const HOST = process.env.SV_HOST;

module.exports = {
    PORT,
    HOST,
    INITIAL_CALLBACK: (host, port) => {
        console.log(`Server starts at http://${host}:${port}/ `);
    },

    VERSION: '1.0.0',
    APP_NAME: 'Aprendendo nodeJS com MongoDB'
};
