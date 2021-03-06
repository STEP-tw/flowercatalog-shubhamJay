const fs = require('fs');

const getContentType = function(path) {
  let FileExtension = path.split(".")[1];
  let contentTypes = {
    "html": "text/html",
    "css": "text/css",
    "pdf": "text/pdf",
    "jpg": "img/gif",
    "gif": "img/gif",
    "js":'text/javascript',
  };
  return contentTypes[FileExtension];
}

const handleSlash = function(req, res) {
  if (req.url == "/" && req.method == "GET") {
    req.url = "/index.html";
  };
}

const handleStaticFiles = function(req, res) {
  if(fs.existsSync("./public"+req.url)){
    res.statusCode = 200;
    res.setHeader('content-type',getContentType(req.url));
    res.write(fs.readFileSync('./public'+req.url));
    res.end();
  }
}

const handleLogIn = function(req, res) {
  debugger;
  let userId = req.body.userId;
  let password = req.body.password;
  let user = this.getUser(userId, password)
  if (user) {
    sessionId = new Date().getTime();
    user.sessionId = sessionId;
    res.setHeader('Set-Cookie', [`sessionId=${sessionId}`, `logInStatus=1`]);
  } else {
    res.setHeader('Set-Cookie', [`sessionId=0`]);
  };
  res.redirect('/guestBook.html');
  return;
}

const handleLogOut = function(req, res) {
  res.setHeader('Set-Cookie', [`sessionId=0,Expires=${new Date(1).toUTCString()}`, `logInStatus=0,Expires=${new Date(1).toUTCString()}`]);
  res.redirect("/guestBook.html");
}

const redirectLogedInUserToGuestBook = function(req, res) {
  if (req.url == '/logIn.html' && req.user) {
    res.redirect('/guestBook.html');
  };
}

const handleLoadingComments = function(req, res) {
  res.write(JSON.stringify(this.getComments()));
  res.end();
};

const handleNewComment = function(req, res) {
  let sessionId = req.cookies.sessionId;
  let commenter = this.getUserBySessionId(sessionId);
  let name = commenter.name;
  let comment = req.body.comment;
  this.addComment(name, comment);
  res.redirect('/guestBook.html');
}

const handleLoadingNameOfUser = function(req,res){
  let user = this.getUserBySessionId(req.cookies.sessionId) || {};
  res.write(user.name);
  res.end();
}

exports.handleSlash = handleSlash;
exports.handleLoadingComments = handleLoadingComments;
exports.handleLogIn = handleLogIn;
exports.handleLogOut = handleLogOut;
exports.handleNewComment = handleNewComment;
exports.handleStaticFiles = handleStaticFiles;
exports.redirectLogedInUserToGuestBook = redirectLogedInUserToGuestBook;
exports.handleLoadingNameOfUser = handleLoadingNameOfUser;
