const db = require('../models');
const User = db.User;
const { Op } = require('sequelize');

const register = async (req, res) => {
    try {
        const user = await create(req.body);
        res.status(201).json({
            message: "Compte créer",
            data:user
        })
    } catch (error) {
        throw new Error(error);
    }
}
const login = async (req, res) => {
    try {
        const { pseudo, mdp } = req.body;
        const user = await User.findOne({ where: { pseudo } });
        if (user) {
            if (mdp === user.mdp) {
                res.status(200).json({
                    message:"Connecté"
                })
            } else {
                res.status(400).json({
                    message:"Mot de passe invalide"
                })
            }
        } else {
            throw new Error("Information perso invalid");
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function create(data) {
    const { pseudo, email, mdp } = data;
    if (!pseudo || !email || !mdp) {
        throw new Error("Information perso invalide")
    } else {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ pseudo }, { email }]
            }
        });
        if (user) {
            throw new Error("Utilisateur déjà existé");
        } else {
            const newUser = await User.create({ pseudo, email, mdp });
            return newUser;
        }
    }
}

module.exports = { register, login };