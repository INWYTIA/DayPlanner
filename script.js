var hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',];
var schedule = {
    '9am' : '',
    '10am' : '',
    '11am' : '',
    '12pm' : '',
    '1pm' : '',
    '2pm' : '',
    '3pm' : '',
    '4pm' : '',
    '5pm' : '',
};

function getSchedule () {
    var oldSchedule = JSON.parse(localStorage.getItem('schedule'));
    if (oldSchedule === null) {
        saveList();
    } else {
        schedule = oldSchedule;
    };
    hours.forEach(populate);
};

function populate (now) {
    $('#' + now).text(schedule[now]);
};

function timeUpdate() {
    var curDate = moment().format('MMMM Do YYYY');
    $('#currentDay').text(curDate);
    hours.forEach(hourCheck);
};

function hourCheck(time) {
    var curTime = moment().format('kk');
    var curHour = $('#' + time);
    curHour.removeClass('past present future');
    if (curHour.attr('value') < curTime) {
        curHour.addClass('past');
    } else if (curHour.attr('value') === curTime) {
        curHour.addClass('present');
    } else {
        curHour.addClass('future');
    };
};

function saveList () {
    hours.forEach(setSchedule);
    localStorage.setItem('schedule', JSON.stringify(schedule));
};

function setSchedule (time) {
    var plans = $('#' + time).val();
    schedule[time] = plans;
}

$('.saveBtn').on('click', saveList);

getSchedule();

setInterval(timeUpdate, 1000);