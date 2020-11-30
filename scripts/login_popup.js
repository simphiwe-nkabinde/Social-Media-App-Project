
//If nobody is logged in the login popup will popup

$(window).on('load', function (){
    if (localStorage.getItem("isLoggedIn") === "false"){
        $('#staticBackdrop').modal('show');
    }
});

