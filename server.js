const express = require("express");
const app = express();
const path = require("path");

const STATIC_FOLDERS = ['js', 'build', 'bower_components', 'node_modules', 'languages', 'fonts', 'css', 'images', '../fancybox']

STATIC_FOLDERS.forEach(folder => {
  app.use(`/${folder}`, express.static(`${__dirname}/${folder}`));
})

app.listen(process.env.PORT || 8080)
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"))
});

console.log("Listening");