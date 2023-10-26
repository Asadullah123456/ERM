const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


const loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("loginUserName").value;
        const password = document.getElementById("loginPassword").value;
        if (username.trim() === "") {
            alert("Username cannot be empty");
            return;
        }
        if (!username.endsWith("@ems.com")) {
            alert("Username must end with '@ems.com'");
            return;
        }    
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/;
        if (!password.match(passwordRegex)) {
            alert("Password must contain at least 6 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)");
            return;
        }
        document.getElementById("loginForm").submit();
    });
}


const signUpForm = document.querySelector('#signUpForm');
if(signUpForm){
    signUpForm.addEventListener('submit', function(event){
        event.preventDefault();
        const userName = document.querySelector('');
        const userEmail = document.querySelector('');
        const password = document.querySelector('');
        if (userName.trim() === "" && userEmail.trim() === "") {
            alert("Username cannot be empty");
            return;
        }
        if (!userEmail.endsWith("@ems.com")) {
            alert("Username must end with '@ems.com'");
            return;
        }    
        var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/;
        if (!password.match(passwordRegex)) {
            alert("Password must contain at least 6 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)");
            return;
        }
        document.getElementById("signUpForm").submit();
    });
}
