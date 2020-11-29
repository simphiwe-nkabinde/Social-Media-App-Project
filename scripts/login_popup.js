
//If nobody is logged in the login popup will popup

$(window).on('load', function (){
    if (sessionStorage.getItem("isLoggedIn") === "false"){
        $('#staticBackdrop').modal('show');
    }
});

