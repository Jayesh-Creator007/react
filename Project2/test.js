const http = require('http');
const PORT = 5000;
const fs = require('fs');
const path = require('path');
const { send } = require('process');

const app = http.createServer((req, res) => {

    // Serve CSS file
    if (req.url === "/style.css") {
        const cssPath = path.join(__dirname, "src/style.css");
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("CSS not found");
            } else {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            }
        });
        return;
    }

    // Routing for HTML pages
    switch (req.url) {

        case "/":
            sendPage(res, "home.html");
            break;

        case "/about":
            sendPage(res, "about.html");
            break;
        case "/product":
            sendPage(res,"product.html")
            break;
        case "/contact":
            sendPage(res,"contact.html")
            break;

        default:
            sendPage(res, "error.html");
            break;
    }
});

// Function to send files
function sendPage(res, filename) {
    const filePath = path.join(__dirname, "src", filename);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error loading page");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    });
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
