const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');  // إضافة المكتبة
const app = express();
const port = 3000;

// إضافة cors middleware لجميع الطلبات
app.use(cors());

// تعديل رأس Access-Control-Allow-Origin للسماح بالوصول من أي مصدر
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching the data:', error);
        res.status(500).send('Error fetching the data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
