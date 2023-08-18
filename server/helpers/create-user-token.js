const jwt = require("jsonwebtoken");
require('dotenv').config()



const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      id: user?.id_user,
      name: user?.nome,
      email: user?.email,
      
    },
    process.env.JWT_KEY,{expiresIn: '24h'}
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    success: true,
    data: {

      token: token,
      user: {
        id_user: user?.id_user,
        nome: user?.nome,
        sobrenome: user?.sobrenome,
        email: user?.email,
        telefone: user?.telefone,
        status: user?.status
      },
    }
  });
  
};

module.exports = createUserToken;
