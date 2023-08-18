const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')
const { Op } = require('sequelize')

module.exports = class UserController {

    static async SignIn(req, res){

        const { nome, sobrenome, email, senha, confirm_senha,  telefone} = req.body;

        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório'});
            return
        };

        if(!sobrenome){
            res.status(422).json({message: 'O sobrenome é obrigatório'});
            return
        };

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'});
            return
        };
        if(!telefone){
            res.status(422).json({message: 'O telefone é obrigatório'});
            return
        };

        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'});
            return
        };
        if(!confirm_senha){
            res.status(422).json({message: 'A confirmação de senha é obrigatória'});
            return
        };

        if(confirm_senha !== senha){
            res.status(422).json({message: 'A senha e confirmação de senha não conferem obrigatória'});
            return
        };

        if(email == undefined){

            res.status(400).json({message: 'O e-mail é invalido'});
            return
        };
        
        const userExists = await User.findOne({where: { email: email }});

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)
        
        const user = {
            nome,
            sobrenome,
            email,
            senha: passwordHash,
            telefone
        };


        if (userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
        return
        };

       
        try{

            await User.create(user).then(
               async user => { await createUserToken(user, req, res)}
            ).catch(err => console.log(err))

            
        } catch(err){
            res.status(400).json({ message: err })
        }
    }

    static async Login(req, res){
        const {email, senha} = req.body

        
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }
        
        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        const user = await User.findOne({where: {email: email}})
        if(!user){
            res.status(422).json({message: 'Usuário ou senha inválidos'})
            return
        }


        const passwordMatch = bcrypt.compareSync(senha, user.senha)

        if(!passwordMatch){
            res.status(422).json({message: 'Usuário ou senha inválidos'})
            return
        }

        await createUserToken(user, req, res)
    }

    static async updateUser (req, res){
        const { id_user,nome, sobrenome, email, telefone} = req.body;

        if(!id_user){
            res.status(422).json({message: 'O id do usuário é obrigatório'});
            return
        };
        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório'});
            return
        };

        if(!sobrenome){
            res.status(422).json({message: 'O sobrenome é obrigatório'});
            return
        };

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'});
            return
        };
        if(!telefone){
            res.status(422).json({message: 'O telefone é obrigatório'});
            return
        };

        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'});
            return
        };
        

        if(email == undefined){

            res.status(400).json({message: 'O e-mail é invalido'});
            return
        };

        try{

            const updatedUser = {
                nome,
                sobrenome,
                email,
                telefone
            };

            await User.update(updatedUser, 
                {where: { id_user: id_user }
            }).then(
               async user => res.send(200).json({
                success: true,
                user
               })
            ).catch(err => console.log(err))

            
        } catch(err){
            res.status(400).json({ message: err })
        }

    }

}