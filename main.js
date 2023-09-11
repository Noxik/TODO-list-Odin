// DOM - buttons
const allTaskBtn = document.getElementById("all")
const addNewTaskBtn = document.getElementById("addTask")
const submitNewProjectBtn = document.getElementById("newNameSubmit")
const submitNewTaskBtn = document.getElementById("submit")
const editProjectNameBtn = document.getElementById("editProjectName")
const deleteProjectBtn  = document.getElementById("deleteProject")

// DOM - divs
const main = document.querySelector("#mainChangeContent")
const newTaskModal = document.getElementById("newTaskModal")
const newProjectNameInput = document.getElementById("newProjectName")
const selectProject = document.getElementById("project")
const asideProjectListing = document.querySelector("#projectsListing")
let projectNameHeading = document.getElementById("actualProject")
const mainContainer = document.querySelector(".container")

if (actualProject === "All Tasks") {
    editProjectNameBtn.style.display = "none";
    deleteProjectBtn.style.display = "none";
}

function closeModalOutside() {
        // add event which close Form after click outside it   
        document.onclick = function(e){
            if (!newTaskModal.contains(e.target)) {
               newTaskModal.style.display = 'none';   
            }
                      
            if (e.target.id === "addTask") {
                newTaskModal.style.display = "block"
                }
        
            // after click outside form background is visible and inputs clear - so it works like press X button
            if (newTaskModal.style.display == "none") {
                mainContainer.style.cssText = ""
                cleaningModalInputs()
                } 
            };
}

addNewTaskBtn.addEventListener("click", () => {
    /*blur background */
    mainContainer.style.cssText = "position: relative; z-index: -1; filter: blur(10px)"
    newTaskModal.style.display = "block";
    closeModalOutside();
    validationTask()
})

 //validation for checking if task exist in selected project
function validationTask() {
    let titleInput = document.getElementById("title")
    titleInput.addEventListener("focusout", function() {
        
        let _chosenProjectInModal = document.querySelector("select").value;
        let _filteredProjects = todoList.filter(function(e) {
            if (e.project === _chosenProjectInModal) {
                return true}})
    if (_filteredProjects.some((e) => e.title === titleInput.value)) {
        alert("task with the same title already exist in chosen project!");
        titleInput.style.cssText = "border: 1px solid #eb2b2b";
        titleInput.value = "change title!"
        submitNewTaskBtn.disabled = true;
    } else {
        titleInput.style.cssText = "border: 1px solid #111010";
        submitNewTaskBtn.disabled = false;
    }})
}


/* Form closing after button X click */
document.getElementById("formCloseBtn").addEventListener("click", () => {
    cleaningModalInputs();
    newTaskModal.style.display = "none"
    mainContainer.style.cssText = ""
})

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

submitNewTaskBtn.addEventListener("click", () => {
    mainContainer.style.cssText = "" 
    addNewTask();
    createAsideBtn();
    
    // validation if added task fit displayed project tasks in Main
    if (todoList[todoList.length-1].project === projectNameHeading.textContent) {
    addToMain(todoList[todoList.length-1]);}
    
    addEventsToAsideButtons();
    cleaningModalInputs();
    newTaskModal.style.display = "none";
    document.getElementById("title").style.cssText = "border: 1px solid #111010;"
    // update local storage
    localStorage.setItem("todos", JSON.stringify(todoList))
        
})

function cleaningModalInputs() {
    let modal = document.getElementById("newTaskModal")
    let inputs = modal.querySelectorAll("input")
    document.getElementById("desc").value = ""
    for (let input in inputs) {inputs[input].value = ""}

}

submitNewProjectBtn.addEventListener("click", () => {
    //validation to check if project exist
    if (!todoList.some((e) => e.project === newProjectNameInput.value)) {
    let option = document.createElement("option");
    option.value = newProjectNameInput.value
    option.textContent = newProjectNameInput.value
   // new option will be selected as default
    option.selected = true;
    selectProject.appendChild(option)
    } else {
        alert("Your TO DO LIST have project with the same name already!!")
        }
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
    document.querySelector("#mainChangeContent").textContent= ""
    projectNameHeading.textContent = _filteredTodos[0].project

        _filteredTodos.forEach((project) => addToMain(project));
        activateDelBtn()
                }
            )
        }
}

function addToMain(arg) { 
    let div = document.createElement("div");
    let p = document.createElement("p");
    let button = document.createElement("button");
    let img = document.createElement("img");

        for (let key in arg) {    
            if (key === "project") {
            p.textContent = arg[key]
            p.style.display = "none";
            div.appendChild(p)
        } else if (key !== "project" && key !== "done") {   
            let p = document.createElement("p");

            p.textContent = arg[key]
            div.appendChild(p)
        } else if (key === "done") {
    //    console.log(lastAddedTask[key])
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
    
            if (arg[key] === "yes") {
                input.checked = true
            } else {
                input.checked = false
            }
        div.appendChild(input)
        input.addEventListener("click", switchDone)}

        if (arg[key] === "low") {
           div.style.backgroundColor = "#a0cbf1"
        } else if (arg[key] === "mid") {
            div.style.backgroundColor = "#53aefd"
        } else if (arg[key] === "high") {
            div.style.backgroundColor = "#3598ef"
        }

        button.textContent = "edit";
        button.classList.add("editBtn");
        div.appendChild(button);

        img.setAttribute("src", "delete.svg");
        img.classList.add("delBtn");
        div.appendChild(img)
        }

        div.classList.add("taskDiv");
        visibleProjectBtn();

        return main.appendChild(div)
    }

allTaskBtn.addEventListener("click", () => {
    main.textContent= "";
    visibleProjectBtn();
    projectNameHeading.textContent = allTaskBtn.textContent;
    todoList.forEach((project) => addToMain(project));
    activateDelBtn()
})

function visibleProjectBtn() {
    if (actualProject.textContent === "All Tasks") {
        editProjectNameBtn.style.display = "none";
        deleteProjectBtn.style.display = "none";
    } else {
    editProjectNameBtn.style.display = "block";
    deleteProjectBtn.style.display = "block";
}
}

editProjectNameBtn.addEventListener("click", () => {
    let newProjectName = prompt("Project new name:");
    console.log(newProjectName);
    changeProjectName(newProjectName)
})

// change project name from main
function changeProjectName(newName) {
    todoList.forEach((e) => {
    let name = actualProject.textContent
    if (e.project === name) {
        e.project = newName;

        let asideBtn = document.querySelectorAll(".projectBtn")
        for (let key in asideBtn) {
            if (actualProject.textContent === asideBtn[key].textContent) {
                asideBtn[key].textContent = newName
            }
            }
    
        location.reload();
        }  
    });
    actualProject.textContent = newName;
    localStorage.setItem("todos", JSON.stringify(todoList))
}

deleteProjectBtn.addEventListener("click", () => {
    let confirmation = confirm("Are you sure?!");
    if (confirmation) {
        let name = actualProject.textContent;
        console.log(name)
        deleteProject(name)
    }
})

function deleteProject(projectName) {
    todoList.forEach(() => {
        let index = todoList.findIndex((e) => e.project === projectName);
        console.log(index)
        if (index !== -1) {
    todoList.splice(index, 1)}
    })

    localStorage.setItem("todos", JSON.stringify(todoList))
    location.reload();
}

const howManyProjectLeft = function(projectName) {
    let count = 0;
    for (e in todoList) {
        if (todoList[e].project === projectName) {
            count++}
    }
    return count
}

// function which help find correct project/task in todoList - important for Edit/Delete Tasks
const projectIndex = function(project, title) {
    const indexObject = todoList.findIndex(key => {
        // we try to find projects which has the same name as clicked button projectName
        if (key.project === project) {;
        // we found project in todoList so now we can delete title with same as clicked button taskName            
        return key.title === title} 
    }); 
    return indexObject
}

function activateDelBtn() {
    let all = document.querySelectorAll(".delBtn");
    all.forEach((e) => e.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
    let projectName = e.parentNode.firstChild.textContent;
    let taskName = e.parentNode.firstChild.nextSibling.textContent;
//    console.log(projectName, taskName);

let index = projectIndex(projectName, taskName)

//    console.log(indexObject)
//    console.log(todoList[index].project)

    if (howManyProjectLeft(todoList[index].project) === 1) {
        if(confirm("Are You sure? It will delete whole Project!!")) {
            deleteProject(todoList[index].project)
        }
    } else {
        // here we delete task from todoList
        if (index !== -1) {
            e.parentNode.remove()
        todoList.splice(index, 1);
        } else {console.log("ERROR")}
        }
    }}
    ))

    // ACTIVE SAVE AFTER TESTs
    //  localStorage.setItem("todos", JSON.stringify(todoList))

}


    /*
function fakeAsideProjectAddBtn() {
        todoList.push(new Task("test",1,1,1,1, "no"))
        let option = document.createElement("option");
        option.value = "test"
        option.textContent = "test"
        selectProject.appendChild(option)
        createAsideBtn();
        addEventsToAsideButtons()
        todoList.pop()
}
*/

// TO DO:
// DONE: NEXT ADD DISPLAY PROJECT TASK AFTER BUTTON click with filter!:)
// DONE: to add test project to options
// DONE: to add in submit new task check if project name is the same as clicked because without that it will show new task to many project which is actual in main section
// DONE: add dark mode switch function
// DONE: add button to add project in new task modal
// DONE: change description to textarea and update cleaning function
// DONE add button in task modal to delete project
// DONE: validation if project exist already
// DONE: validation if title in chosen project exist already
// DONE: add onclick modal close
// DONE: easy darkmode localstorage memory
// DONE: save//load todo from localstorage
// add button to edit or delete task
// add button for adding projects
// DONE: button to edit or delete projects
// make chunks with webpack
// import date functions
// add validation in modal = no empty spaces!

//Darkmode switch
document.getElementById("darkmode").addEventListener("click", darkMode);

function darkMode() {
    if (document.getElementById("darkmode").checked === true) {    
        //background + font
        document.querySelector("body").style.color = "#e7e7e7" 
        document.querySelector("header").style.backgroundColor = "#000000"
        document.querySelector("aside").style.backgroundColor = "#212121"
        document.querySelector("main").style.backgroundColor = "#757575"
        document.querySelector("#newTaskModal").style.backgroundColor = "#4a6364"
        
      localStorage.setItem("dark", document.getElementById("darkmode").checked)
      
  } else {
      //RETURN TO DEFAULT
        //background + font
        document.querySelector("body").style.color = "" 
        document.querySelector("header").style.backgroundColor = "#10ddc2"
        document.querySelector("aside").style.backgroundColor = "#15b7b9"
        document.querySelector("main").style.backgroundColor = "#f5f5f5"
        document.querySelector("#newTaskModal").style.backgroundColor = "#0dd9e5"   
       
        localStorage.setItem("dark", document.getElementById("darkmode").checked)
        
      }
}

function addOptionToSelect(xxx) {
    //    console.log(xxx)
    //    console.log(todoList)
    //    if (todoList.some(e => e.project === xxx)) {console.log("is already")} else {
        let option = document.createElement("option");
        option.value = xxx
        option.textContent = xxx
       // new option will be selected as default
        option.selected = true;
        selectProject.appendChild(option)}
    // }


// TEST Projects
function createTestProjects(){
    const x = (function testing() {
            todoList.push(new Task("Project test 1","x1","b",1,"low","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
            addOptionToSelect(todoList[todoList.length-1].project)
        })()

    const xx= (function testing() {
            todoList.push(new Task("Project test 1","x2","e",2,"mid","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
        })()
            
    const xxx= (function testing() {
            todoList.push(new Task("Project test 1","x3","g",3,"mid","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
            })()

    const y = (function testing() {
            todoList.push(new Task("Project test 2","y1","b",1,"mid","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons();
            addOptionToSelect(todoList[todoList.length-1].project)
            })()
                
    const yy = (function testing() {
            todoList.push(new Task("Project test 2","y2","d",2,"high","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()        
            })()
}

    
// FROM LOCAL STORAGE
if (localStorage.dark) {
    if (localStorage.dark === "true") {
       document.getElementById("darkmode").checked = true;
       darkMode()}        
    } else {
        localStorage.setItem("dark", document.getElementById("darkmode").checked)
}        

if (!localStorage.todos) {
    createTestProjects()
} else {
    todoList = JSON.parse(localStorage.todos);
    createAsideBtn();
    addEventsToAsideButtons();

    let projekty = document.querySelectorAll(".projectBtn")
    
    projekty.forEach((e) => {
        let option = document.createElement("option");
        option.value = e.textContent;
        option.textContent = e.textContent;
        selectProject.appendChild(option)
    })

    projectNameHeading.textContent = allTaskBtn.textContent
    todoList.forEach((project) => addToMain(project));
   
    activateDelBtn()
}


// localStorage.setItem("todos", JSON.stringify(todoList))

/* STORAGE TEST */
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  if (storageAvailable("localStorage")) {
  //  console.log("tak")
  } else {
  //  console.log("nie")
  }