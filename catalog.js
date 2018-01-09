const fs = require('fs');

const Catalog = function(path){
  this.allUsers = [{name:'shubham',userId:'shubham',password:'shubham'}];
  this.commentHistory = [];
  this.dataBase = `./data/${path}`;
};

Catalog.prototype.loadStoredComments = function () {
  let comments = fs.readFileSync(this.dataBase,'utf8').split("\n").reverse();
  this.commentHistory = comments;
};

Catalog.prototype.addNewUser = function (name,userId,password) {
  this.allUsers.push({name:name,userId:userId,password:password});
  this.storeUsers("./data/allUsers.json");
};

Catalog.prototype.isValidUser = function (enteredId,enteredPassword) {
  let userEnetered = this.allUsers.find(u=>u.userId == enteredId) || {};
  return userEnetered.password == enteredPassword;
};

Catalog.prototype.getUser = function (enteredId,enteredPassword) {
  if(this.isValidUser(enteredId,enteredPassword)){
    return this.allUsers.find(u=>u.userId == enteredId);
  }
};

Catalog.prototype.getUserBySessionId = function (sessionId) {
    return this.allUsers.find(u=>u.sessionId == sessionId);
};

Catalog.prototype.getComments = function () {
  return this.commentHistory;
};

Catalog.prototype.addComment = function (name,comment) {
  this.commentHistory.push({sender:name,comment:comment});
  this.storeComments();
};

Catalog.prototype.storeComments = function () {
  fs.writeFileSync(this.dataBase);
};
//
// Catalog.prototype.storeUsers = function () {
//   fs.writeFile(,JSON.stringify(this.allUsers),(err)=>{
//     if(err) console.log("error in saving data");
//     console.log("file saved");
//   });
// };

module.exports = Catalog;
