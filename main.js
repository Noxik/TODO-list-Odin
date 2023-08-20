let todoList = []
// let projects = []

// nie potrzebuje pomocniczego project bo nazwy projektow moge wyciagnac z obiektu poprzez
for (let key in todoList) {console.log(todoList[key].project)}



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

document.getElementById("submit").addEventListener("click", addNewTask)

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

    // add new project to projects list
//    projects.push(document.getElementById("newProjectName").value)

    document.getElementById("newProjectName").value = ""
    document.getElementById("newProjectModal").style.display = "none"
   
})

// create filtered arr if project name is equal to sth
const arx = todoList.filter(function(key) {if (key.project === projects[1]) {return true}})


function newTextTag(tag, text) {
    let element = document.createElement(tag);
    element.textContent = text;
    return document.querySelector("aside").appendChild(element)
        }

// add to aside buttons from object project names :)
function abcd() {
    let test = []
    for (let key in todoList) {
    // check if already project exist in aside
    if (!test.some(e => e === todoList[key].project)) {
    test.push(todoList[key].project)}}
    
    // if not button will appear
    test.forEach((xxx) => {    
    newTextTag("button", xxx)
    })
 }


// NEXT ADD DISPLAY PROJECT TASK AFTER BUTTON KLIK with filter!:)
 
/* show projects from []
function show() {
projects.forEach((project) => newTextTag("button", project));
} */

/* same as above but without projects arr
function showTest() {
    let test = []
for (let key in todoList) {
    test.push(todoList[key].project)}
    test.forEach((xxx) => {    
    newTextTag("button", xxx)}
                );
}
*/