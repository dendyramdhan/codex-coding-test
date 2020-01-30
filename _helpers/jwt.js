const expressJwt = require('express-jwt');
const config = require('../_configs/config.json');
const userService = require('../_services').user;

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            `/api/v${process.env.API_VERSION}/users/authenticate`,
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};