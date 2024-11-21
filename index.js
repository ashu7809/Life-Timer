let isDobOpen = false; 
let dateOfBirth;


const settingCogEl = document.getElementById("settingIcon");
const settingcontentEl = document.getElementById("settingcontent");

const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBButton");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

console.log(localStorage.getItem("year"));

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
  };


const toggle = () => {
    if (isDobOpen) {
        settingcontentEl.classList.add("hide");
    } else {
        settingcontentEl.classList.remove("hide");
    }
    isDobOpen = !isDobOpen; 
    console.log('Toggle', isDobOpen);
};


const  updateAge=()=>{
    const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;
  
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
  const second = Math.floor(dateDiff / 1000) % 60;

  

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  dayEl.innerHTML = makeTwoDigitNumber(day);
  hourEl.innerHTML = makeTwoDigitNumber(hour);
  minuteEl.innerHTML = makeTwoDigitNumber(minute);
  secondEl.innerHTML = makeTwoDigitNumber(second);


};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    if (year && month && date) {
      dateOfBirth = new Date(year, month, date);
    }
  
    updateAge();
  };

  const contentToggler = () => {
    updateAge();
    if (dateOfBirth) {
      initialTextEl.classList.add("hide");
      afterDOBBtnTxtEl.classList.remove("hide");
    } else {
      afterDOBBtnTxtEl.classList.add("hide");
      initialTextEl.classList.remove("hide");
    }
  };


const setDOBHandler=()=>{
  const  dateString = dobInputEl.value;

  dateOfBirth =dateString ? new Date(dateString) : null;



    if(dateOfBirth){

        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
    }
    contentToggler();
    setInterval(()=> updateAge(),1000);
    // console.log("date of birth",dateOfBirth);
    
};

localStorageGetter();
// setDOBHandler();
contentToggler();

settingCogEl.addEventListener("click", toggle);
dobButtonEl.addEventListener("click", setDOBHandler);
