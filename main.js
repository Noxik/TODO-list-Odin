let todoList = []

class Task {
    constructor(project, title, description, dueDate, priority) {
        this.project = project;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority}
}

function addNewTask() {
let a = document.getElementById("project").value  
let b = document.getElementById("title").value
let c = document.getElementById("desc").value
let d = document.getElementById("date").value
let e = document.getElementById("prio").value
    todoList.push(new Task(a,b,c,d,e))
}


// need to apply todoList here to work correctly
function addToMain(taskList) {
    let div = document.createElement("div");

    for (let key in  taskList[taskList.length-1]) {    
    // without project name
    if (key !== "project") {   
        let span = document.createElement("span");
    //    console.log(key, [key], [key].toString())
    span.textContent = taskList[taskList.length-1][key]
    div.appendChild(span)
    }
    }
   return document.querySelector("main").appendChild(div)
}

document.getElementById("submit").addEventListener("click", () => {
    addNewTask();
    abcd();
    addToMain(todoList);
    addEventsToAsideButtons()})

document.querySelector("button").addEventListener("click", () => {
    document.getElementById("newProjectModal").style.display = "block"
})

document.getElementById("newNameSubmit").addEventListener("click", () => {
    let option = document.createElement("option");
    option.value = document.getElementById("newProjectName").value
    option.textContent = document.getElementById("newProjectName").value
   // new option will be selected as default
    option.selected = true;
    document.getElementById("project").appendChild(option)
    //cleaning inputs
    document.getElementById("newProjectName").value = ""
    document.getElementById("newProjectModal").style.display = "none"
   
})

function newTextTag(tag, text) {
    let element = document.createElement(tag);
    element.textContent = text;

    element.classList.add("projectBtn")  // addClass
    element.setAttribute("id", `asiBtn_${text}`);        // addId

    return document.querySelector("#projectsListing").appendChild(element)
        }

// add to aside buttons from object project names :)
function abcd() {
            // clean project box before add new projects
            document.querySelector("#projectsListing").textContent = ""
    let projectNames = []
    for (let key in todoList) {
    // check if already project exist in projectNames arr
    if (!projectNames.some(e => e === todoList[key].project)) {
    // add project name to array only if project name doesnt exist there
    projectNames.push(todoList[key].project)}}
    
    // if not button will appear
    projectNames.forEach((name) => {    
    newTextTag("button", name);
    })
 }

 //adding Event listener to aside buttons and it return button text content which is equal to project name => use in filtered to show only choose project :)
function addEventsToAsideButtons() {
    let proBtn = document.querySelectorAll(".projectBtn")
    for (let i=0; i<proBtn.length; i++) {
        proBtn[i].addEventListener("click", function(e) {console.log(proBtn[i].textContent)})}
}

// create filtered arr if project name is equal to sth
const arx = todoList.filter(function(key) {if (key.project === projects[1]) {return true}})


// NEXT ADD DISPLAY PROJECT TASK AFTER BUTTON KLIK with filter!:)
// CONSIDER TO ADD PROJECT BUTTON AFTER ADDING NEW PROJECT TO NAVBAR

/* FIRST function, but i added argument to it because then i can use it to show to do for filtered projects
function addToMain() {
    let div = document.createElement("div");

    for (let key in  todoList[todoList.length-1]) {    
    // without project name
    if (key !== "project") {   
        let span = document.createElement("span");
        console.log(key, [key], [key].toString())
    span.textContent = todoList[todoList.length-1][key]
    div.appendChild(span)
    }
    }
   return document.querySelector("main").appendChild(div)
}
*/
