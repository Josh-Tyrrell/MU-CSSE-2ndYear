myStorage = window.localStorage;
let studentData;
let assignment;
let initialScore;
let initialScoreValues = [];
let blurred = false;
let columnBlurred = false;
let columnEle;
let clickedEle;
let headers = ["th.student-name", "th.student-id"];



// If studentData defined in localStorage, get data and set studentData to data, otherwise set it to default
if (localStorage.getItem("studentData")) {
    studentData = localStorage.getItem("studentData");
    studentData = JSON.parse(studentData);
} else {
    studentData = {
        1:{
            studentName: "George Bichael",
            studentID: 654327543,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        2:{
            studentName: "Betty Crocker",
            studentID: 696969420,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        3:{
            studentName: "Warvey Heinstein",
            studentID: 388023582,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        4:{
            studentName: "Tuentin Quarintino",
            studentID: 458674238,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        5:{
            studentName: "Spevin Kasey",
            studentID: 996752432,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        6:{
            studentName: "Ainsley Harriot",
            studentID: 954653481,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        7:{
            studentName: "Robbie AFTV",
            studentID: 476824917,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        8:{
            studentName: "Cill Bobsby",
            studentID: 586775629,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        9:{
            studentName: "Greta Thumberg",
            studentID: 524078315,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
        10:{
            studentName: "Josefin Sans",
            studentID: 823745678,
            assignments: {
                1: "-",
                2: "-",
                3: "-",
                4: "-",
                5: "-",
            },
            average: 0
        },
    }

    localStorage.setItem("studentData", JSON.stringify(studentData));
}


// Getting size of Object with help from stackoverflow
// https://stackoverflow.com/questions/5223/length-of-a-javascript-object
Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


// Get the size of studentData
let size = Object.size(studentData);
let assignmentSize = Object.size(studentData[1].assignments);


// Get the amount of unsubmitted assignments using checkAssignmentsLength() and update the HTML
localStorage.setItem("unsubmittedAssignments", checkAssignmentsLength());
$("#unsubmitted_value").text(localStorage.getItem("unsubmittedAssignments"));


// Loop through studentData to add row to table using addData();
for(let i = 1; i <= size; i++) {
    addData(studentData[i], assignmentSize, i);
}


// Loop through the amount of assignments to get appropriate headers
for(let i = assignmentSize; i >= 1; i--) {
    $("#id_header").after(`<th class="${i}" id="assignment_header">Assignment ${i}</th>`);
}


// Display data
function addData(data, assignmentsSize, index) {
    let assignments = [];
    let sum = 0;

    // Loop through assignments to create HTML table cells and append to array, also get average
    for(let i = 1; i <= assignmentsSize; i++) {

        let assignmentValue = data.assignments[i];
        
        assignments.push(`<td class="grade ${i} ${assignmentValue == "-" ? "no-value" : ""}" id="${[i]}">${assignmentValue}</td>`);

        assignmentValue == "-" ? assignmentValue = 0 : assignmentValue;
        sum += parseInt(assignmentValue);
    }

    let average = Math.round(sum/assignmentsSize);
    let htmlAverage;

    average < 60 ? htmlAverage = `<td class="average-grade below-sixty">${average}</td>` : htmlAverage = `<td class="average-grade">${average}</td>`
    assignments = assignments.join("");
    
    // Append all student data to new row in table
    let studentRow = `<tr id="${index}"><td class="student-name">${data.studentName}</td><td id="student_id" class="student-id ${data.studentID}">${data.studentID}</td>${assignments}${htmlAverage}</tr>`
    $("#student_grades").append(studentRow);
}

// Once assignment grade's been clicked, change to form
$(".grade").click(function(){
    changeGradeToggle($(this));
});


// Create intial average to switch from GPA back to percentage
storeIntialScores();

// Updating Grade
function changeGrade() {
    let data = $("#changing_grade input").val();
    let tableCell = $("#changing_grade").parent();
    let id = $("#changing_grade").parent().prevAll("#student_id").text();
    let pattern = /\D+\S+[^.]/;

    // Check value for invalid input and change accordingly
    if (data.match(pattern)) data = "-";

    data == "-" || data == "" ? data = "-" : data = parseFloat(data);

    // Check value for invalid input and change accordingly
    if (!data || data > 100 || data < 0) {
        tableCell.addClass("no-value");
        tableCell.text("-");
        data = "-";
    } else if (data == "-") {
        tableCell.addClass("no-value");
        tableCell.text(data);
    } else {
        tableCell.removeClass("no-value");
        tableCell.css("background-color", "rgb(216, 214, 214)");
        let darkenCellSize = Object.size($("tr:nth-child(odd) td"));

        for (let i = 0; i < darkenCellSize; i++) {
            if (tableCell[0] == $("tr:nth-child(odd) td")[i]) {
                darken([tableCell]);
            }
        }
        
        tableCell.text(data);
    }

    // Need to rebind the click event
    $(".grade").click(function(){
        changeGradeToggle($(this));
    });

    /* 
    Loop through student data to find matching student id. This is done so I know which student's assignment was clicked
    Set assignment in object to value and also get averages of assignments then update local storage and HMTL
    */
    for (let i = 1; i <= size; i++) {
        if (studentData[i].studentID == id) {
            studentData[i].assignments[assignment] = data;
            let size = Object.size(studentData[i].assignments);
            let sum = 0;

            for (let j = 1; j <= size; j++) {
                assignmentValue = studentData[i].assignments[j];
                assignmentValue == "-" ? assignmentValue = 0 : assignmentValue;
                sum += parseInt(assignmentValue);
            }

            let average = sum / size;
            studentData[i].average = Math.round(average);

            $(`.${id}`).nextAll(".average-grade").text(Math.round(average));
            // Add initial scores so when you toggle grade, the average is still updated
            storeIntialScores();

            average < 60 ? $(`.${id}`).nextAll(".average-grade").addClass("below-sixty") : $(`.${id}`).nextAll(".average-grade").removeClass("below-sixty");
        }
    }

    // Store new data in localStorage
    localStorage.setItem("studentData", JSON.stringify(studentData));
    localStorage.setItem("unsubmittedAssignments", checkAssignmentsLength());
    $("#unsubmitted_value").text(localStorage.getItem("unsubmittedAssignments"));
 
    event.preventDefault();
}


// Grade Toggle
let gradeType = "Percent";
let averageGrades = $(".average-grade");
let letterToGPA = {
    "A": "4.0",
    "A-": "3.7",
    "B+": "3.3",
    "B": "3.0",
    "B-": "2.7",
    "C+": "2.3",
    "C": "2.0",
    "C-": "1.7",
    "D+": "1.3",
    "D": "1.0",
    "D-": "0.7",
    "F": "0.0"
};


// Toggle function, change variable depending on what value it is and call changeGradeType to change values of grades
$(".average-grade").click(() => {
    for (let i = 0; i < averageGrades.length; i++) {        
        changeGradeType(averageGrades[i], (initialScoreValues[i]));
    }
    if (gradeType == "Percent") {
        gradeType = "Letter";
    } else if (gradeType == "Letter") {
        gradeType = "4.0";
    } else if (gradeType == "4.0") {
        gradeType = "Percent";
    }
});


// Changing values of grades
function changeGradeType(ele, initialScore) {
    let score = $(ele).text();

    if (gradeType == "Percent") {
        score = parseInt(score);
        !score && score != 0 ? score = "Average Grade" : score = score;
        // Sorry
        if(score <= 100 && score >= 93) score = "A";
        else if(score <= 92 && score >= 90) score = "A-";
        else if(score <= 89 && score >= 87) score = "B+";
        else if(score <= 86 && score >= 83) score = "B";
        else if(score <= 82 && score >= 80) score = "B-";
        else if(score <= 79 && score >= 77) score = "C+";
        else if(score <= 76 && score >= 73) score = "C";
        else if(score <= 72 && score >= 70) score = "C-";
        else if(score <= 69 && score >= 67) score = "D+";
        else if(score <= 66 && score >= 63) score = "D";
        else if(score <= 62 && score >= 60) score = "D-";
        else if(score < 60) score = "F";
        $(ele).text(score);
    } else if (gradeType == "Letter") {
        score = letterToGPA[score];
        $(ele).text(score);
    } else if (gradeType == "4.0") {
        $(ele).text(initialScore);
    }
}

// Loop through all assignments to check for empty values and return the amount of unsubmitted assignments
function checkAssignmentsLength() {
    let studentSize = Object.size(studentData);
    let assignmentSize = Object.size(studentData[1].assignments);
    let counter = 0;

    for (let i = 1; i <= studentSize; i++) {
        for (let j = 1; j <= assignmentSize; j++) {
            studentData[i].assignments[j] == "-" ? counter = counter + 1 : counter = counter;
        }
    }
    return counter;
}


// Create HTML for add student form or remove
let addingRow = false;
$("#add_row").click(() => {
    let assignmentSize = Object.size(studentData[1].assignments);
    if (addingRow === false) {
        let assignmentInputs = [];
        addingRow = true;

        $("#add_row").text("Cancel");

        for (let i = 1; i <= assignmentSize; i++) {
            assignmentInputs.push(`<input type="text" name="${[i]}" id="${[i]}" placeholder="Assignment ${i} Score"/>`);
        }

        $("#add_student_form").css("display", "block");
        $("#add_student_form").append(`<div name="assignments">${assignmentInputs.join("")}</div><button id="save">Save</button>`);
    } else {
        // cancel
        $("#add_row").text("Add Student");
        $("#add_student_form").css("display", "none");
        for (let i = 1; i <= assignmentSize; i++) {
            $("#add_student_form #" + i).remove();
            $("#add_student_form button").remove();
        }
        addingRow = false;
    }
});


// On form submit, prevent default and get values of input. Store in studentData after data has been cleaned
$("#add_student_form").submit((e) => {
    let data = $("#add_student_form").serializeArray();
    let assignments = {};

    let assignmentsSize = Object.size(studentData[1].assignments);
    let size = Object.size(studentData);

    for (let i = 1; i <= assignmentsSize; i++) {
        let dataValue = data[i+1].value;
        let pattern = /\D+\S+[^.]/;
        
        if (data[i+1].value.match(pattern)) {
            dataValue = "-";
        }

        dataValue == "-" ? dataValue = "-" : dataValue = parseFloat(dataValue);

        if (!dataValue || dataValue > 100 || dataValue < 0 || typeof(dataValue) == "string") {
            dataValue = "-"
        } else {
            dataValue = data[i+1].value;
        }
        assignments[i] = dataValue;
    }

    let newStudentData = {
        studentName: data[0].value,
        studentID: data[1].value,
        assignments: assignments,
        average: 0
    }
    
    studentData[size+1] = newStudentData;

    localStorage.setItem("studentData", JSON.stringify(studentData));
    location.reload();
    e.preventDefault();
});


// Add assignment to each student
$("#add_assignment").click(() => {
    let assignmentSize = Object.size(studentData[1].assignments);
    let size = Object.size(studentData);

    for (let i = 1; i <= size; i++ ) {
        studentData[i].assignments[assignmentSize+1] = "-";
    }

    localStorage.setItem("studentData", JSON.stringify(studentData));

    location.reload();
});


// Change table cell to input
function changeGradeToggle(ele) {
    $(".grade").unbind("click");
    let value = ele.text();
    assignment = ele.attr("id");
    
    ele.html(`<form method="POST" id="changing_grade" onsubmit="changeGrade()"><input type="text" placeholder="${value}" value="${value}"/></form>`);
}

// Storing intial averages
function storeIntialScores() {
    // Add initial scores so when you toggle grade, the average is still updated
    initialScore = $(".average-grade");
    initialScoreValues = [];

    for (let i = 0; i < initialScore.length; i++) {
        initialScoreValues.push($(initialScore[i]).text());
    }
}


for (let i = 1; i <= assignmentSize; i++) {
    headers.push(`th.${i}`);
}

$(document).ready(() => {
    $(".student-name").not("th.student-name").click((e) => {        
        if (e.target != clickedEle && clickedEle) {
            console.log("RETURNING FALSE");
            return false;
        }

        if (!blurred) {
            $(".student-name").not(e.target).parent().addClass("blur");
            $("#delete_row").fadeIn();
            $(e.target).addClass("selectedRow");
            blurred = true;
            clickedEle = e.target;
        } else {
            $(".student-name").not(e.target).parent().removeClass("blur");
            $("#delete_row").hide();
            $(e.target).removeClass("selectedRow");
            blurred = false;
            clickedEle = null;
        }
    });
    
    
    for (let i = 0; i < headers.length; i++) {
        $(headers[i]).click((e) => {            
            let className = $(e.target).attr("class");

            if (e.target != columnEle && columnEle) {
                return false;
            }
    
            if (!columnBlurred) {
                $("td").not(`.${className}`).addClass("blur");
                $("th").not(`.${className}`).addClass("blur");
                if ($(e.target).attr("id") == "assignment_header"){
                    $("#delete_column").fadeIn();
                    $(e.target).addClass("selectedColumn");
                }
                columnBlurred = true;
                columnEle = e.target;
            } else {
                $("td").removeClass("blur");
                $("th").removeClass("blur");
                $("#delete_column").hide();
                $(e.target).removeClass("selectedColumn");
                columnBlurred = false;
                columnEle = null;
            }
        })
    }
});


function darken(row) {
    $(row).each(function() {
        let darken = 15; // darken color by 15 percent
        let rgb = $(this).css('background-color');
        rgb = rgb.replace("rgb(", "").replace(")", "").split(",");
        let red = rgb[0];
        let green = rgb[1];
        let blue = rgb[2];
                  
        // darken
        red = parseInt(red * (100 - darken) / 100);
        green = parseInt(green * (100 - darken) / 100);
        blue = parseInt(blue * (100 - darken) / 100);
          
        rgb = `rgb(${red}, ${green}, ${blue})`;
          
        $(this).css("background-color", rgb);
    });
    return this;
  }
  darken($("tr:nth-child(odd) td"));  // run the above plugin on all table cells


  $("#delete_row").click(() => {
    let index = $(".selectedRow").parent().attr("id");
    index = parseInt(index);
    for (let i = index; i <= size; i++) {
        delete studentData[i];
        studentData[i] = studentData[i+1];
    }

    delete studentData[size];
    
    localStorage.setItem("studentData", JSON.stringify(studentData));
    location.reload();
    
  });

  $("#delete_column").click(() => {
    let index = $(".selectedColumn").attr("class");
    index = parseInt(index);
    for (let i = 1; i <= size; i++) {
        for (let j = index; j <= assignmentSize; j++) {
            delete studentData[i].assignments[j];
            studentData[i].assignments[j] = studentData[i].assignments[j+1];
        }
        delete studentData[i].assignments[assignmentSize];
    }

    localStorage.setItem("studentData", JSON.stringify(studentData));
    location.reload();
  });

  $("#reset_data").click(() => {
      localStorage.clear();
      location.reload();
  });