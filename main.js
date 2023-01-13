const studentNameInput = document.querySelector("#student-name");
const rollNumberInput = document.querySelector("#roll-num");
const form = document.querySelector(".form");
const subNameInput = document.querySelector(".sub-name");
const obtMarksInput = document.querySelector(".obt-mark");
const subjectMark = document.querySelector(".subject-mark");
const displayName = document.querySelector(".dis-name");
const displayRollNumber = document.querySelector(".dis-rollno");
const collection = document.querySelector(".collection");
const calculate = document.querySelector("#calc");
const clearResult = document.querySelector("#clear");
const resultTotalMarks = document.querySelector(".result-total-marks");
const resultObtMarks = document.querySelector(".result-total-obt");
const resultTotalPercent = document.querySelector(".result-total-percent");
const resultStatus = document.querySelector(".result-status");
const table = document.querySelector(".table");
const result = [];

// load all events and functions
form.addEventListener("submit", addTask);
// calculate result
calculate.addEventListener("click", calculateResult);
// clear result
clearResult.addEventListener("click", clearResultTable);

// Add task on submit form
function addTask(e) {
  if (
    studentNameInput === "" &&
    rollNumberInput === "" &&
    subNameInput === "" &&
    obtMarksInput === "" &&
    subjectMark === ""
  ) {
    alert("Please enter all containing fields");
  } else {
    // display name and roll number in result
    displayName.innerHTML = studentNameInput.value;
    displayRollNumber.innerHTML = rollNumberInput.value;

    // create tr HTML element
    const tr = document.createElement("tr");
    tr.className = "body-row";
    // create td HTML elements
    const subjectName = document.createElement("td");
    subjectName.className = "subject-name";
    subjectName.innerHTML = subNameInput.value;

    const disSubjTotalMark = document.createElement("td");
    disSubjTotalMark.className = "d-t-marks";
    disSubjTotalMark.innerHTML = subjectMark.value;

    const disObtMark = document.createElement("td");
    disObtMark.className = "d-obt-marks";
    disObtMark.innerHTML = obtMarksInput.value;

    const disPercent = document.createElement("td");
    disPercent.className = "d-percent";
    // calculate percentage
    let percent = (obtMarksInput.value / subjectMark.value) * 100;
    let fixPercent = percent.toFixed();
    disPercent.innerHTML = `${fixPercent}%`;

    const disStatus = document.createElement("td");
    disStatus.className = "d-status";
    if (fixPercent <= 100 && fixPercent >= 80) {
      disStatus.innerHTML = "Pass";
    } else if (fixPercent <= 79 && fixPercent >= 60) {
      disStatus.innerHTML = "Pass";
    } else if (fixPercent <= 59 && fixPercent >= 40) {
      disStatus.innerHTML = "Pass";
    } else if (fixPercent <= 39 && fixPercent >= 33) {
      disStatus.innerHTML = "Pass'*'";
    } else {
      disStatus.innerHTML = "Fail";
    }

    //   append all td elements to the tr (body-row)
    tr.appendChild(subjectName);
    tr.appendChild(disSubjTotalMark);
    tr.appendChild(disObtMark);
    tr.appendChild(disPercent);
    tr.appendChild(disStatus);
    const data = {
      subjectName: subjectName.innerHTML,
      disSubjTotalMark: +disSubjTotalMark.innerHTML,
      disObtMark: +disObtMark.innerHTML,
      disPercent: disPercent.innerHTML,
      disStatus: disStatus.innerHTML,
    };
    result.push(data);
    // console.log(result);

    // tr append to its parent element (table body)
    collection.appendChild(tr);

    // clear the field after submitting the task
    subNameInput.value = "";
    subjectMark.value = "";
    obtMarksInput.value = "";

    // dispaly table on click
    table.classList.add("display");
    // disable input field
    studentNameInput.disabled = true;
    rollNumberInput.disabled = true;


    e.preventDefault();
  }
}

// calculate result
function calculateResult() {
  if (result.length > 0) {
    let totalGenMarks = result.reduce(function (prev, cur) {
      return prev + cur.disSubjTotalMark;
    }, 0);
    resultTotalMarks.innerHTML = totalGenMarks;

    // total obtain marks
    let totalGenObtMarks = result.reduce(function (prev, cur) {
      return prev + cur.disObtMark;
    }, 0);
    resultObtMarks.innerHTML = totalGenObtMarks;

    // total percentage
    let percent = (totalGenObtMarks / totalGenMarks) * 100;
    let fixPercent = percent.toFixed();
    resultTotalPercent.innerHTML = `${fixPercent}%`;

    // total grade status
    if (fixPercent <= 100 && fixPercent >= 80) {
        resultStatus.innerHTML = "Pass";
      } else if (fixPercent <= 79 && fixPercent >= 60) {
        resultStatus.innerHTML = "Pass";
      } else if (fixPercent <= 59 && fixPercent >= 40) {
        resultStatus.innerHTML = "Pass";
      } else if (fixPercent <= 39 && fixPercent >= 33) {
        resultStatus.innerHTML = "Pass'*'";
      } else {
        resultStatus.innerHTML = "Fail";
      }

  } else {
    alert("Please enter the field");
  }

  document.querySelector(".result").classList.add("active");
  //   table.classList.add("activated");
}

// clear result card

function clearResultTable() {
  collection.innerHTML = "";
  document.querySelector(".result").classList.remove("active");
  table.classList.remove("display");
  result.length = 0;
  studentNameInput.value = "";
  rollNumberInput.value = "";
  studentNameInput.disabled = false;
  rollNumberInput.disabled = false;
  resultTotalMarks.innerHTML = "";
  resultObtMarks.innerHTML = "";
  resultTotalPercent.innerHTML = "";
  resultStatus.innerHTML = "";
}


let fieldModified = false;

studentNameInput.addEventListener("change", function() {
  if (fieldModified) {
    this.disabled = true;
  } else {
    fieldModified = true;
  }
});

rollNumberInput.addEventListener("change", function() {
    if (fieldModified) {
      this.disabled = true;
    } else {
      fieldModified = true;
    }
  });
