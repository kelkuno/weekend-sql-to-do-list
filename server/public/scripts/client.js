console.log('works');

$(document).ready(handleReady);

function handleReady(){
    console.log('jq in the house');
    getTasks();
    //click listeners
}

function renderDisplay(object){
    console.log('in render display');
    //for loop to go through array of objects
    for (let i=0; i < object.length; i++){
        $('.task-row').append(`
            <td>${object[i].task}</td>
            <td>${object[i].complete}</td>
        `)
    }
}

//GET
//get tasks from server
function getTasks(){
    console.log('in get tasks');
    $.ajax({
        method: 'GET',
        url: '/todo/'
    }).then(function (response){
        console.log('here are the tasks', response);
        //renderToDom function
        renderDisplay(response);
    })
}

//POST

//PUT

//DELETE