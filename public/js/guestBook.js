const displayComments = function(comments) {
  let table = document.getElementById('commentsTable');
  let insertedRow;
  comments.forEach((element) => {
    insertedRow = table.insertRow();
    insertedRow.insertCell().innerText = element.date;
    insertedRow.insertCell().innerText = element.name;
    insertedRow.insertCell().innerText = element.comment;
  });
}

const getComments = function() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let commentsStore = JSON.parse(this.responseText).reverse();
      displayComments(commentsStore);
    }
  };
  req.open("GET", "/loadComments");
  req.send();
};

const displayNameOfUser =function(name) {
  let nameBox = document.getElementById('userName');
  nameBox.innerText =`Active User : ${name}` ;
  nameBox.className = 'show';
}

const getNameOfUser = function() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function() {
      let nameOfUser = this.responseText;
      console.log(nameOfUser);
      displayNameOfUser(nameOfUser);
  };
  req.open("GET", "/loadNameOfUser");
  req.send();
};

const parsekeyVal = function(text) {
  return text.split(";").reduce((parsedKeyVals, ele) => {
    let keyValPairs = ele.trim().split('=');
    parsedKeyVals[keyValPairs[0]] = keyValPairs[1];
    return parsedKeyVals;
  }, {});
};

const hideCommentsSection = function() {
  let commentSection = document.getElementById("guestBookForm");
  commentSection.innerText = "";
  commentSection.style.visibility = "hidden";
};

const showLogInOption = function(){
  let logInOption = document.getElementById('logInOption');
  logInOption.className = 'show';
  logInOption.innerText = 'LogIn';
}

const showLogOutOption = function(){
  let logOutOption = document.getElementById('logOutOption');
  logOutOption.className = 'show';
  logOutOption.innerText = 'logOut';
}

const isLoggedIn = function(cookies){
return +cookies.sessionId && +cookies.logInStatus
}

const showCommentSectionIfUser = function() {
  let cookies = parsekeyVal(document.cookie);
  if (isLoggedIn(cookies)){
    getNameOfUser();
    showLogOutOption();
  }else {
    hideCommentsSection()
    showLogInOption();
  }
}

const actionOnPageLoad = function() {
  getComments();
  showCommentSectionIfUser();
}
