const express = require('express');
const fs = require('fs');
const app = express();
const url = require('url');
const path = require('path');

app.use(express.json()); // 用于解析JSON请求体

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// 对于任何未处理的GET请求，返回index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('500 Internal Server Error');
    }
  });
});

// 读取文件的接口
app.get('/read-file', (req, res) => {
    fs.readFile('shortcutConfig.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
        } else {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.send(data);
        }
    });
});

// 写入文件的接口
app.post('/write-file', (req, res) => {
    const content = req.body;
    console.log(content)
    fs.writeFile('shortcutConfig.txt', JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            res.status(500).send('Error writing to the file');
        } else {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.send('File written successfully');
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
