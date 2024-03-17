const form = document.querySelector('form');
const inputs = document.querySelectorAll('input'); 
const dayInput = document.getElementById('date-of-birth-day');
const monthInput = document.getElementById('date-of-birth-month');
const yearInput = document.getElementById('date-of-birth-year');

function isValidDay(day) {
    return !isNaN(day) && parseInt(day) >= 1 && parseInt(day) <= 31;
}

function isValidMonth(month) {
    return !isNaN(month) && parseInt(month) >= 1 && parseInt(month) <= 12;
}

function isValidYear(year) {
    return !isNaN(year) && parseInt(year) >= 1900 && parseInt(year) <= 2024;
}


function validate(e) {
    const label = e.target.previousElementSibling;
    const errorMessage = label.querySelector('span');

        // get the input value
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    // validate
    const isDayValid = isValidDay(day);
    const isMonthValid = isValidMonth(month);
    const isYearValid = isValidYear(year);

    if(isDayValid && isMonthValid && isYearValid) {
        label.classList.remove('invalid-color');
        e.target.classList.remove('invalid-border');
        errorMessage.style.display = 'none';
    } else {
        label.classList.add('invalid-color');
        e.target.classList.add('invalid-border');
        errorMessage.style.display = 'block';
    }
}

inputs.forEach(input => {
    input.addEventListener('input', validate);
});

const monthLengths = {
    1: 31, // January
    2: 28, // February (common year)
    3: 31, // March
    4: 30, // April
    5: 31, // May
    6: 30, // June
    7: 31, // July
    8: 31, // August
    9: 30, // September
    10: 31, // October
    11: 30, // November
    12: 31, // December
};

function calculateAge(e) {
    e.preventDefault();

    // grab the tag you want to display
    let y = document.querySelector('.new-year');
    let m = document.querySelector('.new-month');
    let d = document.querySelector('.new-day');

        // get the input value
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;


    if (day === '' || month === '' || day === '') {
        return;
    };

    if (day < 1 || day > 31) {
        return;
    } else if (month < 1 || month > 12) {
        return;
    } else if (year < 0 || year > 2024) {
        return;
    }


    const currentAge = new Date();
    let currentYear = currentAge.getFullYear() - year;
    let currentMonthIndex = currentAge.getMonth();
    let newMonth = currentMonthIndex - month;
    let currentDate = currentAge.getDate() - day;

    if (currentMonthIndex < month || (currentMonthIndex === month && currentDate < day)) {
        currentYear--;
        newMonth += 12;
    };

    if (currentDate < 0) {
        // Calculate the actual day difference
        const prevMonth = (currentMonthIndex === 1) ? 12 : currentMonthIndex - 1;
        const prevMonthDays = monthLengths[prevMonth];
        currentDate = prevMonthDays + currentDate;
    };

    y.textContent = currentYear;
    m.textContent = newMonth;
    d.textContent = currentDate;

}

form.addEventListener('submit', calculateAge);