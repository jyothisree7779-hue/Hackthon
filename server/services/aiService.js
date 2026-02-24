/**
 * AI Service for Symptom Risk Classification
 * Uses a weighted scoring system to simulate ML model behavior.
 */

const WEIGHTS = {
    fever: 2,
    cough: 2,
    headache: 1,
    vomiting: 3,
    bodyPain: 1,
};

const getWeight = (symptomName) => WEIGHTS[symptomName] || 0;

const analyzeSymptoms = (symptoms) => {
    let score = 0;

    // Basic symptoms
    if (symptoms.fever) score += WEIGHTS.fever;
    if (symptoms.cough) score += WEIGHTS.cough;
    if (symptoms.headache) score += WEIGHTS.headache;
    if (symptoms.vomiting) score += WEIGHTS.vomiting;
    if (symptoms.bodyPain) score += WEIGHTS.bodyPain;

    // Process "other" symptoms for high-risk keywords (simulating NLP)
    const otherText = (symptoms.other || '').toLowerCase();
    if (otherText.includes('difficu') || otherText.includes('breath') || otherText.includes('chest pain')) {
        score += 8; // Immediate High Risk
    }
    if (otherText.includes('fainting') || otherText.includes('unconscious')) {
        score += 10;
    }

    let riskLevel = 'Low';
    let recommendation = 'Home Care Advice: Rest, hydration, and monitoring.';
    let prediction = 'Minor Viral or Seasonal Ailment';
    let confidenceScore = 85 + Math.random() * 10;

    // Generate Reason String
    let activeSymptoms = [];
    if (symptoms.fever) activeSymptoms.push('fever');
    if (symptoms.cough) activeSymptoms.push('cough');
    if (symptoms.headache) activeSymptoms.push('headache');
    if (symptoms.vomiting) activeSymptoms.push('vomiting');
    if (symptoms.bodyPain) activeSymptoms.push('body pain');

    let reason = activeSymptoms.length > 0
        ? activeSymptoms.join(' + ') + ' detected'
        : 'General symptoms reported';

    if (score >= 8) {
        riskLevel = 'High';
        prediction = 'Acute Respiratory Infection / Severe Complication';
        recommendation = 'Immediate Hospital Visit: Urgent medical intervention required.';
        if (otherText.includes('difficu') || otherText.includes('breath')) reason += ' + respiratory distress';
        reason += ' = Critical health risk';
    } else if (score >= 4) {
        riskLevel = 'Medium';
        prediction = 'Potential Bacterial Infection / Persistent Viral';
        recommendation = 'Visit PHC (Primary Health Center): Professional consultation advised.';
        reason += ' = Elevated infection risk';
    } else {
        reason += ' = Minor health risk';
    }

    return {
        riskLevel,
        prediction,
        recommendation,
        reason,
        confidenceScore: parseFloat(confidenceScore.toFixed(2)),
        score
    };
};

module.exports = {
    analyzeSymptoms
};
