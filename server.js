const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3054; // Порт, на котором будет работать сервер

// Определяем путь к файлу index.html
const filePath = path.join(__dirname, 'public', 'index.html'); // Используйте __dirname для абсолютного пути

// Определяем папки для статических файлов
app.use('/css', express.static(path.join(__dirname, 'public', 'css'))); // Папка для CSS
app.use('/images', express.static(path.join(__dirname, 'public', 'images'))); // Папка для изображений

app.get('/', (req, res) => {
    // Проверяем, существует ли файл
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Ошибка при проверке файла:', err);
            return res.status(404).send('Файл не найден');
        }

        // Если файл существует, отправляем его
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Ошибка отправки файла:', err);
                res.status(err.status).end();
            }
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

