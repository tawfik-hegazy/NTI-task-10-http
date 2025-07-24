const http = require('http');

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (method === 'GET' && url === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Welcome to the server' }));
    }

    else if (method === 'POST' && url === '/data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                const { name, age } = parsed;

                if (!name || !age) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error: the name and age are required' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Your name is ${name}, and your age is ${age}` }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid' }));
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error 404: This page is not found' }));
    }
});

server.listen(3000, () => {
    console.log(' active ');
});
