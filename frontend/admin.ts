const modal = document.getElementById("myModal") as HTMLElement

const btn = document.getElementById("projectsButton") as HTMLButtonElement;


const span = document.getElementsByClassName("close")[0] as HTMLElement;

btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event: MouseEvent) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function getSelectedCheckboxes(name: string): string[] {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`) as NodeListOf<HTMLInputElement>;
    const selectedValues: string[] = [];
    checkboxes.forEach((checkbox) => {
        selectedValues.push(checkbox.value);
    });
    return selectedValues;
}


const selectedUsers = getSelectedCheckboxes("selectUser");
const selectedProjects = getSelectedCheckboxes("selectProject");
console.log(selectedUsers, selectedProjects);
