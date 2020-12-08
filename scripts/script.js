
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
    setInterval(checkTextboxChanged, 80);
    function checkTextboxChanged() {
        var currentValue = $('#msg-input').val();
        if (currentValue != "") {
            $("#sendText").hide();
            $("#sendIcon").fadeIn(150);

        }else {
            $("#sendIcon").hide();
            $("#sendText").fadeIn(150);
        }
    }
    //scrolls down the message window to latest messages on load
    scrollDown('message-panel');
<<<<<<< HEAD
=======
    
>>>>>>> eb8de47a8c39132b457fd479cc0f2c9e04b28649
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
            $('#loginErr').hide();
            $('#loginSucc').fadeIn(60).delay(700).fadeOut();
            //user is alerted and the login modal is hidden
            setTimeout(function(){ $('#staticBackdrop').modal('hide') }, 700);
            
            localStorage.setItem("currentUser", JSON.stringify(userInfo[0]));
            updatePage()
        }
    }

    //User is alerted if their username or password is incorrect
    if (success == false){
        //removes password from the field
        document.getElementById("loginPassword").value = ""
        $('#loginErr').fadeIn().delay(700).fadeOut();
    }
    
}

//--------------------------------CREATE ACCOUNT----------------------------------

function addUser() {
    userArray = JSON.parse(localStorage.getItem("Users"));
    let con = true ;
    //checks if the user exists
    for (i=0; i < userArray.length; i++) {
        if (userArray[i].name == document.getElementById("loginUserName").value) {
            $('#loginErrExist').fadeIn(60).delay(1000).fadeOut();
            con = false ;
        }
    }
    //checks if all the inputs have content
    if (con != false) {
        if(document.getElementById("loginUserName").value == '' 
        || document.getElementById("loginPassword").value == ''){
            $('#loginErr2').fadeIn(60).delay(1000).fadeOut();
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

            $('#loginSuccCreate').fadeIn().delay(700).fadeOut();
            setTimeout(function(){ $('#staticBackdrop').modal('hide') }, 700);
            
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
        scrollDown('message-panel')
        
        //TEMP - This just call a random response
        setTimeout(function(){ getMsg() }, 1200)

    }
}

//--------------------------------------RECIEVE MESSAGE-----------------------------------

function getMsg(){
    //List of random responses
    var arr = [
    "Woah hey there! 🙃", 
    "I honestly have no idea what I'm doing...", 
    "Excuse me?!1!", 
    "Oh, it works!", 
    "Oh ok, yeah thats a pretty cool thing you are talking about right now, damn!", 
    "lol 🤡, wanna see me do it again?", 
    "No ways", 
    "Yep",
    "No you.",
    "They did nothing as the raccoon attacked the lady’s bag of food, unbeleivable!",
    "Potato wedges probably are not best for relationships.",
    "When I cook spaghetti, I like to boil it a few minutes past al dente so the noodles are super slippery.",
    "Even though he thought the world was flat he didn’t see the irony of wanting to travel around the world.",
    "Reboot and go stand in a corner.",
    "Have you been feeding the hamster inside your computer?",
    "Hello there, have you finally come to fight me? I wonder who will be the victor... 🤠",
    "Here, have some Lorem ipsum \n  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    "Why do you keep sending gibberish? Do you take me for a fool?!",
    "Hey, I'm Molly, howsit"]

    var msgPanel = document.getElementById("message-panel");
    
    //creates 24hour a time variable
    var curTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: "2-digit", 
        hour12: false 
    });
    
    //message div created 
    let msgDiv = document.createElement('div') 
    msgDiv.setAttribute('class', 'message-friend mt-3 text-light p-2 shadow') 
    
    //message paragraph created
    let msgP = document.createElement('p') 
    msgP.setAttribute('class', 'message-content') 
    //Change this when actual messages are received
    msgP.appendChild(document.createTextNode(arr[Math.floor(Math.random() * arr.length)])) 

    //time paragraph created
    let msgT = document.createElement('p') ;
    msgT.setAttribute('class', 'message-time-stamp m-0 font-weight-light small') ;
    msgT.appendChild(document.createTextNode(curTime)) ;

    msgDiv.appendChild(msgP)
    msgDiv.appendChild(msgT)
    
    msgPanel.appendChild(msgDiv)
    //inserts the mesage before the form ( because the form is in the same div as the messages )
    //$( msgDiv ).insertBefore( "#message-input" );
    
    scrollDown('message-panel')
}

//----------------------show friends button-------------------------------

//for mobile screen size. hides messages panel and shows friends list
function showFriends() {
    /*if ($(window).width() < pageBreakPoint){
        $('#friends-container').fadeIn('fast');
        $('#msg-container').hide();
    }*/
    $('#friends-container').fadeIn('fast');
    $('#msg-container').hide();
    
}

//----------------------show messages------------------------------------

//for mobile screen size. when a friend is clicked on, it hides friends list and shows messages panel
function showMessages() {
    $('#msg-container').fadeIn('fast');
    
    if ($(window).width() < pageBreakPoint){
        $('#friends-container').hide();
        $('#msg-container').fadeIn('fast');
    }
    /*if ($(window).width() > pageBreakPoint){
        $('#msg-container').fadeIn(80);
    }*/
    scrollDown('message-panel')
}

$( window ).resize(function() {
    //if the window is big enough to fit both windows, both are shown
    if ($(window).width() > pageBreakPoint){
        $('#msg-container').fadeIn(80);
        $('#friends-container').fadeIn(80);
    }
});

//------------------SCROLL TO BOTTOM FUNC--------------------------------

//scrolls down to bottom function
function scrollDown(elem){
    var elemt = document.getElementById(elem);
    elemt.scrollTop = elemt.scrollHeight;
}

//----------------------check Scroll-------------------------------------

//when the user scroll  a little further up from the bottom in the chat window
//the scroll to bottom button is displayed
function checkScroll() {
    if ( $(window).height() < 1000 ){
        if ($('#message-panel').scrollTop() + 1000 < $('#message-panel').prop('scrollHeight')) {
            $('#scrollToBottomBtn').show();
        }else {
            $('#scrollToBottomBtn').fadeOut(100);
        }
    }else {
        if ($('#message-panel').scrollTop() + 1400 < $('#message-panel').prop('scrollHeight')) {
            $('#scrollToBottomBtn').show();
        }else {
            $('#scrollToBottomBtn').fadeOut(100);
        }
    }

}
