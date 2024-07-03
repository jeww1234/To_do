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



allDelete.addEventListener("click", AD);
addButton.addEventListener("click", addTask);

function AD(i){
    taskList.splice(i);
    render(i);
}



function addTask(){
        let task = {
        taskContent: taskInput.value,
        isComplete: false,
        id: randomIDGenerate()
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                    <div class="task_list, task_done">${taskList[i].taskContent}</div>
                    <div>
                    <button onClick = "toggleComplete('${taskList[i].id}')">Check</button>
                    <button onClick = "deleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`;
        }else{
            resultHTML += `<div class="task">
                    <div class="task_list">${taskList[i].taskContent}</div>
                    <div>
                    <button onClick = "toggleComplete('${taskList[i].id}')">Check</button>
                    <button onClick = "deleteTask('${taskList[i].id}')">Delete</button>
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
    render();
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
    render();
}

taskInput.addEventListener("focus", function(){
    taskInput.value = "";
})