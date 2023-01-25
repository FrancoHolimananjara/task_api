const db = require('../models');
const Task = db.Task;

const Op = require('sequelize');
const verifyCollection = require('../utils/verifyCollectionById');

const create = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        const { nom,description } = req.body;
        const existingTask = await Task.findOne({where:{nom}});

        if (existingTask) {
            res.status(409).json({
                message:"Tache déjè existé",
            })
        } else {
            if (await verifyCollection(collectionId)) {
                const task = await Task.create({nom,description,collectionId});
                await task.save();
                res.status(201).json({
                    message:"Tache bien ajouté",
                    data:task
                })
            } else {
                res.status(404).json({
                    message:"Collection invalid",
                })
            }
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getAll = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        if (await verifyCollection(collectionId)) {
            const tasks = await Task.findAll({where:{collectionId}});
            if (tasks.length>0) {
                res.status(200).json({
                    message:"Tous les taches",
                    data:tasks
                })
            } else {
                res.status(404).json({
                    message:"Tache vide",
                    data:[]
                })
            }
        } else {
            res.status(404).json({
                message:"Collection invalid",
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getById = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        const { id } = req.params;
        if (await verifyCollection(collectionId)) {
            const task = await Task.findOne({
                where: {
                    [Op.and]: [{id},{collectionId}]
                }
            });
            if (task) {
                res.status(200).json({
                    message:"Tache",
                    data:task
                })
            } else {
                res.status(404).json({
                    message:"Identifiant 'id' inconnu"
                })
            }
        } else {
            res.status(404).json({
                message:"Collection invalid",
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const updateTask = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        const { id } = req.params;
        const updateValue = req.body;
        if (await verifyCollection(collectionId)) {
            const task = await Task.findOne({
                where: {
                    [Op.and]: [{id},{collectionId}]
                }
            });

            const newValue = {};
            Object.keys(updateValue).forEach(uv =>{
                if (updateValue[uv]!="") {
                    newValue[`${uv}`] = updateValue[uv];
                }
            })

            if (task) {
                task.set(newValue)
                await task.save();
                res.status(200).json({
                    message:"Tache modifié",
                    data:task
                })
            } else {
                res.status(404).json({
                    message:"Identifiant 'id' inconnu"
                })
            }
        } else {
            res.status(404).json({
                message:"Collection invalid",
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const deleteTask = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        const { id } = req.params;
        if (await verifyCollection(collectionId)) {
            const task = await Task.findOne({
                where: {
                    [Op.and]: [{id},{collectionId}]
                }
            });

            if (task) {
                task.destroy({});
                res.status(200).json({
                    message:"Tache supprimé"
                })
            } else {
                res.status(404).json({
                    message:"Identifiant 'id' inconnu"
                })
            }
        } else {
            res.status(404).json({
                message:"Collection invalid",
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {create,getAll,getById,updateTask,deleteTask}