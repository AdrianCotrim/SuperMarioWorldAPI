require('dotenv').config();

const checkApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if(apiKey && apiKey === process.env.API_KEY) {
        return next();
    }
    return res.status(401).json({ error: 'Acesso não autorizado: chave inválida ou ausente.'});
}

module.exports = checkApiKey;