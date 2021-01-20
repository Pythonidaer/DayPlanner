/* These are what my variables do:
1. container grabs my container class so I can store time blocks in it later.
2. hourArray stores times that loop over the time blocks in correct order.
3. currentDay is an empty <p> that gets stuffed with the Day, Month and Year.
4a. dataHour is a counter that corresponds with 9am-5pm 
4b. for the code however, it corresponds with 9 - 17 due to military time.
5a. militaryTimeHour is a military number (0-23) supplied by dayjs for 24hrs.
5b. data-hour attributes 9-5pm reflect military time to compare time of day.
5c. if time block is before, during or after the hour, block color will change.
6. textInputArr is an array with a pretty interesting lifecycle:
   - starts at [] because user hasn't added anything yet!
   - "" gets pushed to the empty array for each item (hour) in the hourArray 
   - when saveBtn[i] is clicked, corresponding textInputArr[i] gets stored new value of corresponding textarea[i].value;
   - local storage gets updated with a stringified textInputArr for each click as well.
   - on page load, if local storage isn't null, parse the JSON key 'textInputArr'
   - then loop over each textInputArray[i] item to store into textarea[i].value again!
   - otherwise, make sure the textInputArr is still an array;
7. clearBtn is created on the HTML. It will clear localStorage, empty array + empty textarea value
*/
let container = document.querySelector('.container');
let textInputArr;
let hourArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
let clearBtn = document.getElementById('clearBtn');
let currentDay = document.getElementById('currentDay');
let dataHour = 9;
let militaryTimeHour = dayjs().get('hour');
currentDay.textContent = dayjs().format('dddd'+ ', ' + 'MMMM' + ' ' + 'DD');

// when a save button is clicked, store its corresponding textarea value into the corresponding textIntputArr index, then serialize
// also, should remove hourArray from this
// this function also loops over the textInput array and makes each area empty
function setLocalTextareas() {
    let button = document.querySelectorAll('.saveBtn');
    let textarea = document.querySelectorAll('textarea');
    for (let i = 0; i < hourArray; i++) {
        textInputArr.push("");
    }
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function(event) {
            textInputArr[i] = textarea[i].value;
            localStorage.setItem("textInputArr", JSON.stringify(textInputArr));
        });
    };
}

// deserializes the textInputArr if there is one and converts index to textarea.values
function getLocalTextareas() {
    if (localStorage.getItem('textInputArr') !== null) {
        textInputArr = JSON.parse(localStorage.getItem('textInputArr'));
        for (let i = 0; i < textInputArr.length; i++) {
            let textarea = document.querySelectorAll('textarea');
            textarea[i].value = textInputArr[i];
        }
    } else {
        textInputArr = [];
    };
}

// creates the entire time block and calls hour-color, set/get storage functions
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
        planTextArea.setAttribute('data-hour', dataHour);
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
        dataHour++;
    };
    pastPresentFuture();
    setLocalTextareas();
    getLocalTextareas();
};
renderTimeBlock()

// makes past blocks grey if time of day is later than the hour block
// makes present hour red if military time corresponds to time block
// makes future hour green if time block hours are later than current time of day.
function pastPresentFuture() {
    let textarea = document.querySelectorAll('textarea');
    textarea.forEach(function(area) {
        if (parseInt(area.dataset.hour) < militaryTimeHour) {
            area.classList.add('past');
        } else if (parseInt(area.dataset.hour) === militaryTimeHour) {
            area.classList.add('present');
        } else {
            area.classList.add('future');
        }
    })
};

// when clicked, essentially resets application - clears local storage, empties array, even empties every textarea value, which is fine because there is placeholder text to still indicate to user
clearBtn.addEventListener('click', function() {
    localStorage.clear();
    textInputArr = [];
    let textarea = document.querySelectorAll('textarea');
    for (let i = 0; i < textarea.length; i++) {
        textarea[i].value = '';
    }
})