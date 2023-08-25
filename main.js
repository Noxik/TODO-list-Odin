let todoList = []
document.getElementById("all").addEventListener("click", () => {
    document.querySelector("main").textContent= ""
    let main = document.querySelector("main")
    let p = document.createElement("p")
    p.textContent = document.getElementById("all").textContent
    main.appendChild(p)
    addToMainBtnProject(todoList)}
    )
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


// Add last item from todoList to main
function addToMain() { 
    let div = document.createElement("div");

    for (let key in todoList[todoList.length-1]) {    
    // without project name
    if (key !== "project") {   
        let span = document.createElement("span");
    //   console.log(key, [key], [key].toString())
    span.textContent = todoList[todoList.length-1][key]
    div.appendChild(span)
    }
    }
 return document.querySelector("main").appendChild(div)
}

document.getElementById("submit").addEventListener("click", () => {
    addNewTask();
    createAsideBtn();
    addToMain();
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
function createAsideBtn() {
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
        proBtn[i].addEventListener("click", function() {
        //   console.log(proBtn[i]);
            let test = todoList.filter(function(e) {
                if (e.project === proBtn[i].textContent) 
                {return true}
                    })
   //   console.log(test[0].project);
       
       document.querySelector("main").textContent= ""
       let main = document.querySelector("main")
       let p = document.createElement("p")
       p.textContent = test[0].project
       main.appendChild(p)


        addToMainBtnProject(test)

      
                }
            )
        }
}

//function which add choosen project after click button to main section - only task in project with the same name as button
function addToMainBtnProject(projectButton) { 
// clean main
 //   document.querySelector("main").textContent= ""
    projectButton.forEach((project) => {
        let div = document.createElement("div");
            for (let key in project) {
                if (key !== "project") {
    //        console.log(project[key]);
            let span = document.createElement("span");
            span.textContent = project[key]
            div.appendChild(span)
            }}
    return document.querySelector("main").appendChild(div)})
}

/* let test = (function start() {
    document.getElementById("all").addEventListener("click", addToMainBtnProject(todoList))
})() */

// create filtered arr if project name is equal to sth
const arx = todoList.filter(function(key) {if (key.project === projects[1]) {return true}})


// DONE: NEXT ADD DISPLAY PROJECT TASK AFTER BUTTON KLIK with filter!:)
// NEED to add test project to options
// Need to add in submit new task check if project name is the same as clicked becasue without that it will show new task to many project which is actuall in main section
// CONSIDER TO ADD PROJECT BUTTON AFTER ADDING NEW PROJECT TO NAVBAR

// TEST Projects
const x = (function testing() {
    console.log(todoList)
        todoList.push(new Task("x","a","b",1,"low"))
        createAsideBtn();
        addToMain();
        addEventsToAsideButtons()
    })()

    const xx= (function testing() {
        console.log(todoList)
            todoList.push(new Task("x","d","e",2,"mid"))
            createAsideBtn();
            addToMain();
            addEventsToAsideButtons()
        })()
        
        const xxx= (function testing() {
            console.log(todoList)
                todoList.push(new Task("x","f","g",3,"mid"))
                createAsideBtn();
                addToMain();
                addEventsToAsideButtons()
            })()

        const y = (function testing() {
            console.log(todoList)
                todoList.push(new Task("y","a","b",1,"mid"))
                createAsideBtn();
                addToMain();
                addEventsToAsideButtons()
            })()
            
            const yy = (function testing() {
                console.log(todoList)
                    todoList.push(new Task("y","c","d",2,"high"))
                    createAsideBtn();
                    addToMain();
                    addEventsToAsideButtons()
                })()

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
