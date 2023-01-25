const db = require('../models');
const User = db.User;
const { Op } = require('sequelize');

const hashData = require('../utils/hashData');
const compareData = require('../utils/compareData');
const generateToken = require('../utils/generateToken');

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
            if (await compareData(mdp, user.mdp)) {
                const token = generateToken(user);
                res.status(200).json({token});
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
            const hashedPass = await hashData(mdp);
            const newUser = await User.create({ pseudo, email, mdp:hashedPass });
            return newUser;
        }
    }
}

module.exports = { register, login };