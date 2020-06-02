const

const handleGetProfile = checkIfAuthenticated => async (req, res, admin) => {
    if (req.authId) {
        admin
            .auth()
            .getUser(req.authId)
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:', userRecord.toJSON());
                res.status(200)
                    .send(userRecord.toJSON());

            })
            .catch(function(error) {
                console.log('Error fetching user data:', error);
                res.status(500).send({
                    error: error,
                    errorMessage: 'Error getting the user'
                });
            });
    } else {
        res.status(404).send({
            errorMessage: 'Profile does not exist'
        });
    }
}

module.exports = {
    handleGetProfile
}