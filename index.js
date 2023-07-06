const http = require("http");
const path = require("path");
const fs = require("fs");

// Create a server that gets a request and a response
const server = http.createServer((req, res) => {
  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check extension and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    // Handle error
    if (err) {
      // After reading the file, if there's an error, we first check for the ENOENT error code, which means that the file is not found
      if (err.code == "ENOENT") {
        // Page not found, therefor, serve 404.html
        console.log("page not found...");
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" }); // Set status and content type
            res.end(content, "utf8"); // Serve content
            console.log(content.toString());
          }
        );
      } else {
        // Some server error (Another error other than page not found)
        res.writeHead(500); // Set status
        res.end(`Server Error ${err.code}`); // Serve error
      }
    } else {
      // Serve content
      res.writeHead(200, { "Content-Type": contentType }); // Set status and content type
      res.end(content, "utf8"); // Serve content
    }
  });
});

// The port will run on whatever our host decides (environment variable), or port 8080
const PORT = process.env.PORT || 8080;

// Event listener to listen for and handle http requests
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
