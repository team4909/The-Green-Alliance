firebase.initializeApp({
    apiKey: "AIzaSyCt9Q0ejGzzSTRZczB87N4rre9ae_EI3Y0",
    authDomain: "the-green-alliance.firebaseapp.com",
    projectId: "the-green-alliance",
});

var db = firebase.firestore();
db.enablePersistence();

var ui = new firebaseui.auth.AuthUI(firebase.auth());
firebase.auth().onAuthStateChanged(function () {
    verifyLoginStatus();
});

function initializeLogin() {
    ui.start('#firebaseui-auth-container', {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.

                return false;
            }
        },
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    });
}

function verifyLoginStatus() {
    var currentUser = firebase.auth().currentUser;

    if (currentUser != null) {
        $("#auth-container").text(`${currentUser.displayName} (${currentUser.email})`).show();
        $("#firebaseui-auth-container").hide();
    } else {
        initializeLogin();
        $("#firebaseui-auth-container").show();
        $("#auth-container").hide();
    }
}

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

    $('.page-loader-wrapper').fadeOut();

    $("#wizard_horizontal").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        enableFinishButton: false,
        enablePagination: true,
        enableAllSteps: false,
        onFinished: function (event, currentIndex) {
            localStorage.setItem("event", $("#m-event-key").val());
        }
    });
    
    $("button[data-type='minus']").click((event) => {
        addCounterValue(event.currentTarget, -1);
    });

    $("button[data-type='plus']").click((event) => {
        addCounterValue(event.currentTarget, +1);
    });
    
    // Disable scroll when focused on a number input.
    $('form').on('focus', 'input[type=number]', function(e) {
        $(this).on('wheel', function(e) {
            e.preventDefault();
        });
    });
 
    // Restore scroll on number inputs.
    $('form').on('blur', 'input[type=number]', function(e) {
        $(this).off('wheel');
    });
 
    // Disable up and down keys.
    $('form').on('keydown', 'input[type=number]', function(e) {
        if ( e.which == 38 || e.which == 40 )
            e.preventDefault();
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
function addCounterValue(target, value) {
    const counter = $(target).attr("data-counter");
    const newValue = Number($(`input[data-counter='${counter}']`).val()) + value;

    if (newValue >= 0)
        $(`input[data-counter='${counter}']`).val(newValue);
}

function exists(object) {
    return typeof object != undefined && object != null;
}

function sendToDatabase() {
    var jsonData = {
        "Event Key" : $("#m-event-key").val(),
        "Team Scouted" : Number($("#m-scouted").val()),
        "Match Number" : Number($("#m-number").val()),
        "Match Type" : $("#qual-match").val(),
        "Match Type Number" : Number($("#m-sub-number").val()),
        "Scout Team" : Number($("#m-scouting").val()),
        "Scout Initials" : $("#m-scout").val(),

        "Auto Top Rocket Panels" : Number($("#basic-addon3").val()),
        "Auto Middle Rocket Panels" : Number($("#basic-addon2").val()),
        "Auto Bottom Rocket Panels" : Number($("#basic-addon1").val()),
        "Auto Top Rocket Cargo" : Number($("#basic-addon6").val()),
        "Auto Middle Rocket Cargo" : Number($("#basic-addon5").val()),
        "Auto Bottom Rocket Cargo" : Number($("#basic-addon4").val()),
        "Auto Ship Panels" : Number($("#basic-addon7").val()),
        "Auto Ship Cargo" : Number($("#basic-addon8").val()),

        "Teleop Top Rocket Panels" : Number($("#basic-addon11").val()),
        "Teleop Middle Rocket Panels" : Number($("#basic-addon10").val()),
        "Teleop Bottom Rocket Panels" : Number($("#basic-addon9").val()),
        "Teleop Top Rocket Cargo" : Number($("#basic-addon14").val()),
        "Teleop Middle Rocket Cargo" : Number($("#basic-addon13").val()),
        "Teleop Bottom Rocket Cargo" : Number($("#basic-addon12").val()),
        "Teleop Ship Panels" : Number($("#basic-addon15").val()),
        "Teleop Ship Cargo" : Number($("#basic-addon16").val()),
        "Panel Ground Pickup" : $("#panel_ground_pickup").is(":checked") ? 1 : 0,
        "Cargo Ground Pickup" : $("#cargo_ground_pickup").is(":checked") ? 1 : 0,

        "Endgame Level Climbed" : Number($("#endgame_level_climbed").val()),
        "Endgame Assist in Climbing" : $("#endgame_assist_in_climbing").is(":checked") ? 1 : 0,

        "Reckless Driving" : $("#reckless-driving").is(":checked") ? 1 : 0,
        "Not Present" : $("#not-present").is(":checked") ? 1 : 0,
        "Disabled" : $("#disabled").is(":checked") ? 1 : 0,
        "Robot Failure" : $("#robot-failure").is(":checked") ? 1 : 0,
        "Top Heavy" : $("#top-heavy").is(":checked") ? 1 : 0,
        "Foul" : $("#foul").is(":checked") ? 1 : 0,
        "Card" : $("#card").is(":checked") ? 1 : 0
    };
    
    // TODO: Clear Fields

    $("#m-event-key").val() = ""; 
    Number($("#m-scouted").val()) = 0;
    Number($("#m-number").val()) = 0;
    $("#qual-match").val() = "qf-match";
    Number($("#m-sub-number").val()) = 0;
    Number($("#m-scouting").val()) = 0;
    $("#m-scout").val() = "";

    Number($("#basic-addon3").val()) = 0;
    Number($("#basic-addon2").val()) = 0;
    Number($("#basic-addon1").val()) = 0;
    Number($("#basic-addon6").val()) = 0;
    Number($("#basic-addon5").val()) = 0;
    Number($("#basic-addon4").val()) = 0;
    Number($("#basic-addon7").val()) = 0;
    Number($("#basic-addon8").val()) = 0;

    Number($("#basic-addon11").val()) = 0;
    Number($("#basic-addon10").val()) = 0;
    Number($("#basic-addon9").val()) = 0;
    Number($("#basic-addon14").val()) = 0;
    Number($("#basic-addon13").val()) = 0;
    Number($("#basic-addon12").val()) = 0;
    Number($("#basic-addon15").val()) = 0;
    Number($("#basic-addon16").val()) = 0;
    $("#panel_ground_pickup").is(":checked", false);
    $("#cargo_ground_pickup").is(":checked", false);

    Number($("#endgame_level_climbed").val()) = 0;
    $("#endgame_assist_in_climbing").is(":checked", false); 

    $("#reckless-driving").is(":checked", false);
    $("#not-present").is(":checked", false);
    $("#disabled").is(":checked", false);
    $("#robot-failure").is(":checked", false);
    $("#top-heavy").is(":checked", false);
    $("#foul").is(":checked", false);
    $("#card").is(":checked", false);

    db.collection("the-green-alliance").add(jsonData);
}
