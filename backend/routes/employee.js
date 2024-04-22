// employeesRouter.js
const express = require('express');
const router = express.Router();
const empModel = require('../models/employee');

// Create Employee
router.post('/', async (req, res) => {
    try {
        const employee = await empModel.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Employees
router.get('/', async (req, res) => {
    try {
        const employees = await empModel.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Single Employee
router.get('/:id', async (req, res) => {
    try {
        const employee = await empModel.findById(req.params.id);
        if (employee === null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Employee
router.put('/:id', async (req, res) => {
    try {
        const employee = await empModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (employee === null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Employee
router.delete('/:id', async (req, res) => {
    try {
        const employee = await empModel.findByIdAndDelete(req.params.id);
        if (employee === null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
