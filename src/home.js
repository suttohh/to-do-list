import { parse, compareAsc } from "date-fns";
import {Note, createAddNotePopUp, generateGrid, generateAddTask, storeNoteList, loadNoteList} from './note.js';
import {sidebar, SidebarItem, getSelectedSidebarItem} from './sidebar.js';

export function home() {
    const verticalFlexDiv = document.createElement('div');
    verticalFlexDiv.classList.add("vertical-flex");

    //NAVBAR
    const navbar = document.createElement('div');
    navbar.classList.add("navbar");
    verticalFlexDiv.appendChild(navbar);

    const toDoHeader = document.createElement('div');
    toDoHeader.classList.add('to-do-header');
    const h1notes = document.createElement('h1');
    h1notes.classList.add('h1-notes');
    h1notes.innerHTML = "Notes";
    const buttonHeader = document.createElement('div');
    buttonHeader.classList.add('button-header');

    navbar.appendChild(toDoHeader);
    toDoHeader.appendChild(h1notes);
    navbar.appendChild(buttonHeader);

    //LAYOUT - MAIN
    const topLayoutGrid = document.createElement('div');
    topLayoutGrid.classList.add('top-layout-grid');
    verticalFlexDiv.appendChild(topLayoutGrid);

    //SIDEBAR
    topLayoutGrid.appendChild(sidebar());

    //NOTES
    const noteList = loadNoteList();
    //NOTE-LAYOUT
    const noteLayoutGrid = document.createElement('div');
    noteLayoutGrid.classList.add('note-layout-grid');
    topLayoutGrid.appendChild(noteLayoutGrid);

    const todayHeader = document.createElement('div');
    todayHeader.classList.add('today-header');
    noteLayoutGrid.appendChild(todayHeader);

    const h2today = document.createElement('h2');
    h2today.classList.add('h2-today');
    h2today.innerHTML = "Today";
    todayHeader.appendChild(h2today);

    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filter-div');
    todayHeader.appendChild(filterDiv);

    const filterIcon = document.createElement('span');
    filterIcon.classList.add('material-symbols-outlined', 'filter');
    filterIcon.innerHTML = "tune";
    const filterText = document.createElement('span');
    filterText.classList.add('filter');
    filterText.innerHTML = "Filter";
    filterDiv.appendChild(filterIcon);
    filterDiv.appendChild(filterText);

    filterDiv.onclick = () => {
        const popupDiv = document.createElement('div');
        popupDiv.classList.add('popUp');
        document.body.appendChild(popupDiv);
        const disableDiv = document.createElement('div');
        disableDiv.classList.add('disableDiv');
        document.body.appendChild(disableDiv);
        const filterLabel = document.createElement('label');
        filterLabel.classList.add('popup-label');
        filterLabel.innerHTML = "Filter: ";
        filterLabel.setAttribute('for', 'filter-select');
        popupDiv.appendChild(filterLabel);
        const filterSelect = document.createElement('select');
        filterSelect.setAttribute('id', 'filter-select');
        filterSelect.classList.add('popup-input');
        const options = ['Reminder Time', 'Due Date'];
        for(let i = 0; i < options.length; i++) {
            const filterSelectOption = document.createElement('option');
            filterSelectOption.value = options[i].toLowerCase();
            filterSelectOption.innerHTML = options[i];
            filterSelect.appendChild(filterSelectOption);
        }
        popupDiv.appendChild(filterSelect);
        
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('popup-button-div');
        popupDiv.appendChild(buttonDiv);
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('popup-button');
        cancelButton.innerHTML = "Cancel";
        cancelButton.onclick = () => {
            popupDiv.remove();
            disableDiv.remove();
        }
        buttonDiv.appendChild(cancelButton);
        
        const applyButton = document.createElement('button');
        applyButton.classList.add('popup-button');
        applyButton.innerHTML = "Apply";
        applyButton.onclick = () => {
            if(filterSelect.value === "due date") {
                noteList.sort((a, b) => {
                    return compareAsc(parse(a.dueDate, "yyyy-MM-dd'T'HH:mm", new Date()),
                    parse(b.dueDate, "yyyy-MM-dd'T'HH:mm", new Date()));
                });
            } else if (filterSelect.value === "reminder time") {
                noteList.sort((a, b) => {
                    return compareAsc(parse(a.reminderTime, 'HH:mm', new Date()),
                    parse(b.reminderTime, 'HH:mm', new Date()));
                });
            }
            let personalGrid = document.getElementById('personal-grid');
            let notes = personalGrid.getElementsByClassName('note');
            while(notes.length > 0) {
                notes[0].remove();
            }
            for(let i = 0; i < noteList.length; i ++) {
                personalGrid.appendChild(noteList[i].generateNote(noteList));
            }
            popupDiv.remove();
            disableDiv.remove();
        }
        buttonDiv.appendChild(applyButton);
    }

    // NOTE GRIDS
    const personalGrid = generateGrid(noteList);
    noteLayoutGrid.appendChild(personalGrid);
    noteLayoutGrid.appendChild(generateAddTask(personalGrid, noteList));
     return verticalFlexDiv;
}

export default home;