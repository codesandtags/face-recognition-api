const { logRequest } = require('../utils');
const firebaseAPI = require('../integrations/firebase');

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin
                .auth()
                .verifyIdToken(authToken);
            req.authId = userInfo.uid;
            console.log('User Info ', userInfo);
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
};

const handleRegister = (req, res) => {
    logRequest(req);
    const { email, password } = req.body;

    if (email && password) {
        firebaseAPI
            .firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                res.status(200).send({
                    message: 'user registered successful!'
                });
            })
            .catch(function(error) {
                console.log('Damn! there is an error', error);
                res.status(400).send({
                    errorCode: error.code,
                    errorMessage: error.message
                });
            });
        return;
    }

    res.status(400).send({
        errorCode: 400,
        errorMessage: 'You need to send an email and password to be registered'
    });
}

const handleLogin = (req, res) => {
    logRequest(req);
    const { email, password } = req.body;

    if (email && password) {
        firebaseAPI
            .firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const response = userCredential.credential;
                const token = await userCredential.user.getIdToken();
                console.log(response);

                res.status(200).send({
                    token: token
                });
            })
            .catch(function(error) {
                console.log('Damn! there is an error', error);
                res.status(400).send({
                    errorCode: error.code,
                    errorMessage: error.message
                });
            });
        return;
    }

    res.status(400).send({
        errorCode: 400,
        errorMessage: 'You need to send an email and password to be registered'
    });
}

const handleSignOut = (req, res) => {
    logRequest(req);
    firebaseAPI
        .firebase
        .auth()
        .signOut()
        .then(function(response) {
            console.log('Response Signout ', response);
            res.status(400).send({
                message: 'Sign out successful!'
            })
        }).catch(function(error) {
        res.status(500).send({
            errorCode: error.code,
            errorMessage: error.message
        });
    });
}

module.exports = {
    handleRegister,
    handleLogin,
    handleSignOut
}