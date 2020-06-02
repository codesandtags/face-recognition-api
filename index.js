const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(express.json());
app.use(cors())

// Integrations
const api = require('./api');
const firebaseIntegration = api.firebase;

// API Routes - End-points
// Routes - Default endpoint
app.get('/', api.version.handleVersion);

// Routes - Endpoints for Authentication
app.post('/register', api.authentication.handleRegister);
app.post('/signin', api.authentication.handleLogin);
app.post('/signout', api.authentication.handleSignOut);

// Routes - Endpoints for profile
app.get('/profile', api.user.handleGetProfile);

// Routes -Endpoints for detections
// TODO: Add endpoints

app.listen(3005, () => {
    console.log('App running in [3005] port. Navigate to http://localhost:3000/ ');
});