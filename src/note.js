import {SidebarItem, getSelectedSidebarItem, getSidebarItemById} from './sidebar.js';

export function Note(id, text, reminderTime, category, isChecked, dueDate, projectId) {
    this.id = id;
    this.text = text;
    this.reminderTime = reminderTime;
    this.category = category;
    this.isChecked = isChecked;
    this.dueDate = dueDate;
    this.projectId = projectId;
}

Note.prototype = {
    getText: function() {return this.text},
    getReminderTime: function() {return this.reminderTime},
    getCategory: function() {return this.category},
    generateNote: function(noteList) {
        const note = document.createElement('div');
        note.classList.add('note');

        const noteCheckbox = document.createElement('input');
        noteCheckbox.classList.add('note-checkbox');
        noteCheckbox.setAttribute('type', 'checkbox');
        if(this.isChecked == true) {
            noteCheckbox.setAttribute('checked', '');
        }
        noteCheckbox.onclick = () => {
            this.isChecked = !this.isChecked;
            storeNoteList(noteList);
        }
        note.appendChild(noteCheckbox);

        const noteTextLayout = document.createElement('div');
        noteTextLayout.classList.add('note-text-layout');
        note.appendChild(noteTextLayout);

        const noteText = document.createElement('span');
        noteText.classList.add('note-text');
        noteText.innerHTML = this.text;
        noteTextLayout.appendChild(noteText);

        const noteTimeDiv = document.createElement('div');
        noteTimeDiv.classList.add('note-time-section');
        noteTextLayout.appendChild(noteTimeDiv);

        if(this.reminderTime != null && this.reminderTime != '') {
            const noteTimeIcon = document.createElement('span');
            noteTimeIcon.classList.add('material-symbols-outlined', 'note-time-icon');
            noteTimeIcon.innerHTML = "autorenew";
            const noteTime = document.createElement('span');
            noteTime.classList.add('note-time');
            noteTime.innerHTML = this.reminderTime;
            const noteTimeIconAlarm = document.createElement('span');
            noteTimeIconAlarm.classList.add('material-symbols-outlined', 'note-time-icon');
            noteTimeIconAlarm.innerHTML = "alarm";

            noteTimeDiv.appendChild(noteTimeIcon);
            noteTimeDiv.appendChild(noteTime);
            noteTimeDiv.appendChild(noteTimeIconAlarm);
        }

        const noteDueDateDiv = document.createElement('div');
        noteDueDateDiv.classList.add('note-due-date-section');
        noteTextLayout.appendChild(noteDueDateDiv);
        if(this.dueDate != null && this.dueDate != '') {
            const noteDueDateIcon = document.createElement('span');
            noteDueDateIcon.classList.add('material-symbols-outlined', 'note-due-date-icon');
            noteDueDateIcon.innerHTML = "event";
            const noteDueDate = document.createElement('span');
            noteDueDate.classList.add('note-due-date');
            noteDueDate.innerHTML = this.dueDate.replace('T', ' ');
            noteDueDateDiv.appendChild(noteDueDateIcon);
            noteDueDateDiv.appendChild(noteDueDate);
        }
        //Div set to use the right hand side (RHS) space of a note
        const noteRHSDiv = document.createElement('div');
        noteRHSDiv.classList.add('note-rhs-div');
        note.appendChild(noteRHSDiv);
        if(noteList != null) {
            const removeNoteButton = document.createElement('button');
            removeNoteButton.classList.add('remove-note-button');
            removeNoteButton.innerHTML = "DELETE";
            removeNoteButton.onclick = () => {
                note.remove();
                for(let i = 0; i < noteList.length; i++) {
                    if(noteList[i].id == this.id) {
                        noteList.splice(i, 1);
                        storeNoteList(noteList);
                    }
                }
            }
            noteRHSDiv.appendChild(removeNoteButton);
        }
        if(this.category != null) {
            const noteCategory = document.createElement('span');
            noteCategory.classList.add('note-category');
            noteCategory.innerHTML = this.category;
            noteRHSDiv.appendChild(noteCategory);
        }
        if(this.projectId != null) {
            const noteProject = document.createElement('span');
            noteProject.classList.add('note-category');
            noteProject.innerHTML = getSidebarItemById(this.projectId).title;
            noteRHSDiv.appendChild(noteProject);
        }
        return note;
    }
};

Note.filterNotes = function(notes, text, category, reminderTime) {
    console.log(notes);
}

export function createAddNotePopUp(grid, noteList) {
    const popUpDiv = document.createElement('div');
    popUpDiv.classList.add('popUp');

    const noteTextLabel = document.createElement('label');
    noteTextLabel.classList.add('popup-label');
    noteTextLabel.innerHTML = "Note";
    popUpDiv.appendChild(noteTextLabel);
    const noteTextInput = document.createElement('input');
    noteTextInput.classList.add('note-text-input', 'popup-input');
    noteTextInput.setAttribute('type', 'text');
    popUpDiv.appendChild(noteTextInput);

    const noteCategoryLabel = document.createElement('label');
    noteCategoryLabel.classList.add('popup-label');
    noteCategoryLabel.innerHTML = "Category";
    popUpDiv.appendChild(noteCategoryLabel);
    const noteCategoryDropdown = document.createElement('select');
    noteCategoryDropdown.classList.add('note-category-dropdown', 'popup-input');
    noteCategoryDropdown.setAttribute('placeholder', 'Select an option...');
    popUpDiv.appendChild(noteCategoryDropdown);
    const options = ["category-1", "category-2", "category-3"];
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.innerHTML = "Select an option...";
    noteCategoryDropdown.appendChild(placeholderOption);
    for (let i = 0; i < options.length; i++) {
        const categoryOption = document.createElement('option');
        categoryOption.value = options[i];
        categoryOption.innerHTML = options[i];
        noteCategoryDropdown.appendChild(categoryOption);
    }

    const noteReminderLabel = document.createElement('label');
    noteReminderLabel.classList.add('popup-label');
    noteReminderLabel.innerHTML = "Reminder";
    popUpDiv.appendChild(noteReminderLabel);
    const noteReminderInput = document.createElement('input');
    noteReminderInput.classList.add('note-reminder-input', 'popup-input');
    noteReminderInput.setAttribute('type', 'time');
    popUpDiv.appendChild(noteReminderInput);

    const noteDueDateLabel = document.createElement('label');
    noteDueDateLabel.classList.add('note-due-date-label', 'popup-label');
    noteDueDateLabel.innerHTML = "Due Date";
    popUpDiv.appendChild(noteDueDateLabel);
    const noteDueDateInput = document.createElement('input');
    noteDueDateInput.setAttribute('type', 'datetime-local');
    noteDueDateInput.classList.add('popup-input');
    popUpDiv.appendChild(noteDueDateInput);

    const popupButtonDiv = document.createElement('div');
    popupButtonDiv.classList.add('popup-button-div');
    popUpDiv.appendChild(popupButtonDiv);
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('popup-button');
    cancelButton.innerHTML = "Cancel";
    popupButtonDiv.appendChild(cancelButton);
    const addNoteButton = document.createElement('button');
    addNoteButton.classList.add('popup-button');
    addNoteButton.innerHTML = "Add Note";
    popupButtonDiv.appendChild(addNoteButton);
    const disableDiv = document.createElement('div');
    disableDiv.classList.add('disableDiv');
    document.body.appendChild(disableDiv);
    addNoteButton.onclick = () => {
        const newNote = new Note(noteList.length + 1, noteTextInput.value, noteReminderInput.value, noteCategoryDropdown.value, false, noteDueDateInput.value, getSelectedSidebarItem().getId());
        grid.appendChild(newNote.generateNote(noteList));
        noteList.push(newNote);
        storeNoteList(noteList);
        popUpDiv.remove();
        disableDiv.remove();
    }
    cancelButton.onclick = () => {
        popUpDiv.remove();
        disableDiv.remove();
    }
    return popUpDiv;
}

export function generateGrid(noteList) {
    const personalGrid = document.createElement('div');
    personalGrid.classList.add('personal-grid');
    personalGrid.setAttribute('id', 'personal-grid');

    const titlePersonal = document.createElement('span');
    titlePersonal.classList.add('title-personal');
    personalGrid.appendChild(titlePersonal);

    for(let i = 0; i < noteList.length; i ++) {
        personalGrid.appendChild(noteList[i].generateNote(noteList));
    }
    
    return personalGrid;
}

export function generateAddTask(personalGrid, noteList) {
    //ADD TASK
    const noteAddTaskDiv = document.createElement('div');
    noteAddTaskDiv.classList.add('note-add-task-div');
    noteAddTaskDiv.setAttribute('id', 'note-add-task-div');
    const noteAddTaskSpan = document.createElement('span');
    noteAddTaskSpan.classList.add('note-add-task-span');
    noteAddTaskSpan.setAttribute('tab-index', 0);
    noteAddTaskDiv.appendChild(noteAddTaskSpan);
    const noteAddTaskIcon = document.createElement('span');
    noteAddTaskIcon.classList.add('material-symbols-outlined', 'note-add-task-icon');
    noteAddTaskIcon.innerHTML = "add";
    noteAddTaskSpan.appendChild(noteAddTaskIcon);
    const noteAddTaskText = document.createElement('span');
    noteAddTaskText.classList.add('note-add-task');
    noteAddTaskText.innerHTML = "Add Task";
    noteAddTaskSpan.appendChild(noteAddTaskText);
    noteAddTaskSpan.onclick = () => {
        document.body.appendChild(createAddNotePopUp(personalGrid, noteList));
    }
    return noteAddTaskDiv;
}

export function storeNoteList(noteList) {
    const noteListStore = noteList;
    noteListStore.sort((a, b) => {
        if(a.id > b.id) {
            return 1;
        }
        if(a.id < b.id) {
            return -1;
        } else {
            return 0;
        }
    });
    localStorage.setItem("noteList", JSON.stringify(noteListStore));
}

export function loadNoteList(){
    const noteList = [];

    const noteListSerialized = localStorage.getItem("noteList");
    
    let noteListDeserialized = [];
    
    if(noteListSerialized != null) {
        noteListDeserialized = JSON.parse(localStorage.getItem("noteList"));
    } 

    for(let i = 0; i < noteListDeserialized.length; i++) {
        const rawNote = noteListDeserialized[i];
        const convertedNote = new Note(rawNote.id, rawNote.text, rawNote.reminderTime, rawNote.category, rawNote.isChecked, rawNote.dueDate, rawNote.projectId);
        noteList.push(convertedNote);
    }
    return noteList;
}

export default Note;