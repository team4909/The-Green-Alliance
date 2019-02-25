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

    $("button[data-type='SUBMIT']").click((event) => { // TODO: Make sure that this sends all the form values in the app to the function, which
        sendToDatabase();                              // then sends it to the database
    });

    $('.page-loader-wrapper').fadeOut();

    $("#wizard_horizontal").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        enableFinishButton: false,
        enablePagination: false,
        enableAllSteps: true,
        titleTemplate: "#title#",
        cssClass: "tabcontrol",
        onFinished: function (event, currentIndex) {
            localStorage.setItem("event", $("#m-event-key").val());
        }
    });
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

function sendToDatabase() {
    var jsonData = {
        "Event Key" : $("#m-event-key").val(),
        "Team Scouted" : $("#m-scouted").val(),
        "Match Number" : $("#m-number").val(),
        "Match Type" : $("#qual-match").val(),
        "Match Type Number" : $("#m-sub-number").val(),
        "Scout Team" : $("#m-scouting").val(),
        "Scout Initials" : $("#m-scout").val(),

        "Auto Bottom Rocket Panels" : $("#basic-addon1").val(),
        "Auto Middle Rocket Panels" : $("#basic-addon2").val(),
        "Auto Top Rocket Panels" : $("#basic-addon3").val(),
        "Auto Bottom Rocket Cargo" : $("#basic-addon4").val(),
        "Auto Middle Rocket Cargo" : $("#basic-addon5").val(),
        "Auto Top Rocket Cargo" : $("#basic-addon6").val(),
        "Auto Ship Panels" : $("#basic-addon7").val(),
        "Auto Ship Cargo" : $("#basic-addon8").val(),

        "Teleop Bottom Rocket Panels" : $("#basic-addon9").val(),
        "Teleop Middle Rocket Panels" : $("#basic-addon10").val(),
        "Teleop Top Rocket Panels" : $("#basic-addon11").val(),
        "Teleop Bottom Rocket Cargo" : $("#basic-addon12").val(),
        "Teleop Middle Rocket Cargo" : $("#basic-addon13").val(),
        "Teleop Top Rocket Cargo" : $("#basic-addon14").val(),
        "Teleop Ship Panels" : $("#basic-addon15").val(),
        "Teleop Ship Cargo" : $("#basic-addon16").val(),
        "Panel Ground Pickup" : $("#panel_ground_pickup").val(),
        "Cargo Ground Pickup" : $("#cargo_ground_pickup").val(),

        "Endgame Level Climbed" : $("#endgame_level_climbed").val(),
        "Endgame Assist in Climbing" : $("#endgame_assist_in_climbing").val(),

        "Reckless Driving" : $("#reckless-driving").val(),
        "Not Present" : $("#not-present").val(),
        "Disabled" : $("#comments-disabled").val(),
        "Robot Failure" : $("#robot-failure").val(),
        "Top Heavy" : $("#top-heavy").val(),
        "Foul" : $("#foul").val(),
        "Card" : $("#card").val()
    }

    db.collection("the-green-allliance").add(jsonData);

}
