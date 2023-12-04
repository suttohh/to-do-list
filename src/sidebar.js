var selectedSidebarItem = null;
const sidebarItems = [];

export function sidebar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const sidebarGeneralItemsDiv = document.createElement('div');
    sidebarGeneralItemsDiv.classList.add('sidebar-general-items');
    //sidebar.appendChild(sidebarGeneralItemsDiv);
    const sidebarGeneralItemsInnerHTML = ["Inbox", "Today", "Upcoming"];
    const sidebarGeneralItemsClass = ["Inbox", "Today", "Upcoming"];
    const sidebarGeneralItemsIconsInnerHTML = ["inbox", "calendar_month", "upcoming"];
    const sidebarGeneralItemsIconClass = ["inbox-icon", "calendar-icon", "upcoming-icon"];
    for(let i = 0; i < 3; i++) {
        const sidebarGeneralItems = document.createElement('div');
        sidebarGeneralItems.classList.add('sidebar-item');

        const sidebarIcon = document.createElement('span');
        sidebarIcon.classList.add("material-symbols-outlined", sidebarGeneralItemsIconClass[i]);
        sidebarIcon.innerHTML = sidebarGeneralItemsIconsInnerHTML[i];
        sidebarGeneralItems.appendChild(sidebarIcon);

        const item = document.createElement('span');
        item.classList.add(sidebarGeneralItemsClass[i]);
        item.innerHTML = sidebarGeneralItemsInnerHTML[i];
        sidebarGeneralItems.appendChild(item);
        sidebarGeneralItemsDiv.appendChild(sidebarGeneralItems);
    }

    const sidebarProjectDiv = document.createElement('div');
    sidebarProjectDiv.classList.add('sidebar-project');
    sidebar.appendChild(sidebarProjectDiv);

    const projectHeadingSpan = document.createElement('span');
    projectHeadingSpan.classList.add('project-heading');
    projectHeadingSpan.innerHTML = "Projects";
    sidebarProjectDiv.appendChild(projectHeadingSpan);
    for(let i = 1; i <= 3; i++) {
        sidebarItems.push(new SidebarItem(i, "Project-" + i));
    }
    selectedSidebarItem = sidebarItems[0];
    const sidebarProjectItemElements = [];
    for(let i = 0; i < sidebarItems.length; i++) {
        const sidebarProjectItem = document.createElement('div');
        if(selectedSidebarItem === sidebarItems[i]) {
            sidebarProjectItem.classList.add('sidebar-project-item-selected');
        } else {
            sidebarProjectItem.classList.add('sidebar-project-item');
        }
        sidebarProjectItem.setAttribute('tabindex', i + 1);
        const sidebarIcon = document.createElement('span');
        sidebarIcon.classList.add('material-symbols-outlined', 'user-icon-1');
        sidebarIcon.innerHTML = 'person';
        sidebarProjectItem.appendChild(sidebarIcon);

        const item = document.createElement('span');
        item.setAttribute('id', sidebarItems[i].title);
        item.innerHTML = sidebarItems[i].title;
        sidebarProjectItem.appendChild(item);
        sidebarProjectDiv.appendChild(sidebarProjectItem);
        sidebarProjectItemElements.push(sidebarProjectItem);
    }
    for(let i = 0; i < sidebarProjectItemElements.length; i++) {
        sidebarProjectItemElements[i].onclick = () => {
            //Remove selected from all other items to ensure only current item is highlighted as selected
            for(let a = 0; a < sidebarProjectItemElements.length; a++) {
                sidebarProjectItemElements[a].classList.remove('sidebar-project-item-selected');
                sidebarProjectItemElements[a].classList.add('sidebar-project-item');
            }
            sidebarProjectItemElements[i].classList.remove('sidebar-project-item');
            sidebarProjectItemElements[i].classList.add('sidebar-project-item-selected');
            selectedSidebarItem = sidebarItems[i];
        }
    }

    const addProjectSpan = document.createElement('span');
    addProjectSpan.setAttribute('id', 'add-project-span');
    sidebarProjectDiv.appendChild(addProjectSpan);
    const addProjectIcon = document.createElement('span');
    addProjectIcon.classList.add('material-symbols-outlined');
    addProjectIcon.setAttribute('id', 'add-project-icon');
    addProjectIcon.innerHTML = "add";
    addProjectSpan.appendChild(addProjectIcon);
    const addProjectText = document.createElement('span');
    addProjectText.innerHTML = "Add Project";
    addProjectText.setAttribute('id', 'add-project-text');
    addProjectSpan.appendChild(addProjectText);
    return sidebar;
}

export function SidebarItem(id, title) {
    this.id = id;
    this.title = title;
}

SidebarItem.prototype = {
    getId: function() {return this.id}
}

export function getSelectedSidebarItem() {
    return selectedSidebarItem;
}

export function getSidebarItemById(projectId) {
    for(let i = 0; i < sidebarItems.length; i++) {
        if(sidebarItems[i].id == projectId) {
            return sidebarItems[i];
        }
    }
}

export default SidebarItem;