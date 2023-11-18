const jwt = require('jsonwebtoken');
const keys = require('./config/jwt');

export default function checkAuth() {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token, keys.secretOrKey);
        console.log(decoded);
        return decoded;
    }
    catch (error) {
        return null;
    }
}