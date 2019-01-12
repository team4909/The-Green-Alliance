firebase.initializeApp({
    apiKey: "AIzaSyCt9Q0ejGzzSTRZczB87N4rre9ae_EI3Y0",
    authDomain: "the-green-alliance.firebaseapp.com",
    projectId: "the-green-alliance",
});

var db = firebase.firestore(),
    ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log("ya!");
        console.dir(authResult);
        return false;
      }
    },
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  });
  
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
  
// Onload
$(function () {
    const apiKey = tba.ApiClient.instance.authentications['apiKey'];
    apiKey.apiKey = 'poguusggy4HtnMS6jZI7nEASojzPhzhdIoBUGYUk4QzqZ0FjYiHZLugOhkVl0OKe';
    const matchApi = new tba.MatchApi();

    $(".navigation li[data-page]").click((event) => {
        const page = $(event.currentTarget).attr("data-page");

        $(`.content div[data-page]`).hide();
        $(`.content div[data-page='${page}']`).show();

        $(`.navigation li[data-page]`).removeClass("active");
        $(`.navigation li[data-page='${page}']`).addClass("active");
    });

    $("button[data-type='minus']").click((event) => {
        addCounterValue(event.currentTarget, -1);
    });

    $("button[data-type='plus']").click((event) => {
        addCounterValue(event.currentTarget, +1);
    });

    $('.page-loader-wrapper').fadeOut();
});

$(applicationCache)
    .bind("cached", function (event) {
        alert("The Green Alliance Scouting Platform has been successfully cached on your device!");
    })
    .bind("updateready", function (event) {
        alert("The Green Alliance Scouting Platform has been successfully updated on your device! Please reload the page to use the new version.");
    });

// Utilities
function addCounterValue(target, value){ 
    const counter = $(target).attr("data-counter");
    const newValue = Number($(`input[data-counter='${counter}']`).val()) + value;

    if (existing > 0)
        $(`input[data-counter='${counter}']`).val(newValue);
}

function exists(object) {
     return typeof object != undefined && object != null;
}
