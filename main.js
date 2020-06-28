var firebaseConfig = {
        apiKey: "AIzaSyDvjTy2c1WASU6C00mSndF15nXuAzfmD9E",
        authDomain: "brainee-leads.firebaseapp.com",
        databaseURL: "https://brainee-leads.firebaseio.com",
        projectId: "brainee-leads",
        storageBucket: "brainee-leads.appspot.com",
        messagingSenderId: "96149775581",
        appId: "1:96149775581:web:dca240e24915754ee26734",
        measurementId: "G-B3P9EDEMQ6"
      };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var analytics = firebase.analytics();
var leadsRef = firebase.database().ref('leads-form');
var googleRef = firebase.database().ref('leads-google');

// Listen for form submit
document.getElementById('newsletterForm').addEventListener('submit', submitForm);

function submitForm(event) {
    firebase.analytics().logEvent('clicked_form');
    event.preventDefault();

    var email = getInputVal('email');
    var name = getInputVal('name');
    saveForm(email, name);
    showSuccess()
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

// Send email to firebase
function saveForm(email, name) {
    firebase.analytics().logEvent('submitted_form');
    var newLeadsRef = leadsRef.push();
    newLeadsRef.set({
        email: email,
        name: name
    });
}

function saveGoogleData(data) {
    firebase.analytics().logEvent('submitted_google');
    var newGoogleRef = googleRef.push();
    newGoogleRef.set({
        email: data.getBasicProfile().getEmail(),
        name: data.getBasicProfile().getName()
    });
}

function goToFormAnxiety1() {
    firebase.analytics().logEvent('clicked_anxiety_1');
    goToForm();
}

function goToFormAnxiety2() {
    firebase.analytics().logEvent('clicked_anxiety_2');
    goToForm();
}

function goToFormLearn() {
    firebase.analytics().logEvent('clicked_learn');
    goToForm();
}

function goToForm() {
    var elmnt = document.getElementById("form");
    elmnt.scrollIntoView();
}

function attachSignin(element) {
    firebase.analytics().logEvent('clicked_google');
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            saveGoogleData(googleUser);
            alert('Dados enviados com sucesso!');
        }, function(error) {
            firebase.analytics().logEvent('error_google');
            alert(JSON.stringify(error, undefined, 2));
        }
    );
}

var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
            client_id: '306712348441-hj1r4iti9ck24bduhuiekcnjg1tmc16r.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
        });
        attachSignin(document.getElementById('customGoogleBtn'));
    });
};

function showSuccess(){
    var message = '<p style="font-size: 14px; font-weight: bold; color: #4aedbb; margin: 0;">Registro enviado com sucesso!</p>'
    document.getElementsByClassName("success")[0].innerHTML = message;
    document.getElementsByClassName("success")[0].style.display = "block";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}

startApp();