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
var leadsRef = firebase.database().ref('leads');

// Listen for form submit
document.getElementById('newsletterForm').addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();
    firebase.analytics().logEvent('button_clicked');

    var email = getInputVal('email');
    saveEmail(email);
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

// Send email to firebase
function saveEmail(email) {
    var newLeadsRef = leadsRef.push();
    newLeadsRef.set({
        email: email
    });
}