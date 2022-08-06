console.log('works');

$(document).ready(handleReady);

function handleReady(){
    console.log('jq in the house');
    getTasks();
    //click listeners
    $('#tasks').on('click','#completeBtn', handleComplete);
    $('#tasks').on('click','#deleteBtn', handleDelete);
}

function handleComplete(){
    console.log('complete clicked');
}
function handleDelete(){
    console.log('delete clicked');
    const id = $(this).closest('tr').data('id');
    console.log(id);

    $.ajax({
        method: 'DELETE',
        url: `/todo/${id}`
    }).then(function (response){
        console.log(response);
        getTasks();
    }).catch(function(err){
        console.log(err);
        alert('error in delete');
    })

}
function renderDisplay(object){
    console.log('in render display');
    //empty dom
    el = $('#tasks');
    el.empty();
    //for loop to go through array of objects
    for (let i=0; i < object.length; i++){
        $('#tasks').append(`
            <tr data-id="${object[i].id}">    
                <td>${object[i].task}</td>
                <td>${object[i].complete}</td>
                <td><button id="completeBtn">Complete</button></td>
                <td><button id="deleteBtn">Delete</button></td>
            </tr>
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