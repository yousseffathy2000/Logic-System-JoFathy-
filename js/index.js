var userName = document.getElementById("form-name");
var userEmail = document.getElementById("form-email");
var userPassword = document.getElementById("form-password");
var userLists = [];
var userEmailLogin = document.getElementById("email");
var userPasswordLogin = document.getElementById("password");
var user = localStorage.getItem("UserNameContainer");

if(localStorage.getItem("userContainer")){
    userLists = JSON.parse(localStorage.getItem("userContainer"));
}else{
    userLists = [];
}

if(user){
    document.getElementById("userName").innerHTML = `Welcome ${user}`;
}



function addUser(){
    if(nameValidation() && emailValidation() && passwordValidation()){
        var userData = {
            name:userName.value.trim(),
            email:userEmail.value.trim(),
            password:userPassword.value.trim()
        }
        var emailUsed = false;
        for (var i = 0; i < userLists.length; i++) {
            if (userLists[i].email === userEmail.value.trim()) {
                emailUsed = true;
                break;
            }
        }
        if(emailUsed){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This email is already in use!",
                showClass: {
                    popup: "animate__animated animate__backInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                customClass: {
                    popup: "custom-popup",
                    title: "custom-title",
                    text: "custom-text",
                    icon: "custom-icon",
                    confirmButton: "custom-button",
                },
            });
        }else{
            userLists.push(userData);
            localStorage.setItem("userContainer", JSON.stringify(userLists));
            clearData();
            clearValidationSign();
            Swal.fire({
                icon: "success",
                title: "Success",
                showClass: {
                    popup: "animate__animated animate__backInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                customClass: {
                    popup: "custom-popup2",
                    title: "custom-title2",
                    text: "custom-text2",
                    icon: "custom-icon2",
                    confirmButton: "custom-button2",
                },
            });
            setTimeout(function () {
                location.href = "index.html";
            }, 1500);
        }
    } else {
        if (userName.value === "" && userEmail.value === "" && userPassword.value === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Enter your Name, Email and Password!",
                showClass: {
                    popup: "animate__animated animate__backInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                customClass: {
                    popup: "custom-popup",
                    title: "custom-title",
                    text: "custom-text",
                    icon: "custom-icon",
                    confirmButton: "custom-button",
                },
            });
        } else {
            clearValidationSign();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showClass: {
                    popup: "animate__animated animate__backInDown",
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                },
                customClass: {
                    popup: "custom-popup",
                    title: "custom-title",
                    text: "custom-text",
                    icon: "custom-icon",
                    confirmButton: "custom-button",
                },
            });
        }
    }
}

function clearData(){
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}

function nameValidation(){
    text = userName.value;
    var usernameRegex = /^[a-zA-Z0-9_-]+(?: [a-zA-Z0-9_-]+)*$/;
    if(usernameRegex.test(text) == true){
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        return true;
    }else{
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        return false;
    }
}

function emailValidation(){
    text = userEmail.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(text) == true){
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        return true;
    }else{
        userEmail.classList.add("is-invalid");
        userEmail.classList.remove("is-valid");
        return false;
    }
}

function passwordValidation(){
    text = userPassword.value;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(passwordRegex.test(text) == true){
        userPassword.classList.add("is-valid");
        userPassword.classList.remove("is-invalid");
        document.getElementById("instruction").classList.add("d-none");
        return true;
    }else{
        userPassword.classList.add("is-invalid");
        userPassword.classList.remove("is-valid");
        document.getElementById("instruction").classList.remove("d-none");
        return false;
    }
}

function clearValidationSign(){
    userName.classList.remove("is-valid");
    userEmail.classList.remove("is-valid");
    userPassword.classList.remove("is-valid");
    document.getElementById("instruction").classList.remove("d-block");
}

function loginUser(){
    if(userEmailLogin.value.trim() === ""  ||  userPasswordLogin.value.trim() === ""){
        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter your Email and Password",
            showClass: {
                popup: "animate__animated animate__backInDown",
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp",
            },
            customClass: {
                popup: "custom-popup",
                title: "custom-title",
                text: "custom-text",
                icon: "custom-icon",
                confirmButton: "custom-button",
            },
        });
    }
    var existsEmail = false;
    var existsPassword = false;

    for (var i = 0; i < userLists.length; i++) {
        if(userLists[i].email.includes(userEmailLogin.value.trim()) === true){
            existsEmail = true;
            if(userLists[i].password.includes(userPasswordLogin.value.trim()) === true){
                existsPassword = true;
                break;
            }
        }
    }
    if (existsEmail === false) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email",
            showClass: { popup: "animate__animated animate__backInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" },
            customClass: {
                popup: "custom-popup",
                title: "custom-title",
                text: "custom-text",
                icon: "custom-icon",
                confirmButton: "custom-button",
            },
        });
    } else if (existsPassword === false) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Password",
            showClass: { popup: "animate__animated animate__backInDown" },
            hideClass: { popup: "animate__animated animate__fadeOutUp" },
            customClass: {
                popup: "custom-popup",
                title: "custom-title",
                text: "custom-text",
                icon: "custom-icon",
                confirmButton: "custom-button",
            },
        });
    } else {
        localStorage.setItem("UserNameContainer", userLists[i].name);
        location.href = "home.html";
    }
    
}

document.addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        if(document.title == "Login"){
            loginUser();
        }if(document.title == "Sign Up"){
            addUser();
        }
    }
})

function logOut(){
    location.href = "index.html";
}