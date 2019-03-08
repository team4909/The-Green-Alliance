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


function sendToDatabase() {
    var jsonData = {
        "Event Key" : $("#m-event-key").val(),
        "Team Scouted" : Number($("#m-scouted").val()),
        "Match Number" : Number($("#m-number").val()),
        "Match Type" : $("input[name='match-type']:checked").val(),
        "Match Type Number" : Number($("#m-sub-number").val()),
        "Scout Team" : Number($("#m-scouting").val()),
        "Scout Initials" : $("#m-scout").val(),

        "Auto Top Rocket Panels" : Number($("input[data-counter='auto_top_rocket_panels']").val()),
        "Auto Middle Rocket Panels" : Number($("input[data-counter='auto_middle_rocket_panels']").val()),
        "Auto Bottom Rocket Panels" : Number($("input[data-counter='auto_bottom_rocket_panels']").val()),
        "Auto Top Rocket Cargo" : Number($("input[data-counter='auto_top_rocket_cargo']").val()),
        "Auto Middle Rocket Cargo" : Number($("input[data-counter='auto_middle_rocket_cargo']").val()),
        "Auto Bottom Rocket Cargo" : Number($("input[data-counter='auto_bottom_rocket_cargo']").val()),
        "Auto Ship Panels" : Number($("input[data-counter='auto_ship_panels']").val()),
        "Auto Ship Cargo" : Number($("input[data-counter='auto_ship_cargo']").val()),

        "Teleop Top Rocket Panels" : Number($("input[data-counter='teleop_top_rocket_panels']").val()),
        "Teleop Middle Rocket Panels" : Number($("input[data-counter='teleop_middle_rocket_panels']").val()),
        "Teleop Bottom Rocket Panels" : Number($("input[data-counter='teleop_bottom_rocket_panels']").val()),
        "Teleop Top Rocket Cargo" : Number($("input[data-counter='teleop_top_rocket_cargo']").val()),
        "Teleop Middle Rocket Cargo" : Number($("input[data-counter='teleop_middle_rocket_cargo']").val()),
        "Teleop Bottom Rocket Cargo" : Number($("input[data-counter='teleop_bottom_rocket_cargo']").val()),
        "Teleop Ship Panels" : Number($("input[data-counter='teleop_ship_panels']").val()),
        "Teleop Ship Cargo" : Number($("input[data-counter='teleop_ship_cargo']").val()),
        "Panel Ground Pickup" : $("#panel_ground_pickup").is(":checked") ? 1 : 0,
        "Cargo Ground Pickup" : $("#cargo_ground_pickup").is(":checked") ? 1 : 0,

        "Endgame Level Climbed" : Number($("input[data-counter='endgame_level_climbed']").val()),
        "Endgame Assist in Climbing" : $("#endgame_assist_in_climbing").is(":checked") ? 1 : 0,

        "Reckless Driving" : $("#reckless-driving").is(":checked") ? 1 : 0,
        "Not Present" : $("#not-present").is(":checked") ? 1 : 0,
        "Disabled" : $("#disabled").is(":checked") ? 1 : 0,
        "Robot Failure" : $("#robot-failure").is(":checked") ? 1 : 0,
        "Top Heavy" : $("#top-heavy").is(":checked") ? 1 : 0,
        "Foul" : $("#foul").is(":checked") ? 1 : 0,
        "Card" : $("#card").is(":checked") ? 1 : 0
    };
    
    $(`.match-metadata input[type='text']`).val("");
    $(`.match-metadata input[type='number']`).val("");
    $("#m-event-key").val(localStorage.getItem("event"));
    $(`input[data-counter]`).val("0");
    $(`input[type='checkbox']`).prop("checked", false);
    $('#wizard_horizontal').steps('restart');

    db.collection("the-green-alliance").add(jsonData);
}

var columnDefs = [
  {
    "title": "Event Key",
    "data": "Event Key"
  },
  {
    "title": "Team Scouted",
    "data": "Team Scouted"
  },
  {
    "title": "Match Number",
    "data": "Match Number"
  },
  {
    "title": "Match Type",
    "data": "Match Type"
  },
  {
    "title": "Match Type Number",
    "data": "Match Type Number"
  },
  {
    "title": "Scout Team",
    "data": "Scout Team"
  },
  {
    "title": "Scout Initials",
    "data": "Scout Initials"
  },
  {
    "title": "Auto Top Rocket Panels",
    "data": "Auto Top Rocket Panels"
  },
  {
    "title": "Auto Middle Rocket Panels",
    "data": "Auto Middle Rocket Panels"
  },
  {
    "title": "Auto Bottom Rocket Panels",
    "data": "Auto Bottom Rocket Panels"
  },
  {
    "title": "Auto Top Rocket Cargo",
    "data": "Auto Top Rocket Cargo"
  },
  {
    "title": "Auto Middle Rocket Cargo",
    "data": "Auto Middle Rocket Cargo"
  },
  {
    "title": "Auto Bottom Rocket Cargo",
    "data": "Auto Bottom Rocket Cargo"
  },
  {
    "title": "Auto Ship Panels",
    "data": "Auto Ship Panels"
  },
  {
    "title": "Auto Ship Cargo",
    "data": "Auto Ship Cargo"
  },
  {
    "title": "Teleop Top Rocket Panels",
    "data": "Teleop Top Rocket Panels"
  },
  {
    "title": "Teleop Middle Rocket Panels",
    "data": "Teleop Middle Rocket Panels"
  },
  {
    "title": "Teleop Bottom Rocket Panels",
    "data": "Teleop Bottom Rocket Panels"
  },
  {
    "title": "Teleop Top Rocket Cargo",
    "data": "Teleop Top Rocket Cargo"
  },
  {
    "title": "Teleop Middle Rocket Cargo",
    "data": "Teleop Middle Rocket Cargo"
  },
  {
    "title": "Teleop Bottom Rocket Cargo",
    "data": "Teleop Bottom Rocket Cargo"
  },
  {
    "title": "Teleop Ship Panels",
    "data": "Teleop Ship Panels"
  },
  {
    "title": "Teleop Ship Cargo",
    "data": "Teleop Ship Cargo"
  },
  {
    "title": "Panel Ground Pickup",
    "data": "Panel Ground Pickup"
  },
  {
    "title": "Cargo Ground Pickup",
    "data": "Cargo Ground Pickup"
  },
  {
    "title": "Endgame Level Climbed",
    "data": "Endgame Level Climbed"
  },
  {
    "title": "Endgame Assist in Climbing",
    "data": "Endgame Assist in Climbing"
  },
  {
    "title": "Reckless Driving",
    "data": "Reckless Driving"
  },
  {
    "title": "Not Present",
    "data": "Not Present"
  },
  {
    "title": "Disabled",
    "data": "Disabled"
  },
  {
    "title": "Robot Failure",
    "data": "Robot Failure"
  },
  {
    "title": "Top Heavy",
    "data": "Top Heavy"
  },
  {
    "title": "Foul",
    "data": "Foul"
  },
  {
    "title": "Card",
    "data": "Card"
  }
];

function reloadMatches(){
    db.collection("the-green-alliance").get().then(function (querySnapshot) {
        $('#matches').DataTable({
            data: querySnapshot.docs.map((doc) => {
                var match = doc.data();

                match["Event Key"] = match["Event Key"].toUpperCase();
                match["Grouping Key"] = match["Event Key"].toUpperCase().replace(/^[0-9]+/, '') + match["Team Scouted"];

                return match;
            }),
            scrollX: true,
            destroy: true,
            columns: columnDefs
        });
    });
}

var columnTeamDefs = [
  {
    "title": "Event Key",
    "data": "Event Key"
  },
  {
    "title": "Team Scouted",
    "data": "Team Scouted"
  },
  {
    "title": "Auto Top Rocket Panels",
    "data": "Auto Top Rocket Panels"
  },
  {
    "title": "Auto Middle Rocket Panels",
    "data": "Auto Middle Rocket Panels"
  },
  {
    "title": "Auto Bottom Rocket Panels",
    "data": "Auto Bottom Rocket Panels"
  },
  {
    "title": "Auto Top Rocket Cargo",
    "data": "Auto Top Rocket Cargo"
  },
  {
    "title": "Auto Middle Rocket Cargo",
    "data": "Auto Middle Rocket Cargo"
  },
  {
    "title": "Auto Bottom Rocket Cargo",
    "data": "Auto Bottom Rocket Cargo"
  },
  {
    "title": "Auto Ship Panels",
    "data": "Auto Ship Panels"
  },
  {
    "title": "Auto Ship Cargo",
    "data": "Auto Ship Cargo"
  },
  {
    "title": "Teleop Top Rocket Panels",
    "data": "Teleop Top Rocket Panels"
  },
  {
    "title": "Teleop Middle Rocket Panels",
    "data": "Teleop Middle Rocket Panels"
  },
  {
    "title": "Teleop Bottom Rocket Panels",
    "data": "Teleop Bottom Rocket Panels"
  },
  {
    "title": "Teleop Top Rocket Cargo",
    "data": "Teleop Top Rocket Cargo"
  },
  {
    "title": "Teleop Middle Rocket Cargo",
    "data": "Teleop Middle Rocket Cargo"
  },
  {
    "title": "Teleop Bottom Rocket Cargo",
    "data": "Teleop Bottom Rocket Cargo"
  },
  {
    "title": "Teleop Ship Panels",
    "data": "Teleop Ship Panels"
  },
  {
    "title": "Teleop Ship Cargo",
    "data": "Teleop Ship Cargo"
  },
  {
    "title": "Panel Ground Pickup",
    "data": "Panel Ground Pickup"
  },
  {
    "title": "Cargo Ground Pickup",
    "data": "Cargo Ground Pickup"
  },
  {
    "title": "Endgame Level Climbed",
    "data": "Endgame Level Climbed"
  },
  {
    "title": "Endgame Assist in Climbing",
    "data": "Endgame Assist in Climbing"
  },
  {
    "title": "Reckless Driving",
    "data": "Reckless Driving"
  },
  {
    "title": "Not Present",
    "data": "Not Present"
  },
  {
    "title": "Disabled",
    "data": "Disabled"
  },
  {
    "title": "Robot Failure",
    "data": "Robot Failure"
  },
  {
    "title": "Top Heavy",
    "data": "Top Heavy"
  },
  {
    "title": "Foul",
    "data": "Foul"
  },
  {
    "title": "Card",
    "data": "Card"
  }
];

function reloadTeamMatches(){
    db.collection("the-green-alliance").get().then(function (querySnapshot) {
        matches = querySnapshot.docs.map((doc) => {
            var match = doc.data();

            match["Event Key"] = match["Event Key"].toUpperCase();
            match["Grouping Key"] = match["Event Key"].toUpperCase().replace(/^[0-9]+/, '') + match["Team Scouted"];

            return match;
        });

        averages = _.groupBy(matches, function (match) {
            return match["Grouping Key"].replace(/\s/g, '').toUpperCase();
        });
        
        averages = _.map(averages, function (matches) {
            /* BASED ON https://codereview.stackexchange.com/a/141533 */
            var averagesCalc = Array.from(matches.reduce(
                    (acc, obj) => Object.keys(obj).reduce(
                        (acc, key) => typeof obj[key] == "number" ?
                        acc.set(key, ( // immediately invoked function:
                            ([sum, count]) => [sum + obj[key], count + 1]
                        )(acc.get(key) || [0, 0])) // pass previous value
                        :
                        acc,
                        acc),
                    new Map()),
                ([key, [sum, count]]) => ({
                    key,
                    value: (sum / count).toFixed(2)
                })
            );
        
            averages = {
                "Event Key": matches[0]["Event Key"],
            };
            
            averagesCalc.forEach((e,i) => {
                averages[e.key] = e.value
            });
            
            averages["Team Scouted"] = matches[0]["Team Scouted"];
            
            // RIP out Metadata
            averages.grouping_key = "undefined";
            averages.match_number = undefined;
            averages.match_type = undefined;
            averages.match_type_number = undefined;
            averages.scout_initials = undefined;
            averages.scout_team = undefined;
            
            return averages;
        });
        
        $('#averages').DataTable({
            data: averages,
            scrollX: true,
            destroy: true,
            columns: columnTeamDefs
        });
    });
}