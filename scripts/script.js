
//Pixel width where the panels collapse
const pageBreakPoint = 768;

//JQuery page ready functions
$( document ).ready(function() {
    //This listens for the user to hit enter after typing in their username, 
    //when they do the password field is focused
    document.querySelector("#loginUserName").addEventListener("keyup", event => {
        if(event.key !== "Enter") return;
        document.querySelector("#loginPassword").focus(); 
    });

    //This listens for the user to hit enter after typing in their password, 
    //when they do 'Sign in' button is clicked
    document.querySelector("#loginPassword").addEventListener("keyup", event => {
        if(event.key !== "Enter") return;
        document.querySelector("#signInBtn").click(); 
        event.preventDefault(); 
    });
    
    //checks if message input is empty, if it isnt the text dissapears and the icon appears
    setInterval(checkTextboxChanged, 0.5);
    function checkTextboxChanged() {
        var currentValue = $('#msg-input').val();
        if (currentValue != "") {
            $("#sendText").hide();
            $("#sendIcon").show();
        }else {
            $("#sendText").show();
            $("#sendIcon").hide();
        }
    }
    
});

var userArray = []
var userInfo = []

//Checks to see if a user is logged in
function firstLoad(){
    if (localStorage.getItem("isLoggedIn") === null)
    {
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("Users", JSON.stringify(userArray));
    }

    updatePage()
}

//--------------------------------LOG IN ACCOUNT----------------------------------

function logIn() {
    userArray = JSON.parse(localStorage.getItem("Users"));
    var userInfo = []
    //data-dismiss="modal" - removed from HTML
    let success = false ;
    //checks if the user exists
    for (i=0; i < userArray.length; i++) {
        if (userArray[i].name == document.getElementById("loginUserName").value &&
            userArray[i].password == document.getElementById("loginPassword").value) {
            success = true ;
            
            //if the name password combo exists, the object is push to the "current user"
            localStorage.setItem("isLoggedIn", true);
            userInfo.push(userArray[i])
            
            //user is alerted and the login modal is hidden
            alert("Logged in.")
            $('#staticBackdrop').modal('hide')

            localStorage.setItem("currentUser", JSON.stringify(userInfo[0]));
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
    userArray = JSON.parse(localStorage.getItem("Users"));
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
        //if all requirements are met, a user object is created and pushed to the array and stored to local info
        else {
            let newUser = new User(
                document.getElementById("loginUserName").value,
                document.getElementById("loginPassword").value,
            );
            userArray.push(newUser);
            localStorage.setItem("Users", JSON.stringify(userArray)) ;
            localStorage.setItem("isLoggedIn", true);
            $('#staticBackdrop').modal('hide');
            document.getElementById("loginPassword").value = ''
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            
        }
    } 
    updatePage()
}

//--------------------------------LOGOUT----------------------------------

function logOut(){
    
    $('#staticBackdrop').modal('show');
    //removes isLoggedIn flag so the login modal is called
    localStorage.setItem("isLoggedIn", false);
    localStorage.removeItem("currentUser")
    document.getElementById("loginPassword").value = ''
    firstLoad()

}

//--------------------------------UPDATE PAGE----------------------------------

function updatePage(){
    if (localStorage.getItem("currentUser") != null){
        currentName = JSON.parse(localStorage.getItem("currentUser")).name;
        document.getElementById("userNameTop").innerHTML = currentName
    }
}

//--------------------------------USER CONSTRUCTOR----------------------------------

function User(name, password) {
    this.name = name ;
    this.password = password ;
}

//--------------------------------SEND MESSAGE----------------------------------

// Get the input field
var input = document.getElementById("myInput");

/* Prevents page refresh from message send button */
$("#message-input").submit(function(e) {
    e.preventDefault();
});

function sendMsg(){
    var msg = document.getElementById("msg-input").value ;
    var msgPanel = document.getElementById("message-panel");
    //prevents send if field is empty
    if (msg == '') {
        return
    }else {
        //creates 24hour a time variable
        var curTime = new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: "2-digit", 
            hour12: false 
        });
        
        //message div created 
        let msgDiv = document.createElement('div') 
        msgDiv.setAttribute('class', 'message-user text-light mt-3 p-2 ml-auto shadow') 
        
        //message paragraph created
        let msgP = document.createElement('p') 
        msgP.setAttribute('class', 'message-content') 
        msgP.appendChild(document.createTextNode(msg)) 

        //time paragraph created
        let msgT = document.createElement('p') ;
        msgT.setAttribute('class', 'message-time-stamp m-0 font-weight-light small') ;
        msgT.appendChild(document.createTextNode(curTime)) ;

        msgDiv.appendChild(msgP)
        msgDiv.appendChild(msgT)
        
        msgPanel.appendChild(msgDiv)
        //inserts the mesage before the form ( because the form is in the same div as the messages )
        //$( msgDiv ).insertBefore( "#message-input" );

        //clears the send box
        document.getElementById("msg-input").value = '' ;

        //scrolls to show the newly sent message
        var elem = document.getElementById('message-panel');
        elem.scrollTop = elem.scrollHeight;
    }
}

//----------------------show friends button-------------------------------

//for mobile screen size. hides messages panel and shows friends list
function showFriends() {
    if ($(window).width() < pageBreakPoint){
        $('#friends-container').fadeIn('fast');
    }
}

//----------------------show messages------------------------------------

//for mobile screen size. when a friend is clicked on, it hides friends list and shows messages panel
function showMessages() {
    if ($(window).width() < pageBreakPoint){
        $('#friends-container').fadeOut('fast');
        $('#msg-container').fadeIn('fast');
    }
    if ($(window).width() > pageBreakPoint){
        $('#msg-container').fadeIn(80);
    }
}
    