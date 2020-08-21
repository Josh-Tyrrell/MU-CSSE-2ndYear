let myStorage = window.localStorage;
document.getElementById("date").textContent = localStorage.getItem("date");

// Changing numbers
let add = document.getElementsByClassName("add");
let remove = document.getElementsByClassName("remove");
let numbers = document.getElementsByClassName("number");

for (let i = 0; i < 6; i++) {
  numbers[i].setAttribute("data-content", localStorage.getItem(i+1) ? localStorage.getItem(i+1): 0);
}

function increase(e, index) {
  let number = e.target.nextSibling.nextSibling;
  let value = number.getAttribute("data-content");
  let intNum = parseInt(value);

  number.setAttribute("data-content", intNum = intNum + 1);

  changeDate();
  let recommended = getRecommended(index);
  if (intNum > recommended) {
    number.style.color = "red";
    number.style.border = "1px solid red";
  }
  localStorage.setItem(`${index}`, intNum);
}

function decrease(e, index) {
  let number = e.target.previousSibling.previousSibling;
  let value = number.getAttribute("data-content");
  let intNum = parseInt(value);

  if(intNum == 0) {
    return false;
  }

  number.setAttribute("data-content", intNum = intNum - 1);

  changeDate();
  let recommended = getRecommended(index);
  if (intNum <= recommended) {
    number.style.color = "white";
    number.style.border = "1px solid white";
  }
}

function changeDate() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d = new Date();

  let currentMonth = d.getMonth();
  let currentDate = d.getDate();
  let currentDay = d.getDay();
  let currentYear = d.getFullYear();
  let currentSeconds = d.getSeconds();
  let currentMinute = d.getMinutes();
  let currentHour = d.getHours();

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }

  console.log(`Last modified: ${currentHour}:${currentMinute}:${currentSeconds} ${currentDate}, ${months[currentMonth]} ${currentYear}`);
  localStorage.setItem("date", `Last modified: ${currentHour}:${currentMinute}:${currentSeconds} ${currentDate}, ${months[currentMonth]} ${currentYear}`);
  document.getElementById("date").textContent = localStorage.getItem("date");
}

function getRecommended(index) {
  if (index == 6) {
    return 6;
  } else if (index == 5) {
    return 4;
  } else if (index == 4) {
    return 3;
  } else if (index == 3) {
    return 2;
  } else if (index == 2) {
    return 1;
  } else {
    return 0;
  }
}
