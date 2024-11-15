const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3054; // ����, �� ������� ����� �������� ������

// ���������� ���� � ����� index.html
const filePath = path.join(__dirname, 'public', 'index.html'); // ����������� __dirname ��� ����������� ����

// ���������� ����� ��� ����������� ������
app.use('/css', express.static(path.join(__dirname, 'public', 'css'))); // ����� ��� CSS
app.use('/images', express.static(path.join(__dirname, 'public', 'images'))); // ����� ��� �����������

app.get('/', (req, res) => {
    // ���������, ���������� �� ����
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('������ ��� �������� �����:', err);
            return res.status(404).send('���� �� ������');
        }

        // ���� ���� ����������, ���������� ���
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('������ �������� �����:', err);
                res.status(err.status).end();
            }
        });
    });
});

// ������ �������
app.listen(PORT, () => {
    console.log(`������ ������� �� http://localhost:${PORT}`);
});

