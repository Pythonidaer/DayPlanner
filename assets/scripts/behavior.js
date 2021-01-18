/*
Get container, build hours in an array, declare hourInput [], obtain user text Input;
*/
let container = document.querySelector('.container');
let hourArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
let hourInput;
let userInput;
let saveIndex;
let inputIndex;
let newInput;
let currentDay = document.getElementById('currentDay');
let time = 9;
let hour = dayjs().get('hour');

console.log(dayjs().format('dddd'+ ', ' + 'MMMM' + ' ' + 'DD'));
currentDay.textContent = dayjs().format('dddd'+ ', ' + 'MMMM' + ' ' + 'DD');

// For each element in the hours array, create a time block
function renderTimeBlock() {
    for (let i = 0; i < hourArray.length; i++) {
        let timeBlock = document.createElement('div');
        let hourDiv = document.createElement('div');
        let hourP = document.createElement('p');
        let planDiv = document.createElement('div');
        let planLabel = document.createElement('label');
        let planTextArea = document.createElement('textarea');
        let saveDiv = document.createElement('div');
        let saveBtn = document.createElement('button');
        let saveIcon = document.createElement('i');

        timeBlock.classList.add('time-block');
        hourDiv.classList.add('hour');
        hourP.setAttribute('data-index', i);
        hourP.textContent = hourArray[i];
        planDiv.classList.add('plan-input');
        planLabel.setAttribute('for', 'hour');
        planTextArea.setAttribute('data-hour', time);
        planTextArea.setAttribute('data-index', i);
        planTextArea.setAttribute('name', 'hour');
        planTextArea.classList.add('text-input');
        planTextArea.setAttribute('placeholder', 'Your text here...');
        saveDiv.classList.add('save');
        saveBtn.setAttribute('data-index', i);
        saveBtn.classList.add('saveBtn');
        saveIcon.classList.add('far', 'fa-save', 'save-icon');

        container.append(timeBlock);
        hourDiv.append(hourP);
        timeBlock.append(hourDiv);
        planDiv.append(planLabel);
        planDiv.append(planTextArea);
        timeBlock.append(planDiv);
        saveBtn.append(saveIcon);
        saveDiv.append(saveBtn);
        timeBlock.append(saveDiv);


        time++;

    };
    pastPresentFuture();
};
renderTimeBlock()

/* 
for each textarea, if its data-hour is less than current hour, add past bg-color grey
- if the data-set equals the hour exactly, make present hour bg-color red
- else add future class that is green
*/
function pastPresentFuture() {
    let textarea = document.querySelectorAll('textarea');

    textarea.forEach(function(area) {
        if (parseInt(area.dataset.hour) < hour) {
            area.classList.add('past');
        } else if (parseInt(area.dataset.hour) === hour) {
            area.classList.add('present');
        } else {
            area.classList.add('future');
        }
    })
};

// I am trying to connect the save button to logging the value (if there is any)
// Maybe I need to add an if condition here if (value) = for loop else (return);
function dataListener() {

    let button = document.querySelectorAll('.saveBtn');
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function(event) {
            hourInput = [];
            
            saveIndex = parseInt(this.dataset.index);
            inputIndex = parseInt(this.parentElement.previousSibling.children[1].dataset.index);

            if (saveIndex === inputIndex) {
                userInput = this.parentElement.previousSibling.children[1].value;
                if (userInput) {
                    console.log(userInput);
                }
            }
            
            setInput();
            loadInput();
        });
    };

    // input.forEach( function(elem) {
    //     elem.addEventListener('input', function() {
    //         console.log('test');
    //     })
    // })
    // input.addEventListener('click', function() {
    //     console.log(this);
    // })
};
dataListener();

// Rushing with this
function getInput() { 
    if (localStorage.getItem('hourInput') !== null) {
        hourInput = JSON.parse(localStorage.getItem('hourInput'));
    } else {
        hourInput = [];
    }; 
}
getInput();
/*
This currently re-writes whatever gets scored to the newInput object
I need this to create a new object for each time block;
This is currently not a scalable solution
*/
function setInput() {
    newInput = {
        "input": userInput
    };
    // console.log(newInput);
    // console.log(hourInput);
    hourInput.push(newInput);
    localStorage.setItem("hourInput", JSON.stringify(hourInput));
}
// console.log(hourInput);
// console.log(hourInput.input);
function loadInput() {
    for (let i = 0; i < hourInput.length; i++) {
        userInput.value = hourInput.input;
    };
}
 

/*
What I want to do is watch the .gif
I want to watch the .gif to see how one block is made.
I want to build one of the blocks with HTML/CSS.
Once I build the block I want to create an array of 9-5 hours.
Once I build the array, I want to loop over a function.
I want this function to create a block for each (similar to CodingQuiz code).
Once the form is there, local storage and editable input should be the challenge.
*/

// display timeblocks for standard business hours (9am 5pm)

// each time block contains an input field & a save button

// time block save button saves the input text to localStorage, allowing the text to persist when the app is refreshed.

// current day displayed at the top of the calendar (Moment.js / Day.js etc)

// each time block color coded to indicate whether it is in the past, present or future (hour) -- looks like this will compare 9am to the actual time

// Uses moment.js to work with data & time or Luxox, Day.js, date-fns or js-Joda

// AS AN employee who's busy, I WANT to add events to a planner SO THAT I can manage time effectively

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I'm presented with time blocks for standard business hours
// WHEN I view the blocks for that day
// THEN each time block color-coded: past, present or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in localStorage
// WHEN I refreshed the page
// THEN the saved events persist