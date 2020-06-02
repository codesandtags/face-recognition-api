const logRequest = (req) => {
    // --- Request
    console.log('Headers', req.headers);
    console.log('Methods', req.method);
    console.log('URL', req.url);
    console.log('Body', req.body);
}

module.exports = {
    logRequest
}