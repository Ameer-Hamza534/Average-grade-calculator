const studentName = document.querySelector("#student-name");
const rollNumber = document.querySelector("#roll-num");
const form = document.querySelector(".form");
const subNameInput = document.querySelector(".sub-name");
const obtMarksInput = document.querySelector(".obt-mark");
const listCollection = document.querySelector(".collection");
const calculate = document.querySelector("#calc");
const totalContainer = document.querySelector(".total-container");
let totalMarks = document.querySelector(".total_marks");
let percInput = document.querySelector("#per_input");
const grade = document.querySelector(".total_grade");
const pass = document.querySelector(".pass");
const percentage = document.querySelector(".total_percentage");
const resltStudName = document.querySelector(".reslt_stud_name");
const resltRollNum = document.querySelector(".reslt_stud_roll");
const clear = document.querySelector("#clear");

// marks value array
let marksArr = [];

// form submit function
form.addEventListener("submit", addTask);
// remove item from the listCollection
listCollection.addEventListener("click", removeTask);
// calculate the obtains mark
calculate.addEventListener("click", taskCalculate);
// clear the list collection for second student
clear.addEventListener("click", clearTask);

// Add task to the list
function addTask(e) {
  if (
    subNameInput.value === "" ||
    obtMarksInput.value === "" ||
    studentName.value === "" ||
    rollNumber.value === "" ||
    percInput.value === ""
  ) {
    alert("Please enter the field");
  } else {
    // create li Element
    const li = document.createElement("li");
    li.className = "list-group-item";

    // creating ul element inside li
    const ul = document.createElement("ul");
    ul.className = "group d-flex justify-content-around";

    li.appendChild(ul);

    // creating a li element inside nested ul
    const subjectLi = document.createElement("li");
    const markLi = document.createElement("li");

    subjectLi.className = "group-item sub";
    subjectLi.appendChild(document.createTextNode(subNameInput.value));

    markLi.className = "group-item marks";
    markLi.appendChild(document.createTextNode(obtMarksInput.value));
    ul.appendChild(subjectLi);
    ul.appendChild(markLi);

    marksArr.push({ marks: obtMarksInput.value });

    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = `<i class="fa-solid fa-xmark icon"></i>`;

    li.appendChild(link);

    listCollection.appendChild(li);

    // clear the field after submitting the task
    subNameInput.value = "";
    obtMarksInput.value = "";
    e.preventDefault();
  }
}

// remove task list from the container

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item"))
    e.target.parentElement.parentElement.remove();
}

// Calculate the values

function taskCalculate(e) {
  let marks = 0;
  marksArr.forEach((result) => {
    marks += parseFloat(result.marks);
  });
  totalMarks.innerHTML = marks;
  let perc = (marks / percInput.value) * 100;
  let fixPercent = perc.toFixed();
  percentage.innerHTML = `${fixPercent}%`;

  // dispay student name in result
  resltStudName.innerHTML = studentName.value;
  // dispay roll number in result
  resltRollNum.innerHTML = rollNumber.value;

  // Grade calculate
  if (fixPercent <= 100 && fixPercent >= 80) {
    grade.innerHTML = "A+";
    pass.innerHTML = "Pass";
  } else if (fixPercent <= 79 && fixPercent >= 60) {
    grade.innerHTML = "B";
    pass.innerHTML = "Pass";
  } else if (fixPercent <= 59 && fixPercent >= 40) {
    grade.innerHTML = "C";
    pass.innerHTML = "Pass";
  } else if (fixPercent <= 39 && fixPercent >= 33) {
    grade.innerHTML = "D";
    pass.innerHTML = "Pass";
  } else {
    grade.innerHTML = "F";
    pass.innerHTML = "Fail";
  }

  totalContainer.classList.add("active");

  e.preventDefault();
  studentName.value = "";
  rollNumber.value = "";
  percInput.value = "";
}

// clear tasks for second student
function clearTask() {
  // listCollection.innerHTML = "";
  while (listCollection.firstChild)
    listCollection.removeChild(listCollection.firstChild);
  totalContainer.classList.remove("active");
  resltStudName.innerHTML = "";
  resltRollNum.innerHTML = "";
  totalMarks.innerHTML = "";
  percentage.innerHTML = "";
  grade.innerHTML = "";
  pass.innerHTML = "";
  marksArr.length = 0;
}
