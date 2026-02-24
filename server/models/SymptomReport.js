const mongoose = require('mongoose');

const symptomReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: String,
  age: Number,
  gender: String,
  symptoms: {
    fever: Boolean,
    cough: Boolean,
    headache: Boolean,
    vomiting: Boolean,
    bodyPain: Boolean,
    other: String
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  prediction: String, // Possible condition
  reason: String, // Transparent reasoning
  recommendation: String,
  suggestedHospitals: [Object],
  confidenceScore: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SymptomReport', symptomReportSchema);
