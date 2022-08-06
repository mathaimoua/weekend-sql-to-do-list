$(document).ready(onReady);

function onReady(){
  getTasks();
  $('#tableMain').on('click', '#completeBtn', updateTask);
  $('#addTaskBtn').on('click', addTask);
  $('#tableMain').on('click', '#deleteBtn', deleteTask);
}

function deleteTask(){
  const id = $(this).data('id');
  let result = window.confirm('Delete Task Forever?');
  if (result === true){
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${id}`
    }).then(function(response){
      console.log(response)
      getTasks();
    }).catch(function(err){
      console.log(err);
      console.log('error deleting task');
    })
  } else {alert('Task not deleted');}
}

function updateTask(){
  // console.log($(this).data('id'));
  const id = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${id}`,
  }).then(function(response){
    console.log(response);
    getTasks();
  }).catch(function(err){
    console.log('error updating task');
    console.log(err);
  })
}


function getTasks(){
  $('#tableMain').empty();
  $.ajax({
    method: 'GET',
    url: '/tasks'
  }).then(function (response){
    for (item of response){
      if (item.isdone === false){
        $('#tableMain').append(`
        <tr>
          <td class="isdoneFalse">${item.nameoftask}</td>
          <td><button data-isdone="${item.isdone}" data-id="${item.id}" id="completeBtn">Complete</button></td>
          <td><button data-id="${item.id}" id="deleteBtn">Delete</button></td></tr>
        `);
      } else {
        $('#tableMain').append(`
        <tr>
          <td class="isdoneTrue">${item.nameoftask}</td>
          <td><button data-isdone="${item.isdone}" data-id="${item.id}" id="completeBtn">Complete</button></td>
          <td><button data-id="${item.id}" id="deleteBtn">Delete</button></td></tr>
        `);
      }
    }
  }).catch(function(){
    console.log('error sending info to server');
  })
}

function addTask(){
  let object = { task: $('#taskIn').val() };

  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: object
  }).then(function(response){
    console.log(response);
    $('#taskIn').val('');
    getTasks();
  }).catch(function(err){
    console.log(err);
    console.log('error sending new task');
  })
}