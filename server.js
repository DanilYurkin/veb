const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3054; // Ïîðò, íà êîòîðîì áóäåò ðàáîòàòü ñåðâåð

// Îïðåäåëÿåì ïóòü ê ôàéëó index.html
const filePath = path.join(__dirname, 'public', 'index.html'); // Èñïîëüçóéòå __dirname äëÿ àáñîëþòíîãî ïóòè

// Îïðåäåëÿåì ïàïêè äëÿ ñòàòè÷åñêèõ ôàéëîâ
app.use('/css', express.static(path.join(__dirname,'css'))); // Ïàïêà äëÿ CSS
app.use('/images', express.static(path.join(__dirname,'images'))); // Ïàïêà äëÿ èçîáðàæåíèé

app.get('/', (req, res) => {
    // Ïðîâåðÿåì, ñóùåñòâóåò ëè ôàéë
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Îøèáêà ïðè ïðîâåðêå ôàéëà:', err);
            return res.status(404).send('Ôàéë íå íàéäåí');
        }

        // Åñëè ôàéë ñóùåñòâóåò, îòïðàâëÿåì åãî
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Îøèáêà îòïðàâêè ôàéëà:', err);
                res.status(err.status).end();
            }
        });
    });
});

// Çàïóñê ñåðâåðà
app.listen(PORT, () => {
    console.log(`Ñåðâåð çàïóùåí íà http://localhost:${PORT}`);
});

