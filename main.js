const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];
let loginAttempts = 0; // Counter for login attempts

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// adding and removing border
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
        } else {
            Image.classList.add('clicked');
            uppass.push(element.id);
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
        } else {
            Image.classList.add('clicked');
            inpass.push(element.id);
        }
    }
}

window.addEventListener('load', function () {
    shufflePasswordImages();
});

function shufflePasswordImages() {
    var container = document.getElementById('passwordContainer');
    for (var i = container.children.length - 1; i >= 0; i--) {
        container.insertBefore(container.children[Math.floor(Math.random() * (i + 1))], container.children[i + 1]);
    }
}

// element image recognition
function signup() {
    let upmailValue = document.getElementById('upmail').value;
    let imgValues = Array.from(document.querySelectorAll('#passwordContainer img.clicked')).map(img => img.parentNode.id);
    
    let validEmails = ['gmail.com', 'hotmail.com']; // Add more valid email domains here
    
    if (upmailValue !== '' && imgValues.length > 0 && validEmails.some(domain => upmailValue.includes(domain))) {
        sessionStorage.setItem("upname", upmailValue);
        sessionStorage.setItem("uppass", imgValues);
        var myText = "Account Created Successfully";
        alert(myText);
        shufflePasswordImages();
    } else {
        alert('Username, email (with valid domain), and selecting password images are mandatory');
    }
}

function signin() {
    let str = document.getElementById('inmail').value;
    let array = sessionStorage.getItem("uppass");
    let check1 = array.localeCompare(inpass.toString());
    
    let validEmails = ['gmail.com', 'hotmail.com']; // Add more valid email domains here
    
    if (validEmails.some(domain => str.includes(domain)) && !check1 && (!str.localeCompare(sessionStorage.getItem("upname")))) {
        var myText = "Login is successful";
        alert(myText);
        shufflePasswordImages();
        window.location.assign("face.html");
    } else {
        loginAttempts++;
        
        if (loginAttempts >= 3) {
            alert("Error: Account blocked after 3 failed login attempts");
            sendMail3(); // Notify user or admin
            loginAttempts = 4; // Reset login attempts counter
            shufflePasswordImages();
        } else {
            var myText = "Login Failed";
            alert(myText);
            shufflePasswordImages();
        }
    }
    
    shufflePasswordImages(); // Shuffle the password images when transitioning from Signup to Signin
}

function sendMail3() {
      emailjs.send('service_7q1sn6s', 'template_v7f98gs')
             .then(function (res) {
                   alert("Mail sent successfully");
             })
}
