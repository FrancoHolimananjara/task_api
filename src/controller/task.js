const db = require('../models');
const Task = db.Task;

const create = async(req,res)=>{
    try {
        const { collectionId } = req.params;
        console.log(collectionId);
        const { nom,description } = req.body;
        const existingTask = await Task.findOne({where:{nom}});

        if (existingTask) {
            res.status(409).json({
                message:"Tache déjè existé",
                data:existingTask
            })
        } else {
            const task = await Task.create({nom,description,collectionId});
            await task.save();
            res.status(201).json({
                message:"Tache bien ajouté",
                data:task
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getAll = async(req,res)=>{
    try {
        const tasks = await Task.findAll({});
        if (tasks.length>0) {
            res.status(200).json({
                message:"Tous les taches",
                data:tasks
            })
        } else {
            res.status(409).json({
                message:"Tache vide",
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
        const task = await Task.findOne({where:{id}});
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
    } catch (error) {
        throw new Error(error);
    }
}

const updateTask = async(req,res)=>{
    try {
        const { id } = req.params;
        const updateValue = req.body;
        const task = await Task.findOne({where:{id}});

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
    } catch (error) {
        throw new Error(error);
    }
}

const deleteTask = async(req,res)=>{
    try {
        const { id } = req.params;
        const task = await Task.findOne({where:{id}});

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
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {create,getAll,getById,updateTask,deleteTask}