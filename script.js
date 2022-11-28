const exerciseName = document.getElementById("exerciseName"); //inputName
const exerciseDescription = document.getElementById("exerciseDescription");
const addNewExercise = document.getElementById("addBtn");
const activeList = document.querySelector(".activeTodo");
const finishedList = document.querySelector(".finishedTodo");
const szablonExercise = document.querySelector(".activeList");

const activeExercisesArray = [];
const finishedExercisesArray = [];
function createNewExercise() {
  if (
    exerciseName.value.trim("") !== "" &&
    exerciseDescription.value.trim("") !== ""
  ) {
    activeExercisesArray.push({
      title: exerciseName.value,
      description: exerciseDescription.value,
      status: "active",
    });
    resetInputValue();
    renderList();
  }
  console.log(finishedExercisesArray);
}
function resetInputValue() {
  exerciseName.value = "";
  exerciseDescription.value = "";
}
function renderList() {
  activeList.innerHTML = "";
  activeExercisesArray.forEach((el) => {
    const newEl = document.importNode(szablonExercise, true);
    newEl.querySelector(".titleLi").textContent = el.title;
    newEl.querySelector(".descriptionLi").textContent = el.description;
    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Finish";
    finishBtn.classList.add("finishBtn");
    newEl.appendChild(finishBtn);
    activeList.appendChild(newEl);
    finishBtn.addEventListener("click", () => {
      activeList.removeChild(newEl);
      el.status = "noactive";
      finishedExercisesArray.push(el);
      activeExercisesArray.shift(el);
      renderList();
    });
  });
  finishedList.innerHTML = "";
  finishedExercisesArray.forEach((el) => {
    const newEl = document.importNode(szablonExercise, true);
    newEl.querySelector(".titleLi").textContent = el.title;
    newEl.querySelector(".descriptionLi").textContent = el.description;
    const returnBtn = document.createElement("button");
    returnBtn.textContent = "Return to active";
    returnBtn.classList.add("moveBtn");
    newEl.appendChild(returnBtn);
    finishedList.appendChild(newEl);
    returnBtn.addEventListener("click", () => {
      finishedList.removeChild(newEl);
      el.status = "active";
      activeExercisesArray.push(el);
      finishedExercisesArray.shift(el);
      renderList();
    });
  });
}
addNewExercise.addEventListener("click", createNewExercise);
