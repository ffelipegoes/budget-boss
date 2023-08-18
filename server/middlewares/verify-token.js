const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')
require('dotenv').config()

const checkToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message: 'Seu acesso foi negado'})
    }

    const token = getToken(req)

    if(!token){
        return res.status(401).json({message: 'Seu acesso foi negado'})
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.user = verified
        next()
    } catch(err){
        return res.status(401).json({message: 'Não Autorizado'})
    }
    
}

module.exports = checkToken