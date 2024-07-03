// 유저가 값을 입력한다.
// + 버튼을 클릭하며나 할일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
//  Check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은 끝난 아아이템만 진행중은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴
let taskInput = document.getElementById("task_input");
let addButton = document.getElementById("add_button");
let taskList = [];
let allDelete = document.getElementById("allDelete");
let tabs = document.querySelectorAll(".task_tabs div")
let mode ='all';
let filterList = [];
let underLine = document.getElementById("under_line");
let underMenu = document.querySelectorAll(".task_tabs:first-child div");
let List = [];

underMenu.forEach((menu)=> menu.addEventListener("click", (e)=> horizontalIndicator(e)));

function horizontalIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}




console.log(underMenu);

for(let i = 0; i < tabs.length; i++){

    tabs[i].addEventListener("click", function(event){filter(event)});

    };


function filter(event){

    if(event){mode = event.target.id};

    filterList = [];
    if(mode === "all"){
        render();
    }else if(mode === "onGo"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode === "done"){
        for(let i = 0; i < taskList.length; i++){
           if(taskList[i].isComplete == true){
            filterList.push(taskList[i])
            } 
        }
        render();
    }
}



allDelete.addEventListener("click", AD);
addButton.addEventListener("click", addTask);

function AD(i){
    taskList.splice(i);
    render(i);
}



function addTask(){
    if(taskInput.value == ""){
        return;
    }      
        let task = {
        taskContent: taskInput.value,
        isComplete: false,
        id: randomIDGenerate()
    }
    taskList.push(task);
    console.log(taskList);
    filter();
    taskInput.value = "";
}

function render(){
    List = [];
    if(mode == "all"){
        List = taskList;
    }else if(mode != "ongo" || mode != "done"){
        List = filterList;
    }
    let resultHTML = "";
    for(let i = 0; i <List.length; i++){
        if(List[i].isComplete == true){
            resultHTML += `<div class="task backC">
                    <div class="task_list, task_done">${List[i].taskContent}</div>
                    <div>
                    <button onClick = "toggleComplete('${List[i].id}')">Check</button>
                    <button onClick = "deleteTask('${List[i].id}')">Delete</button>
                    </div>
                </div>`;
        }else{
            resultHTML += `<div class="task">
                    <div class="task_list">${List[i].taskContent}</div>
                    <div>
                    <button onClick = "toggleComplete('${List[i].id}')">Check</button>
                    <button onClick = "deleteTask('${List[i].id}')">Delete</button>
                    </div>
                </div>`;
        }
    }
    document.getElementById("task_board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id", id);
    for (let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
    console.log(taskList);
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

taskInput.addEventListener("focus", function(){
    taskInput.value = "";
})





taskInput.addEventListener("keypress", function(event) {
    if(taskInput.value == ""){
        return;
    }
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add_button").click();
    }
    
  });