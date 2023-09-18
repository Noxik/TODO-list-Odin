// DOM - buttons
const allTaskBtn = document.getElementById("all")
const addNewTaskBtn = document.getElementById("addTask")
const submitNewProjectBtn = document.getElementById("newNameSubmit")
const submitNewTaskBtn = document.getElementById("submit")
const submitEditTaskBtn = document.getElementById("submitC")
const editProjectNameBtn = document.getElementById("editProjectName")
const deleteProjectBtn  = document.getElementById("deleteProject");
const sortBtn  = document.getElementById("sortSubmit");

// DOM - divs
const main = document.querySelector("#mainChangeContent")
const newTaskModal = document.getElementById("newTaskModal")
const editTaskModal = document.getElementById("editTaskModal")
const newProjectNameInput = document.getElementById("newProjectName")
const selectProject = document.getElementById("project")
const selectProjectC = document.getElementById("projectC");
const asideProjectListing = document.querySelector("#projectsListing")
let actualProject = document.getElementById("actualProject")
const mainContainer = document.querySelector(".container");

sortBtn.addEventListener("click", () => {sorting(document.getElementById("sort").value)})

function sorting(sortby) {
    switch(sortby) {
        case "pnameAZ":
            todoList  = todoList.sort(function(a,b) {
                if (a.project > b.project) {return 1; } else {return -1}})
            break;
        case "pnameZA":
            todoList  = todoList.sort(function(a,b) {
                if (a.project < b.project) {return 1; } else {return -1}})
            break;
        case "tnameAZ":
            todoList  = todoList.sort(function(a,b) {
                if (a.title > b.title) {return 1; } else {return -1}})
            break;
        case "tnameZA":
            todoList  = todoList.sort(function(a,b) {
                if (a.title > b.title) {return 1; } else {return -1}})
            break;
        case "cdate":
            todoList.forEach((e) => e.dueDate = Date.parse(e.dueDate))
            todoList  = todoList.sort(function(a,b) {
                if (a.dueDate > b.dueDate) {return 1; } else {return -1}})
            todoList.forEach((e) => { 
                let dataString = new Date(e.dueDate).toDateString();
                let data = new Date(dataString)
              let stringDate = data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate()
                    e.dueDate = stringDate
            })
            break;
        case "fdate":
            todoList.forEach((e) => e.dueDate = Date.parse(e.dueDate))
            todoList  = todoList.sort(function(a,b) {
                if (a.dueDate < b.dueDate) {return 1; } else {return -1}})
            todoList.forEach((e) => { 
                let dataString = new Date(e.dueDate).toDateString();
                let data = new Date(dataString)
              let stringDate = data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate()
                    e.dueDate = stringDate
            })
            break;
        case "hprio":
            todoList.forEach((e) => {
                if (e.priority === "low") {
                    e.priority = 3;
                } else if (e.priority === "mid") {
                    e.priority = 2;
                } else if (e.priority === "high") {
                    e.priority = 1
                }})

            todoList  = todoList.sort(function(a,b) {
                if (a.priority > b.priority) {return 1; } else {return -1}})

            todoList.forEach((e) => {
                if (e.priority === 3) {
                    e.priority = "low";
                } else if (e.priority === 2) {
                    e.priority = "mid";
                } else if (e.priority === 1) {
                    e.priority = "high"
                }})
            break;
        case "lprio":
            todoList.forEach((e) => {
                if (e.priority === "low") {
                    e.priority = 3;
                } else if (e.priority === "mid") {
                    e.priority = 2;
                } else if (e.priority === "high") {
                    e.priority = 1
                }})

            todoList  = todoList.sort(function(a,b) {
                if (a.priority < b.priority) {return 1; } else {return -1}})

            todoList.forEach((e) => {
                if (e.priority === 3) {
                    e.priority = "low";
                } else if (e.priority === 2) {
                    e.priority = "mid";
                } else if (e.priority === 1) {
                    e.priority = "high"
                }})
            break;
    }

    // addtomain
    main.textContent= "";
    visibleProjectBtn();
    actualProject.textContent = allTaskBtn.textContent;
    todoList.forEach((project) => addToMain(project));
    activateDelBtn();
    activateEditBtn()
}


if (actualProject === "All Tasks") {
    editProjectNameBtn.style.display = "none";
    deleteProjectBtn.style.display = "none";
}

function closeModalOutside(modal, btnText) {
        // add event which close Form after click outside it   
        document.onclick = function(e){
            if (!modal.contains(e.target)) {
               modal.style.display = 'none';   
            }
                      
            if (e.target.textContent === btnText) {
                modal.style.display = "block"
                }
        
            // after click outside form background is visible and inputs clear - so it works like press X button
            if (modal.style.display == "none") {
                mainContainer.style.cssText = ""
                cleaningModalInputs()
                } 
            };
}

addNewTaskBtn.addEventListener("click", () => {
    //set default Select value equal aside project button name
    if (actualProject.textContent !== "All Tasks") {
    document.getElementById("project").value = actualProject.textContent}

    /*blur background */
    mainContainer.style.cssText = "position: relative; z-index: -1; filter: blur(10px)"
    newTaskModal.style.display = "block";
    closeModalOutside(newTaskModal, "Add New Task");
    validationTask("title", "project", submitNewTaskBtn)
})

 //validation for checking if task exist in selected project
 // add argument to make function flexible for new modal and edit modal
function validationTask(title, select, submitBtn) {
    let titleInput = document.getElementById(title)
    titleInput.addEventListener("focusout", function() {
        
        let _chosenProjectInModal = document.getElementById(select).value;
        let _filteredProjects = todoList.filter(function(e) {
            if (e.project === _chosenProjectInModal) {
                return true}})
    if (_filteredProjects.some((e) => e.title === titleInput.value)) {
        alert("task with the same title already exist in chosen project!");
        titleInput.style.cssText = "border: 1px solid #eb2b2b";
        console.log("test")
        titleInput.value = "change title!"
        submitBtn.disabled = true;
    } else {
        titleInput.style.cssText = "border: 1px solid #111010";
        submitBtn.disabled = false;
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
        todoList[indexInToDoList].done = "no";

        defineDivColor(this.parentNode.childNodes[4].textContent, this.parentNode)
        this.parentNode.childNodes[1].style.cssText = "text-decoration: none"
    } else {
        todoList[indexInToDoList].done = "yes";
        this.parentNode.style.backgroundColor = "#5ba76f";
        this.parentNode.childNodes[1].style.cssText = "text-decoration: line-through"
    }
}

submitNewTaskBtn.addEventListener("click", () => {
    
    // validation if all inputs are fill
    if (document.getElementById("project").value  !== "" &&
    document.getElementById("title").value !== "" &&
    document.getElementById("desc").value !== "" && 
    document.getElementById("date").value !== "") {
    
    mainContainer.style.cssText = "" 
    addNewTask();
    createAsideBtn();
    
    // validation if added task fit displayed project tasks in Main
    if (todoList[todoList.length-1].project === actualProject.textContent) {
    addToMain(todoList[todoList.length-1]);}
    
    addEventsToAsideButtons();
    cleaningModalInputs();
    newTaskModal.style.display = "none";
    document.getElementById("title").style.cssText = "border: 1px solid #111010;"

    activateDelBtn();
    activateEditBtn()
//    console.log(todoList[todoList.length-1].project, selectProject)
    addOptionToSelect(todoList[todoList.length-1].project, selectProjectC)
    // update local storage
    localStorage.setItem("todos", JSON.stringify(todoList))} 
    else {
        changeInputBorderColor("#d91010")
        alert("You must fill all inputs!");
        
    }
        
})

function changeInputBorderColor(color) {
    if (document.getElementById("project").value === "") {
        document.getElementById("project").style.cssText = `border: 2px solid ${color};`} else {
        document.getElementById("project").style.cssText = "border: 1px solid #111010;" 
        }

    if (document.getElementById("title").value === "") {
        document.getElementById("title").style.cssText = `border: 2px solid ${color};`} else {
        document.getElementById("title").style.cssText = "border: 1px solid #111010;" 
        }
    
    if (document.getElementById("desc").value === "") {
        document.getElementById("desc").style.cssText = `border: 2px solid ${color};`} else {
        document.getElementById("desc").style.cssText = "border: 1px solid #111010;" 
        }

    if (document.getElementById("date").value === "") {
        document.getElementById("date").style.cssText = `border: 2px solid ${color};`} else {
        document.getElementById("date").style.cssText = "border: 1px solid #111010;" 
        }
}


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
    //  console.log(_filteredTodos.length); 
    document.querySelector("#mainChangeContent").textContent= ""
    
    if (_filteredTodos.length != 0) {
        actualProject.textContent = _filteredTodos[0].project}
        else {return alert("There is no task in this project. This project will be deleted!")}

        _filteredTodos.forEach((project) => addToMain(project));
        document.getElementById("sorting").style.display = "none"
        activateDelBtn();
        activateEditBtn()
                }
            )
        }
}


function defineDivColor(arg, div) {
    if (arg === "low") {
        div.style.backgroundColor = "#a0cbf1"
     } else if (arg === "mid") {
         div.style.backgroundColor = "#53aefd"
     } else if (arg === "high") {
         div.style.backgroundColor = "#3598ef"
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
        //    p.style.display = "none";
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
                    input.checked = true;            

                } else {
                    input.checked = false
                }
            div.appendChild(input);
        
            //check if task is done, if yes change background color 
            if (input.checked) {
                input.parentNode.style.backgroundColor = "#5ba76f";
                input.parentNode.childNodes[1].style.cssText = "text-decoration: line-through"
            }
            
            input.addEventListener("click", switchDone)
        }
      
        defineDivColor(arg[key], div)

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
    actualProject.textContent = allTaskBtn.textContent;
    todoList.forEach((project) => addToMain(project));
    document.getElementById("sorting").style.display = "block"
    activateDelBtn();
    activateEditBtn()
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
//bug repair - if you click cancel on prompt it crash program
    if (newProjectName != null) {
//    console.log(newProjectName);
    changeProjectName(newProjectName)}
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
    //    console.log(name)
        deleteProject(name)
    }
})

function deleteProject(projectName) {
    todoList.forEach(() => {
        let index = todoList.findIndex((e) => e.project === projectName);
    //    console.log(index)
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
        if (key.project === project) {
        // we found project in todoList so now we can delete title with same as clicked button taskName            
        return key.title === title} 
    }); 
    return indexObject
}

function activateDelBtn() {
    let allDel = document.querySelectorAll(".delBtn");
    allDel.forEach((e) => e.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
    let projectName = e.parentNode.firstChild.textContent;
    let taskName = e.parentNode.firstChild.nextSibling.textContent;

    let index = projectIndex(projectName, taskName)

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
     localStorage.setItem("todos", JSON.stringify(todoList))
}

document.getElementById("formCloseBtnC").addEventListener("click", () => {
    // cleaningModalInputs();
       editTaskModal.style.display = "none"
        mainContainer.style.cssText = ""  
   })

function activateEditBtn() {
    let allEdit = document.querySelectorAll(".editBtn");
    allEdit.forEach((e) => e.addEventListener("click", () => {
        closeModalOutside(editTaskModal, "edit");
        editTaskModal.style.display = "block";
        mainContainer.style.cssText = "position: relative; z-index: -1; filter: blur(10px)"

        let projectName = e.parentNode.firstChild.textContent;
        let taskName = e.parentNode.firstChild.nextSibling.textContent;
    
        let index = projectIndex(projectName, taskName);
    //    console.log(todoList[index].project)
        // set default value of select as clicked parent edit button
        selectProjectC.value = todoList[index].project

        //set current data as default for edit modal
        document.getElementById("titleC").value = todoList[index].title;
        document.getElementById("descC").value = todoList[index].description;
        document.getElementById("dateC").value = todoList[index].dueDate;
        document.getElementById("prioC").value = todoList[index].priority;
        
        // making changes and save in localStorage
        submitEditTaskBtn.setAttribute("id", index);
        
    }))
   
}

    // check if task name isnt actually in chosen project
    submitEditTaskBtn.addEventListener("click", () => {
    validationTask("titleC", "projectC", submitEditTaskBtn)
    let index = submitEditTaskBtn.id
        todoList[index].project = selectProjectC.value;
        todoList[index].title = document.getElementById("titleC").value;
        todoList[index].description = document.getElementById("descC").value;
        todoList[index].dueDate = document.getElementById("dateC").value;
        todoList[index].priority = document.getElementById("prioC").value;
    
        changeMain(todoList[index].project)
        //update current view
        localStorage.setItem("todos", JSON.stringify(todoList));
        //close modal
        editTaskModal.style.display = "none";
        mainContainer.style.cssText = ""
    })

function changeMain(task) {
main.textContent= "";
let _filteredTodos = todoList.filter(function(e) {
    if (e.project === task) 
    {return true}
        })

    if (task === actualProject.textContent) {
       _filteredTodos.forEach((project) => addToMain(project));
        activateDelBtn();
        activateEditBtn();
    } else {
        main.textContent= "";
        todoList.forEach((project) => addToMain(project));
        activateDelBtn();
     activateEditBtn();
    }
} 

// TO DO:
// make chunks with webpack
// import date functions
// add sort if task complete
// change addTomain in priority argument - change priority values to 1,2,3 and change sort method
// add sort only in chosen project!
// add project name in () after task name?? for sort by project ;)
// add save after sort?


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
        document.querySelector("#editTaskModal").style.backgroundColor = "#707199"

      localStorage.setItem("dark", document.getElementById("darkmode").checked)
      
  } else {
      //RETURN TO DEFAULT
        //background + font
        document.querySelector("body").style.color = "" 
        document.querySelector("header").style.backgroundColor = "#10ddc2"
        document.querySelector("aside").style.backgroundColor = "#15b7b9"
        document.querySelector("main").style.backgroundColor = "#f5f5f5"
        document.querySelector("#newTaskModal").style.backgroundColor = "#0dd9e5"   
        document.querySelector("#editTaskModal").style.backgroundColor = "#adadb1"

        localStorage.setItem("dark", document.getElementById("darkmode").checked)     
      }
}

function addOptionToSelect(xxx, yyy) {
    //    console.log(xxx)
    //    console.log(todoList)
    //    if (todoList.some(e => e.project === xxx)) {console.log("is already")} else {
        let option = document.createElement("option");
        option.value = xxx
        option.textContent = xxx
       // new option will be selected as default
        option.selected = true;
        yyy.appendChild(option)}
    // }


// TEST Projects
function createTestProjects(){
    const x = (function testing() {
            todoList.push(new Task("Project test 1","test 1-1","abc","2023-09-05","low","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
            addOptionToSelect(todoList[todoList.length-1].project, selectProject)
        })()

    const xx= (function testing() {
            todoList.push(new Task("Project test 1","test 1-2","def","2021-01-01","mid","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
        })()
            
    const xxx= (function testing() {
            todoList.push(new Task("Project test 1","test 1-3","ghi","2022-10-02","low","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons()
            })()

    const y = (function testing() {
            todoList.push(new Task("Project test 2","test 2-1","abc","2023-09-15","mid","no"))
            createAsideBtn();
            addToMain(todoList[todoList.length-1]);
            addEventsToAsideButtons();
            addOptionToSelect(todoList[todoList.length-1].project, selectProject)
            })()
                
    const yy = (function testing() {
            todoList.push(new Task("Project test 2","test 2-2","def","2020-11-25","high","no"))
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
    activateDelBtn();
    activateEditBtn();
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

    actualProject.textContent = allTaskBtn.textContent
    todoList.forEach((project) => addToMain(project));
   
    activateDelBtn();
    activateEditBtn();

    // add project name to edit modal Select
 
    let asideBtn = document.querySelectorAll(".projectBtn")
    asideBtn.forEach((element) => addOptionToSelect(element.textContent, selectProjectC))
}

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