

console.log('works');

$(document).ready(handleReady);

function handleReady(){
    console.log('jq in the house');
    getTasks();
    //click listeners
    $('#tasks').on('click','#completeBtn', handleComplete);
    $('#tasks').on('click','#deleteBtn', handleDelete);
    $('#addBtn').on('click', handleAdd);
}

function markComplete(objectArray){
    //loop through the array
    for(let i =0; i<objectArray.length; i++){
         //check to see if complete is true
         if(objectArray[i].complete === true){
            console.log('it is true');
            //$(this).closest('.row').addClass("done");
            // $(this).closest('.box').addClass("yellowBackground");
         } else if (objectArray[i].complete === false){
            console.log('it is false');
         }
    }
}

function handleAdd(){
    console.log('add');
    if($('#newTaskIn').val() !== ''){
        let newTaskObject = {
            task: $('#newTaskIn').val(),
            complete: false
        }
        $.ajax({
            type: 'POST',
            url: '/todo/',
            data: newTaskObject
        }).then(function(response){
            $('#newTaskIn').val('');
            getTasks();
        })
    }   
}

function handleComplete(){
    console.log('complete clicked');
    const id = $(this).closest('tr').data('id');
    console.log(id);

    $.ajax({
        method: 'PUT',
        url: `/todo/${id}`
    }).then(function(response){
        console.log(response);
        getTasks();
    }).catch(function(err){
        console.log(err);
        alert('update failed');
    })
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
    let el = $('#tasks');
    el.empty();

    //for loop to go through array of objects
    for (let i=0; i < object.length; i++){
    
        $('#tasks').append(`
            <tr class="row" data-id="${object[i].id}">    
                <td>${object[i].task}</td>
                <td class="done">${object[i].complete}</td>
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
        //markComplete function
        markComplete(response);
        //renderToDom function
        renderDisplay(response);
    })
}

//POST

//PUT

//DELETE