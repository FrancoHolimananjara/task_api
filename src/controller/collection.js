const db = require('../models');
const Collection = db.Collection;
const Task = db.Task;
const create = async(req,res)=>{
    try {
        const { id, pseudo } = req.user;
        console.log(pseudo);
        const { nom }=req.body;
        // verifer s'il existe déjà
        const existingColleciton = await Collection.findOne({where:{nom}});
        if (!existingColleciton) {
            const collection = await Collection.create({nom,userId:id});
            await collection.save();
            res.status(201).json({
                message:"Collection ajouté",
                data:collection
            })
        } else {
            res.status(409).json({
                message:"Collection déjà existé"
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getAll = async(req,res)=>{
    try {
        const collections = await Collection.findAll({
            include:[
                {
                    model:Task,
                    attributes:['id','nom','description']
                }
            ]
        });
        if (collections.length>0) {
            res.status(200).json({
                message:"Tous les collections",
                data:collections
            })
        }else{
            res.status(404).json({
                message:"Collection vide",
                data:[]
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getById = async(req,res)=>{
    try {
        const { id } = req.params;
        const collection = await Collection.findOne({
            where:{id} ,
            include:[
            {
                model:Task,
                attributes:['id','nom','description']
            }
        ]});

        if (collection) {
            res.status(200).json({
                message:"Collection",
                data:collection
            })
        } else {
            res.status(404).json({
                message:"Identifiant 'id' inconnu"
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateCollection = async(req,res)=>{
    try {
        const { id } = req.params;
        const updateValue = req.body;
        const collection = await Collection.findOne({where:{id}});

        const newValue = {};

        Object.keys(updateValue).forEach(uv =>{
            if (updateValue[uv]!="") {
                newValue[`${uv}`] = updateValue[uv];
            }
        })
        console.log(newValue);
        if (collection) {
            collection.set(newValue);
            await collection.save();
            res.status(200).json({
                message:"Collection modifié",
                data:collection
            })
        } else {
            res.status(404).json({
                message:"Identifiant 'id' inconnu"
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const deleteCollection = async(req,res)=>{
    try {
        const { id } = req.params;
        const collection = await Collection.findOne({where:{id}});

        if (collection) {
            collection.destroy({});
            res.status(200).json({
                message:"Collection supprimé"
            })
        } else {
            res.status(404).json({
                message:"Identifiant 'id' inconnu"
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {create,getAll,getById,updateCollection,deleteCollection}