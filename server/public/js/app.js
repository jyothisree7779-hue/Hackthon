const API_URL = '/api';

const app = {
    // Utility to get user from localStorage
    getUser: () => JSON.parse(localStorage.getItem('user')),
    getToken: () => localStorage.getItem('token'),

    // Auth logic
    login: async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            app.redirect(data.user.role);
        } catch (err) {
            alert(err.message);
        }
    },

    register: async (formData) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            app.redirect(data.user.role);
        } catch (err) {
            alert(err.message);
        }
    },

    redirect: (role) => {
        if (role === 'patient') window.location.href = 'dashboards/patient.html';
        else if (role === 'health_worker') window.location.href = 'dashboards/worker.html';
        else if (role === 'admin') window.location.href = 'dashboards/admin.html';
    },

    logout: () => {
        localStorage.clear();
        window.location.href = '../index.html';
    },

    // Report logic
    checkSymptoms: async (symptoms, patientName, age, gender) => {
        try {
            const res = await fetch(`${API_URL}/reports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': app.getToken()
                },
                body: JSON.stringify({ symptoms, patientName, age, gender })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            return data;
        } catch (err) {
            alert(err.message);
        }
    },

    // Multilingual Support
    i18n: {
        en: {
            welcome: "Welcome",
            symptom_checker: "AI Symptom Checker",
            check_now: "Check Now",
            additional_notes: "Additional Notes",
            ai_analysis: "AI Health Analysis",
            possible_condition: "Possible Condition",
            reason: "Reason",
            recommendation: "Recommendation",
            health_tips: "Health Education",
            fever: "Fever",
            cough: "Cough",
            headache: "Headache",
            vomiting: "Vomiting",
            bodyPain: "Body Pain",
            other: "Other Symptoms",
            voice_guide: "Please select your symptoms below."
        },
        te: {
            welcome: "స్వాగతం",
            symptom_checker: "AI లక్షణాల తనిఖీ",
            check_now: "ఇప్పుడే తనిఖీ చేయండి",
            additional_notes: "అదనపు గమనికలు",
            ai_analysis: "AI ఆరోగ్య విశ్లేషణ",
            possible_condition: "సాధ్యమయ్యే పరిస్థితి",
            reason: "కారణం",
            recommendation: "సిఫార్సు",
            health_tips: "ఆరోగ్య విద్య",
            fever: "జ్వరం (Fever)",
            cough: "దగ్గు (Cough)",
            headache: "తలనొప్పి (Headache)",
            vomiting: "వాంతులు (Vomiting)",
            bodyPain: "ఒంటి నొప్పులు (Body Pain)",
            other: "ఇతర లక్షణాలు",
            voice_guide: "దయచేసి దిగువన మీ లక్షణాలను ఎంచుకోండి."
        }
    },

    healthTips: [
        {
            title: { en: "Stay Hydrated", te: "నీరు ఎక్కువగా తాగండి" },
            desc: { en: "Drink at least 8 glasses of water daily to maintain health.", te: "ఆరోగ్యంగా ఉండటానికి రోజుకు కనీసం 8 గ్లాసుల నీరు త్రాగాలి." }
        },
        {
            title: { en: "Hand Hygiene", te: "చేతుల పరిశుభ్రత" },
            desc: { en: "Wash hands regularly to prevent infections.", te: "ఇన్ఫెక్షన్లను నివారించడానికి క్రమం తప్పకుండా చేతులు కడుక్కోవాలి." }
        },
        {
            title: { en: "Healthy Diet", te: "ఆరోగ్యకరమైన ఆహారం" },
            desc: { en: "Eat plenty of fruits and vegetables every day.", te: "ప్రతిరోజూ పండ్లు మరియు కూరగాయలు పుష్కలంగా తినండి." }
        }
    ]
};
