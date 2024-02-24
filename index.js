const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) =>{

    let filePath = '';

    if(req.url === '/'){
        filePath += 'index.html';
    }
    else if(req.url === '/about'){
        filePath += 'about.html';
    }
    else if(req.url === '/contact'){
        filePath += 'contact.html';
    }
    else{
        fs.readFile('404.html', 'utf-8', (err, content) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h1>Internal Server Error</h1>');
            }else{
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(content);
            }
        });
        return;
    }


    fs.readFile(filePath, 'utf-8', (err, content) =>{
        if(err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>Internal Server Error</h1>');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    })
})

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});