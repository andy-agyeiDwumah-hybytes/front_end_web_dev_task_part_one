const LOCALSTORAGEKEY = "tasks_jquery";

function getDateAsStringOrFormatted() {
  // Returns the date as string value in ISO format
  const d = new Date();
  const dateStringVal = d.toISOString();
  const formattedDate = d.toISOString().split("T")[0];
  return [dateStringVal, formattedDate];
}

function removeTask(task, $li) {
  // Remove <li> (i.e., task) from DOM and its children
  $li.remove();
  const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY));
  // Remove from local storage
  const updatedTasks = tasks.filter(t => t.id !== task.id);
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(updatedTasks));
}

function rebuildTaskContent($li, task) {
  // Restores the original task view
  $li.empty(); // Remove all children
  // Create task elements
  const [
    $div,
    $removeBtn,
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $showHideBtn,
    $editBtn,
    $taskDescription,
    $form,
  ] = createTask(task);

  attachEventListenersToTask(task, $form, $editBtn, $showHideBtn, $li);

  // Add to DOM
  // Adds task content to same position as it was previously in the DOM
  $form.append($removeBtn);
  $hideBtnContainer.append($showHideBtn);
  $div.append(
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $taskDescription,
    $editBtn,
    $form
  );
  $li.append($div);
}

function saveEditedTask(
  task,
  $taskNameInput,
  $taskDescriptionInput,
  $taskDeadlineInput,
  taskIndex,
  tasks,
  $li
) {
  const updatedTask = {
    // Copy initial values (including id) and update task info
    ...task,
    name: $taskNameInput.val().trim(),
    description: $taskDescriptionInput.val().trim(),
    date: $taskDeadlineInput.val(),
  };

  // Update local storage with updated task
  tasks[taskIndex] = updatedTask;
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(tasks));

  // Update the DOM with the new task details
  rebuildTaskContent($li, updatedTask);
}

function createFormElementsForEditedTask(taskIndex) {
  const $form = $("<form>");
  const $taskNameContainer = $("<div>");
  const $taskNameLabel = $("<label>")
    .attr("for", `edit-task-name-${taskIndex}`)
    .text("Edit Task Name");
  const $taskDescriptionContainer = $("<div>");
  const $taskDescriptionLabel = $("<label>")
    .attr("for", `edit-task-description-${taskIndex}`)
    .text("Edit Task Description");
  const $taskDateContainer = $("<div>");
  const $taskDateLabel = $("<label>")
    .attr("for", `edit-task-date-${taskIndex}`)
    .text("Edit task name");

  return [
    $form,
    $taskNameContainer,
    $taskNameLabel,
    $taskDescriptionContainer,
    $taskDescriptionLabel,
    $taskDateContainer,
    $taskDateLabel,
  ];
}

function createInputFieldsForEditedTask(
  originalTaskName,
  originalTaskDescription,
  originalTaskDeadline,
  taskIndex,
  dateAsString
) {
  const $taskNameInput = $("<input>")
    .val(originalTaskName)
    .attr("id", `edit-task-name-${taskIndex}`)
    .addClass("input-edit");
  const $taskDescriptionInput = $("<textarea>")
    .val(originalTaskDescription)
    .attr("id", `edit-task-description-${taskIndex}`)
    .addClass("input-edit");
  const $taskDeadlineInput = $("<input>")
    .attr("type", "date")
    .attr("min", dateAsString)
    .attr("id", `edit-task-date-${taskIndex}`)
    .val(originalTaskDeadline)
    .addClass("input-edit");
  const $saveButton = $("<button>")
    .text("Save")
    .attr("type", "submit")
    .addClass("save-btn");
  const $cancelButton = $("<button>")
    .text("Cancel")
    .attr("type", "button")
    .addClass("cancel-btn");

  return [
    $taskNameInput,
    $taskDescriptionInput,
    $taskDeadlineInput,
    $saveButton,
    $cancelButton,
  ];
}

function editTask(task, $li) {
  // Get index of task to edit
  const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY));
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  const dateAsString = getDateAsStringOrFormatted[1];

  // Create form elements
  const [
    $form,
    $taskNameContainer,
    $taskNameLabel,
    $taskDescriptionContainer,
    $taskDescriptionLabel,
    $taskDateContainer,
    $taskDateLabel,
  ] = createFormElementsForEditedTask(taskIndex);

  // Store original task details
  const originalTaskName = task.name;
  const originalTaskDescription = task.description;
  const originalTaskDeadline = task.date;

  // Replace task details with input fields
  const [
    $taskNameInput,
    $taskDescriptionInput,
    $taskDeadlineInput,
    $saveButton,
    $cancelButton,
  ] = createInputFieldsForEditedTask(
    originalTaskName,
    originalTaskDescription,
    originalTaskDeadline,
    taskIndex,
    dateAsString
  );

  // Clear the existing content and add inputs and buttons
  $li.empty();
  $taskNameContainer.append($taskNameLabel, $taskNameInput);
  $taskDescriptionContainer.append(
    $taskDescriptionLabel,
    $taskDescriptionInput
  );
  $taskDateContainer.append($taskDateLabel, $taskDeadlineInput);
  $form.append(
    $taskNameContainer,
    $taskDescriptionContainer,
    $taskDateContainer,
    $cancelButton,
    $saveButton
  );
  $li.append($form);

  // Save the edited changes on submit
  $form.submit(function (e) {
    e.preventDefault();
    saveEditedTask(
      task,
      $taskNameInput,
      $taskDescriptionInput,
      $taskDeadlineInput,
      taskIndex,
      tasks,
      $li
    );
  });
  // Cancel changes if user presses 'cancel' button
  $cancelButton.click(function () {
    rebuildTaskContent($li, task);
  });
}

function attachEventListenersToTask(task, $form, $editBtn, $showHideBtn, $li) {
  $form.submit(function (e) {
    e.preventDefault();
    removeTask(task, $li);
  });

  $editBtn.click(function () {
    // Associate button with closest li
    editTask(task, $(this).closest("li"));
  });

  // Show and hide text description
  $showHideBtn.click(function () {
    if ($(this).text() === "Show") {
      $(this).text("Hide");
    } else {
      $(this).text("Show");
    }
    // Associate button with closest task description
    $(this).closest("div.task-container").find("p.description").slideToggle();
  });
}

function createTask(task) {
  const $div = $("<div>").addClass("task-container");
  // Do not prevent default as DOM will not show new updates
  const $form = $("<form>").addClass("remove-btn-form");
  const $removeBtn = $("<button>").attr("type", "submit").text("Remove").addClass("remove-btn");
  const $taskHeading = $("<h3>").text(task.name);
  const $taskDeadline = $("<p>").html(
    `<strong>Deadline: ${task.date}</strong>`
  );
  const $hideBtnContainer = $("<div>").addClass("hide-btn-container");
  const $showHideBtn = $("<button>").attr("type", "button").text("Show").addClass("hide-btn");
  const $editBtn = $("<button>").attr("type", "button").text("Edit").addClass("edit-btn");
  // Initially hide task description to prevent it from taking up too much space
  const $taskDescription = $("<p>")
    .text(task.description)
    .addClass("description")
    .hide();

  return [
    $div,
    $removeBtn,
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $showHideBtn,
    $editBtn,
    $taskDescription,
    $form,
  ];
}

function addTaskElementsToDom(taskElements) {
  [
    $hideBtnContainer,
    $showHideBtn,
    $div,
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $taskDescription,
    $editBtn,
    $removeBtn,
    $form,
    $li,
  ] = taskElements;

  $form.append($removeBtn);
  $hideBtnContainer.append($showHideBtn);
  $div.append(
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $taskDescription,
    $editBtn,
    $form
  );

  $li.append($div);
  // Add new task at the end of task list
  $("#task-list").append($li);
}

function addTaskToDom(task) {
  const $li = $("<li>");
  const [
    $div,
    $removeBtn,
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $showHideBtn,
    $editBtn,
    $taskDescription,
    $form,
  ] = createTask(task);

  attachEventListenersToTask(task, $form, $editBtn, $showHideBtn, $li);

  const taskElements = [
    $hideBtnContainer,
    $showHideBtn,
    $div,
    $taskHeading,
    $taskDeadline,
    $hideBtnContainer,
    $taskDescription,
    $editBtn,
    $removeBtn,
    $form,
    $li,
  ];
  addTaskElementsToDom(taskElements);
}

function getTasks() {
  const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || [];
  tasks.forEach(task => addTaskToDom(task));
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem(LOCALSTORAGEKEY)) || [];
  tasks.push(task);
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(tasks));
}

// When the document is ready...
$(function () {
  // Prevent user from selecting any date before today
  const [_, formattedDate] = getDateAsStringOrFormatted();
  $("#task-deadline").attr("min", formattedDate);

  $("#create-task-form").submit(function (e) {
    const [dateStringVal, _] = getDateAsStringOrFormatted();
    e.preventDefault();
    // Get user values
    const userTaskName = $("#task-name").val().trim();
    const userTaskDescription = $("#task-description").val().trim();
    const userTaskDate = $("#task-deadline").val();
    // Use array indexing to grab value of element and access reset method
    $(this)[0].reset(); // Reset form values

    const taskData = {
      id: dateStringVal,
      name: userTaskName,
      description: userTaskDescription,
      date: userTaskDate,
    };

    addTaskToDom(taskData);
    saveTask(taskData);
  });
  getTasks();
});
