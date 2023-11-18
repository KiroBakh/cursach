const { body, param, validationResult } = require('express-validator');
const { Module } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class ModuleController {
    async createModule(req, res) {
        try {
            const { title, description, courseId, lessons } = req.body;
            if (!ObjectId.isValid(courseId)) {
                return res.status(400).json({ error: 'Invalid courseId' });
            }
            const newModule = new Module({
                title: title,
                description: description,
                courseId: courseId,
                lessons: lessons || [], 
            });

            await newModule.save();
            res.status(201).json(newModule);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a module' });
        }
    }

    async getAllModulesForCourse(req, res) {
        try {
            const courseId = req.params.courseId;
            if (!ObjectId.isValid(courseId)) {
                return res.status(400).json({ error: 'Invalid courseId' });
            }

            const modulesForCourse = await Module.find({ courseId });

            res.json(modulesForCourse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch modules for the course' });
        }
    }


    async getAllModules(req, res) {
        try {
            const modules = await Module.find();
            res.json(modules);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch modules' });
        }
    }

    async getModuleById(req, res) {
        try {
            const moduleId = req.params.id;
            if (!ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const module = await Module.findById(moduleId);

            if (!module) {
                return res.status(404).json({ error: 'Module not found' });
            }

            res.json(module);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get module' });
        }
    }

    async updateModule(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const moduleId = req.params.id;
            const updatedModuleData = req.body;

            const updatedModule = await Module.findByIdAndUpdate(moduleId, updatedModuleData, { new: true });

            if (!updatedModule) {
                return res.status(404).json({ error: 'Module not found' });
            }

            res.json(updatedModule);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update module' });
        }
    }

    async deleteModule(req, res) {
        try {
            const moduleId = req.params.id;
            const module = await Module.findById(moduleId);

            if (!module) {
                return res.status(404).json({ error: 'Module not found' });
            }

            await Module.findByIdAndDelete(moduleId);
            res.json({ message: 'Module deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete module' });
        }
    }
}

module.exports = new ModuleController();
