const { logRequest } = require('../utils');

const handleVersion = (req, res) => {
    logRequest(req);
    const apiDetails = {
        version: '1.0.0',
        name: 'Face Recognition Brain Api',
        description: 'This is the API for the Face Recognition Brain Web App',
        contact: 'For more information please contact to codesandtags@gmail.com'
    };
    res.send(apiDetails);
}

module.exports = {
    handleVersion
}