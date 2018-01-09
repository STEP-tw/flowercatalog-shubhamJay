const fs = require('fs');

const Catalog = function(){
  this.allUsers = [{name:'shubham',userId:'shubham',password:'shubham'}];
  this.commentHistory = [{"name":"shubham","comment":"hi. how are you","date":"1/9/2018, 5:33:43 PM"}];
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
  let date = new Date().toLocaleString();
  this.commentHistory.push({name:name,comment:comment,date:date});
};


module.exports = Catalog;
