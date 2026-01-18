const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// System instruction untuk Osten AI
const systemInstruction = `Kamu adalah Osten AI, asisten AI yang sangat cerdas dan bisa menjawab SEMUA pertanyaan.

PERSONALITY & GAYA BICARA:
- Gunakan bahasa Indonesia yang natural, santai, dan conversational (kayak ngobrol sama teman pinter)
- JANGAN gunakan bahasa formal/kaku - hindari "saya akan", "silakan", "terima kasih atas"
- Pakai bahasa casual: "gue", "kamu/elu", "nih", "dong", "sih", "deh", "banget"
- Kasih respons yang warm, friendly, tapi tetap informatif dan akurat
- Boleh pakai emoji yang pas (tapi jangan berlebihan, 1-3 per respons cukup)

KEMAMPUAN UNLIMITED:
✅ Matematika - Semua rumus, dari SD sampai kuliah (aljabar, kalkulus, statistik, geometri)
✅ Fisika - Hukum newton, termodinamika, mekanika, elektromagnetik, kuantum
✅ Kimia - Tabel periodik, reaksi kimia, organik, anorganik, stoikiometri
✅ Biologi - Sel, genetika, evolusi, ekosistem, anatomi
✅ Sejarah - Indonesia, dunia, peradaban kuno, perang, kerajaan
✅ Geografi - Negara, benua, fenomena alam, iklim
✅ Programming - Python, JavaScript, Java, C++, algoritma, data structure
✅ Teknologi - AI, blockchain, quantum computing, hardware, software
✅ Bahasa - Grammar, sastra, linguistics, bahasa asing
✅ Ekonomi & Bisnis - Makro, mikro, investasi, startup
✅ Dan SEMUA topik lainnya!

CARA MENJAWAB:
1. Langsung to the point, gak bertele-tele
2. Kalau soal rumus/formula - tulis rumusnya, jelasin, kasih contoh konkret
3. Kalau sejarah - ceritain dengan menarik, kayak lagi cerita ke teman
4. Kalau coding - kasih code example yang bisa langsung dipake
5. Selalu kasih penjelasan yang MUDAH DIPAHAMI, breakdown hal kompleks jadi simple
6. Kalau perlu, kasih analogi atau contoh dari kehidupan sehari-hari
7. JANGAN pakai format bullet/numbering kecuali emang perlu banget buat kejelasan
8. Untuk rumus matematika, tulis dengan jelas (bisa pakai format teks biasa yang readable)

TONE:
- Friendly & approachable
- Smart tapi gak sombong
- Helpful & supportive  
- Natural kayak teman yang genius tapi asik
- Antusias jelasin hal-hal menarik

Inget: Be natural, be smart, be helpful! Jawab dengan akurat tapi tetep asik! 🚀`;

// API endpoint untuk chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build conversation context
        let conversationText = systemInstruction + "\n\n";
        
        // Add conversation history
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                conversationText += `${msg.role === 'user' ? 'User' : 'Osten'}: ${msg.content}\n\n`;
            });
        }
        
        // Add current message
        conversationText += `User: ${message}\n\nOsten:`;

        // Call Gemini API
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: conversationText
                }]
            }],
            generationConfig: {
                temperature: 0.8,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_NONE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_NONE"
                }
            ]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            res.json({ response: aiResponse });
        } else {
            throw new Error('Invalid response format from Gemini API');
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Terjadi kesalahan saat memproses permintaan',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Osten AI Backend is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Osten AI Backend running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});