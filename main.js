// Constants
var COMMANDER_SPEECH_INTRO = ["צנחן, תתעורר! אנחנו באמצע שטח אויב ויכולים לבוא איתנו במגע אויבים בכל רגע", "יש לנו מטול מפצח אגוזים אחד אבל אין לנו כסף לתחמושת!", "לפחות אנחנו יודעים איך להשתמש בו, אה? מה? אתה לא יודע איך? טוב, אפשר להסתדר.", "תלמד איך להשתמש במפצח האגוזים, תרוויח לנו כסף כדי שנוכל לקנות תחמושת", "אל תשאל אותי למה, ככה זה עובד.", "טוב יאללה על מה אתה מסתכל, לך ללמוד! הם עוד רגע עלינו"];
var COMMANDER_SPEECH_LENGTH = 6;
var INTRODUCTION_TITLE_ARR = ["הקדמה", 'הת"ת', "יתרונות"];
var INTRODUCTION_TEXT_ARR = ["<p></p>אהלן,<p>בלומדה זו תיחשף למשגר מפצח האגוזים - טיל כתף שמיוצר על ידי חברת רפאל.</p><p>לומדה זו תעבור, ביחד איתך, על כל השלבים להכרת המשגר, שיקולי בטיחות ותפעול תקין.</p>מעתה יהיה לך מד התקדמות בתחתית החלון שבו תוכל לחזור לכל תת-פרק.", "<ul><li>מפצח האגוזים (מטאדור) הוא טיל כתף <b>חד פעמי</b></li><li>קלע המערכת (רקטה) הוא רשק טאנדם: ראש קרב כפול</li><li>למפצח האגוזים <b>אין רתע</b></li> </ul>", "<ul><li>רשק טאנדם מאפשר שני מצבי פגיעה</li><li>פגיעה מדויקת בלילה באמצעות ציין</li><li>דיוק גבוה</li></ul>"];
var INTRODUCTION_TEXT_LENGTH = 3;
var LAUNCHER_PARTS_NUM = 3;
var SCOPE_ARR = ["<img src='media/holosight.png' class='picture'>", "<ul><li>כוונת יעודית - מותאמת ומאופסת לסטיות של רקטת המטאדור</li><li> מגדילה את המטרה פי 3 </li><li>הטווחים מסומנים בטווחים של 25 מטרים​</li><li>הכוונת מאפשרת אומדן טווח גס​</li></ul>"]
var OPMODE = [
    {
        src: "media/houseM.png",
        mode: 'M',
        delay: '20'
    },
    {
        src: "media/houseB.png",
        mode: 'B',
        delay: '2'
    }
]



// Variables
var nPage;
var i = 0;
// -------- Anonymous function -------
// Description: Load function that initializes the correct page
// Parameters: None
// Programmer: Ofir Mashiach
// Date: 12.8.2020
// -----------------------------------
$(function () {
    var pageCheckpoint = sessionStorage.getItem("pageCheckpoint");

    // If it's the first visit, load the beginning
    if (pageCheckpoint === null) {
        nPage = 0;
        $('#startBtn').on('click', startLomda);
    }
});

// -------- startLomda ---------------
// Description: Shows the intro sequence and adds event listener to the window
// Parameters: event
// Programmer: Ofir Mashiach
// Date: 12.8.2020
// -----------------------------------
function startLomda(event) {
    $('#startBtn').off();
    $('.start-page').hide();
    $('.warzone-tutorial').show();
    $("body").css('cursor', 'pointer');
    $(window).on('click', startText);
    startText();
}

// -------- startText ---------------
// Description: Displays intro sequence speech
// Parameters: event
// Programmer: Ofir Mashiach
// Date: 13.8.2020
// ----------------------------------- 
function startText() {
    event.stopImmediatePropagation();
    nPage++;
    // If we're not done with intro sequence speech, keep updating it
    if (nPage <= COMMANDER_SPEECH_LENGTH) {
        $('#commanderSpeechCounter').text(" לחץ על המסך כדי להמשיך " + COMMANDER_SPEECH_LENGTH + " / " + nPage);
        $('#commanderSpeech').text(COMMANDER_SPEECH_INTRO[nPage - 1]);
    }
    else {
        $('.warzone-tutorial').hide();
        $("body").css('cursor', 'default');
        $('#nextBtn').on('click', nextPage).show();
        $(window).off();
        loadPage();
    }
}

function nextPage(event) {
    nPage++;
    loadPage();
}

function prevPage(event) {
    nPage--;
    loadPage();
}

function loadPage() {
    console.log(nPage);
    $('body').children().not('#nextBtn, #prevBtn').hide();

    // Show/hide the next/previous buttons according to certain screens
    if (nPage === COMMANDER_SPEECH_LENGTH + 1) {
        $('#prevBtn').off('click', prevPage).hide();
    }
    else if (nPage === COMMANDER_SPEECH_LENGTH + 2) {
        $('#prevBtn').on('click', prevPage).show();
    }
    // Execute appropriate function to handle each chapter depending on page number
    if (nPage <= COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH) {
        $('.introduction-text').show();
        introduction();
    }
    else if (nPage > COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH && nPage <= COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + 2) {
        $('.launcher-parts' + (nPage - COMMANDER_SPEECH_LENGTH - INTRODUCTION_TEXT_LENGTH)).show();
    }
    else if (nPage === COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + LAUNCHER_PARTS_NUM || nPage === COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + LAUNCHER_PARTS_NUM + 1) {
        $('.introduction-text').show();
        scopeExplain();
    }
    else if (nPage === COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + LAUNCHER_PARTS_NUM + 2) {
        $('.introduction-text').show();
        $(".introduction-text .title").text("מצבי פעולה");
        $('#introduction').css({
            display: 'flex',
            'flex-flow': 'row nowrap',
            'justify-content': 'space-around'
        })
        $('#introduction').html("<img src='media/positions.png' class='sidepic'><div class='sidetext'><p>מצב B - השמדת אויב בתוך ביצורים</p><p>מצב M - יצירת פתח למעבר כוח</p></div>");
    }
    else if (nPage >= COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + LAUNCHER_PARTS_NUM + 3 && nPage <= COMMANDER_SPEECH_LENGTH + INTRODUCTION_TEXT_LENGTH + LAUNCHER_PARTS_NUM + 4) {
        $('.opMode').show();
        $(".opMode .title").text("מצבי פעולה");
        operationModes();
    }
    else {
        window.location.href = "game.html";
    }
}

function introduction() {
    $(".introduction-text .title").html(INTRODUCTION_TITLE_ARR[nPage - COMMANDER_SPEECH_LENGTH - 1]);
    $("#introduction").html(INTRODUCTION_TEXT_ARR[nPage - COMMANDER_SPEECH_LENGTH - 1]);
}

function scopeExplain() {
    $(".introduction-text .title").text("כוונת");
    $("#introduction").html(SCOPE_ARR[nPage - COMMANDER_SPEECH_LENGTH - INTRODUCTION_TEXT_LENGTH - LAUNCHER_PARTS_NUM]);
}

function operationModes() {
    $('#opModeLetter').text(OPMODE[nPage - COMMANDER_SPEECH_LENGTH - INTRODUCTION_TEXT_LENGTH - LAUNCHER_PARTS_NUM - 3].mode)
    $('#opModeImg').attr('src', OPMODE[nPage - COMMANDER_SPEECH_LENGTH - INTRODUCTION_TEXT_LENGTH - LAUNCHER_PARTS_NUM - 3].src);
    $('#opModeDesc').text("השהייה מקוצרת - "+OPMODE[nPage - COMMANDER_SPEECH_LENGTH - INTRODUCTION_TEXT_LENGTH - LAUNCHER_PARTS_NUM - 3].delay + " מילי שניות בין פיצוצים ");
}