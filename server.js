const http = require('http');
const fs = require('fs');
const WebApp = require('./webApp.js');
const Catalog = require('./catalog.js');
const dataBase = "./data/commentStore.json";
const port = 8020;

let app = WebApp.create();
let UserCommentLog = new Catalog('./commentStore.json');

const lib = require('./handlers.js');

const handleSlash = lib.handleSlash;
const handleLoadingComments = lib.handleLoadingComments.bind(UserCommentLog);
const handleLogIn = lib.handleLogIn.bind(UserCommentLog);
const handleLogOut = lib.handleLogOut;
// const handleNewComment = lib.handleNewComment.bind(UserCommentLog);
const handleStaticFiles = lib.handleStaticFiles;
const redirectLogedInUserToGuestBook = lib.redirectLogedInUserToGuestBook;


const getUserInReq = function(req,res){
  let sessionId = req.body.sessionId;
  let user =  this.allUsers.find((u)=>u.sessionId== sessionId);
  if(sessionId && user)req.user = user;
};
let getUserFromCatalog = getUserInReq.bind(UserCommentLog);

UserCommentLog.loadStoredComments();


app.preUse(getUserFromCatalog);
app.preUse(handleSlash);
app.preUse(redirectLogedInUserToGuestBook);

app.get("/loadComments",handleLoadingComments);

app.post("/logIn",handleLogIn)
app.post("/logOut",handleLogOut)
// app.post("/commentAccepted",handleNewComment)

app.postUse(handleStaticFiles);

let server = http.createServer(app);
server.listen(port);
console.log(`listening on port ${port}`);
