const jwt = require('jsonwebtoken')
const JWT = {
    generateToken: (data, expires) => {

        return jwt.sign(data, 'secret', { expiresIn: expires })
    },
    verifyToken: (token) => {
        try {
            return jwt.verify(token, 'secret')
        } catch (error) {
            return false
        }
    }
}
module.exports = JWT