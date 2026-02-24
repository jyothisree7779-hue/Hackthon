const SymptomReport = require('../models/SymptomReport');
const { analyzeSymptoms } = require('../services/aiService');

const createReport = async (req, res) => {
    try {
        const analysis = analyzeSymptoms(req.body.symptoms);
        const report = new SymptomReport({
            userId: req.user.id,
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            symptoms: req.body.symptoms,
            ...analysis
        });
        await report.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserReports = async (req, res) => {
    try {
        const reports = await SymptomReport.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllReports = async (req, res) => {
    try {
        const query = {};
        if (req.query.riskLevel) query.riskLevel = req.query.riskLevel;
        const reports = await SymptomReport.find(query).sort({ createdAt: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createReport, getUserReports, getAllReports };
