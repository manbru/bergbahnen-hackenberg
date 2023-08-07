// Events Toggle

function toggle(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    div.classList.toggle('active');
}

// Events Quantity

function increase(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if(div.value < 30) {
        div.value++;
    }
}

function decrease(e) {
    const button = e.target;
    const divId = button.dataset.targetId;
    const div = document.getElementById(divId);

    if (div.value > 0) {
        div.value--;
    }
}

// Date Picker

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_elements = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element =document.querySelector('.date-picker .dates .days');

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

const months = [
    {name: 'Januar', days: 31}, 
    {name: 'Februar', days: isLeapYear(selectedYear) ? 29 : 28},
    {name: 'März', days: 31},
    {name: 'April', days: 30},
    {name: 'Mai', days: 31},
    {name: 'Juni', days: 30},
    {name: 'Juli', days: 31},
    {name: 'August', days: 31},
    {name: 'September', days: 30},
    {name: 'Oktober', days: 31},
    {name: 'November', days: 30},
    {name: 'Dezember', days: 31}
];



mth_elements.textContent = months[month].name + ' ' + year;

selected_date_element.textContent = formatDate(date);

populateDates();

// event listeners

date_picker_element.addEventListener('click', ToggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// functions

function ToggleDatePicker (e) {
    if (!checkEventPathForClass(e.composedPath(), 'dates')) {
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth (e) {
    month ++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_elements.textContent = months[month].name + ' ' + year;
    populateDates();
}

function goToPrevMonth (e) {
    month --;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_elements.textContent = months[month].name + ' ' + year;
    populateDates();
}

function populateDates (e) {
    days_element.innerHTML = '';
    console.log(selectedMonth)
    let amount_days = months[month].days;
    console.log(amount_days)
    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;

        if(selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function () {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDates();
        })

        days_element.appendChild(day_element);
    }
}

// helper functions

function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 0) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 0) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + '.' + month + '.' + year;
}

function isLeapYear(y) {
    if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) {
        return true;
    }

    return false;
}