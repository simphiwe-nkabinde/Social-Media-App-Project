var userArray = []
var userInfo = []


//Checks to see if a user is logged in

function firstLoad(){
    if (sessionStorage.getItem("isLoggedIn") === null ||
    sessionStorage.getItem("isLoggedIn") === "false")
    {
        sessionStorage.setItem("isLoggedIn", false);
        sessionStorage.setItem("Users", JSON.stringify(userArray));
    }

    updatePage()
}

//--------------------------------LOG IN ACCOUNT----------------------------------

function logIn() {
    userArray = JSON.parse(sessionStorage.getItem("Users"));
    var userInfo = []
    //data-dismiss="modal" - removed from HTML
    let success = false ;
    //checks if the user exists
    for (i=0; i < userArray.length; i++) {
        if (userArray[i].name == document.getElementById("loginUserName").value &&
            userArray[i].password == document.getElementById("loginPassword").value) {
            success = true ;
            
            //if the name password combo exists, the object is push to the "current user"
            sessionStorage.setItem("isLoggedIn", true);
            userInfo.push(userArray[i])
            
            //user is alerted and the login modal is hidden
            alert("Logged in.")
            $('#staticBackdrop').modal('hide')

            sessionStorage.setItem("currentUser", JSON.stringify(userInfo[0]));
            updatePage()
        }
    }

    //User is alerted if their username or password is incorrect
    if (success == false){
        //removes password from the field
        document.getElementById("loginPassword").value = ""
        alert("Username or Password incorrect.")
    }
    
}

//--------------------------------CREATE ACCOUNT----------------------------------

function addUser() {
    userArray = JSON.parse(sessionStorage.getItem("Users"));
    let con = true ;
    //checks if the user exists
    for (i=0; i < userArray.length; i++) {
        if (userArray[i].name == document.getElementById("loginUserName").value) {
            alert("This username already exists.")
            con = false ;
        }
    }
    //checks if all the inputs have content
    if (con != false) {
        if(document.getElementById("loginUserName").value == '' 
        || document.getElementById("loginPassword").value == ''){
            alert("Please fill all fields.")
        }
        //if all requirements are met, a user object is created and pushed to the array and stored to session info
        else {
            let newUser = new User(
                document.getElementById("loginUserName").value,
                document.getElementById("loginPassword").value,
            );
            userArray.push(newUser);
            sessionStorage.setItem("Users", JSON.stringify(userArray)) ;
            sessionStorage.setItem("isLoggedIn", true);
            $('#staticBackdrop').modal('hide');

            sessionStorage.setItem("currentUser", JSON.stringify(newUser));
            
        }
    } 
    updatePage()
}

//--------------------------------LOGOUT----------------------------------

function logOut(){
    
    //removes isLoggedIn flag so the login modal is called
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.removeItem("currentUser")
    document.location.reload ()
    firstLoad()

}

//--------------------------------UPDATE PAGE----------------------------------

function updatePage(){
    currentName = JSON.parse(sessionStorage.getItem("currentUser")).name;
    document.getElementById("userNameTop").innerHTML = currentName
}

//--------------------------------USER CONSTRUCTOR----------------------------------

function User(name, password) {
    this.name = name ;
    this.password = password ;
}