// DOM:
// buttons
const allTaskBtn = document.getElementById("all")
const addProjectBtn = document.getElementById("addPro")
const addNewProject = document.getElementById("newNameSubmit")
const addNewTaskBtn = document.getElementById("submit")

// divs
const main = document.querySelector("main")
const newProjectModal = document.getElementById("newProjectModal")
const newProjectNameInput = document.getElementById("newProjectName")
const selectProject = document.getElementById("project")
const asideProjectListing = document.querySelector("#projectsListing")

let todoList = []

class Task {
    constructor(project, title, description, dueDate, priority, done) {
        this.project = project;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = done}
    }

function addNewTask() {
let a = document.getElementById("project").value  
let b = document.getElementById("title").value
let c = document.getElementById("desc").value
let d = document.getElementById("date").value
let e = document.getElementById("prio").value
    todoList.push(new Task(a,b,c,d,e, "no"))
}

function switchDone() {
//    console.log(this.parentNode.childNodes[0].textContent, this.parentNode.childNodes[1].textContent);    
    let projectFromNode = this.parentNode.childNodes[0].textContent;
    let taskTitleFromNode = this.parentNode.childNodes[1].textContent;
    const indexInToDoList = todoList.findIndex(key => {
    // here we try to find project with the same name as clicked checkbox parentNode
    if (key.project === projectFromNode) {;
    // when we find project in our "all" todoList we check if the title of that project is correct so we can return true/false to above findIndex method;
    // if title of project is false we keep trying to find correct title :)
    return key.title === taskTitleFromNode;} 
    }); 
       
    if (todoList[indexInToDoList].done === "yes") {
        todoList[indexInToDoList].done = "no"
    } else {
        todoList[indexInToDoList].done = "yes"
    }
}

addNewTaskBtn.addEventListener("click", () => {
    addNewTask();
    createAsideBtn();
    addToMain(todoList[todoList.length-1]);
    addEventsToAsideButtons()})

addProjectBtn.addEventListener("click", () => {
    newProjectModal.style.display = "block"
})

addNewProject.addEventListener("click", () => {
    let option = document.createElement("option");
    option.value = newProjectNameInput.value
    option.textContent = newProjectNameInput.value
   // new option will be selected as default
    option.selected = true;
    selectProject.appendChild(option)
    //cleaning inputs
    newProjectNameInput.value = ""
    newProjectModal.style.display = "none"
   
})

function addNewHtmlTag(tag, text) {
    let element = document.createElement(tag);
    element.textContent = text;
    element.classList.add("projectBtn")  // addClass

    return asideProjectListing.appendChild(element)
        }

// add to aside buttons from object project names :)
function createAsideBtn() {
    // clean project box before add new projects
    asideProjectListing.textContent = ""
    let _projectNames = []
    for (let key in todoList) {
    // check if already project exist in projectNames arr
    if (!_projectNames.some(e => e === todoList[key].project)) {
    // add project name to array only if project name doesnt exist there
    _projectNames.push(todoList[key].project)}}
    
    // if not button will appear
    _projectNames.forEach((name) => {    
    addNewHtmlTag("button", name);
    })
 }

 //adding Event listener to aside buttons and it return button text content which is equal to project name => use in filtered to show only choose project :)
function addEventsToAsideButtons() {
    let _proBtn = document.querySelectorAll(".projectBtn")
    for (let i=0; i<_proBtn.length; i++) {
        _proBtn[i].addEventListener("click", function() {
        //   console.log(proBtn[i]);
            let _filteredTodos = todoList.filter(function(e) {
                if (e.project === _proBtn[i].textContent) 
                {return true}
                    })
   //   console.log(test[0].project); 
   document.querySelector("main").textContent= ""
       let main = document.querySelector("main")
       let p = document.createElement("p")
       p.textContent = _filteredTodos[0].project
       main.appendChild(p)

        _filteredTodos.forEach((project) => addToMain(project))
                }
            )
        }
}

function addToMain(xxx) { 
    let div = document.createElement("div");
    let p = document.createElement("p");
        for (let key in xxx) {    
            if (key === "project") {
            p.textContent = xxx[key]
            p.style.display = "none";
            div.appendChild(p)
        } else if (key !== "project" && key !== "done") {   
            let p = document.createElement("p");
    //   console.log(key, [key], [key].toString())
            p.textContent = xxx[key]
            div.appendChild(p)
        } else if (key === "done") {
    //    console.log(lastAddedTask[key])
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
    
            if (xxx[key] === "yes") {
                input.checked = true
            } else {
                input.checked = false
            }
        div.appendChild(input)
        input.addEventListener("click", switchDone)}
        }
    return main.appendChild(div)
    }

//function which add choosen project after click button to main section - only task in project with the same name as button
function addToMainBtnProject(projectButton) { 
    projectButton.forEach((project) => {
        let div = document.createElement("div");
        let p = document.createElement("p")
            for (let key in project) {
                 if (key === "project") {
                    p.textContent = project[key]
                    p.style.display = "none";
                    div.appendChild(p)
                } else if 
                 (key !== "project" && key !== "done") {
        //    console.log(project[key]);
            let p = document.createElement("p");
            p.textContent = project[key]
            div.appendChild(p)
            } else if (key === "done") {
                let input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if (project[key] === "yes") {
                    input.checked = true
                } else {
                    input.checked = false
                }
             
                div.appendChild(input)
                input.addEventListener("click", switchDone)
                
            }}
    return main.appendChild(div)})
}

allTaskBtn.addEventListener("click", () => {
    main.textContent= ""
    let p = document.createElement("p")
    p.textContent = allTaskBtn.textContent
    main.appendChild(p)
    addToMainBtnProject(todoList)}
    )

// DONE: NEXT ADD DISPLAY PROJECT TASK AFTER BUTTON click with filter!:)
// NEED to add test project to options
// Need to add in submit new task check if project name is the same as clicked because without that it will show new task to many project which is actual in main section
// CONSIDER TO ADD PROJECT BUTTON AFTER ADDING NEW PROJECT TO NAVBAR

// TEST Projects
const x = (function testing() {
        todoList.push(new Task("x","x1","b",1,"low","no"))
        createAsideBtn();
        addToMain(todoList[todoList.length-1]);
        addEventsToAsideButtons()
        addOptionToSelect(todoList[todoList.length-1].project)
    })()

function addOptionToSelect(xxx) {
    console.log(xxx)
    console.log(todoList)
//    if (todoList.some(e => e.project === xxx)) {console.log("is already")} else {
    let option = document.createElement("option");
    option.value = xxx
    option.textContent = xxx
   // new option will be selected as default
    option.selected = true;
    selectProject.appendChild(option)}
// }

const xx= (function testing() {
        todoList.push(new Task("x","x2","e",2,"mid","no"))
        createAsideBtn();
        addToMain(todoList[todoList.length-1]);
        addEventsToAsideButtons()
    })()
        
const xxx= (function testing() {
        todoList.push(new Task("x","x3","g",3,"mid","no"))
        createAsideBtn();
        addToMain(todoList[todoList.length-1]);
        addEventsToAsideButtons()
        })()

const y = (function testing() {
        todoList.push(new Task("y","y1","b",1,"mid","no"))
        createAsideBtn();
        addToMain(todoList[todoList.length-1]);
        addEventsToAsideButtons();
        addOptionToSelect(todoList[todoList.length-1].project)
        })()
            
const yy = (function testing() {
        todoList.push(new Task("y","y2","d",2,"high","no"))
        createAsideBtn();
        addToMain(todoList[todoList.length-1]);
        addEventsToAsideButtons()        
        })()
