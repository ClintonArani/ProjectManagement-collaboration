
let select_projects = document.getElementById('projects') as HTMLSelectElement;
let select_users = document.getElementById('users') as HTMLSelectElement;

let projects_table = document.querySelector('.projects_table') as HTMLTableElement;
let users_table = document.querySelector('.users_table') as HTMLTableElement;

let assignbtn = document.querySelector('.assignbtn') as HTMLButtonElement;

let projectsbtn = document.getElementById('projectsButton') as HTMLButtonElement;



async function displayOnUsersDropdown() {
  try {
    let options = await fetch('http://localhost:5300/users/unsigned-users', {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    })

    let data = await options.json();   
    

    let display = data.users;
    

    let remover = document.querySelectorAll('#users .options');
    remover.forEach(option => {
      option.remove();
    });

    display.forEach((options: any) => {
      
      let option_created = document.createElement('option');
      option_created.className = "options";
      option_created.text = options.FirstName + ' ' + options.LastName;
      option_created.value = options.id;
      select_users.appendChild(option_created);
    });
  } catch (error) {
    
  }
}

displayOnUsersDropdown();

async function displayOnProjectDropdown() {
  try {
    let options = await fetch('http://localhost:5300/projects/unassigned-projects', {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    })

    let data = await options.json();
    

    let display = data.un_assigned_projects.response;
    

    let remover = document.querySelectorAll('#projects .options');
    remover.forEach(option => {
      option.remove();
    });

    display.forEach((options: any) => {
      
      let option_created = document.createElement('option');
      option_created.className = "options";
      option_created.text = options.project_name;
      option_created.value = options.project_id;
      select_projects.appendChild(option_created);
    });
  } catch (error) {
    
  }
}

displayOnProjectDropdown();

async function displayProjectsOnTables() {
  try {
    let options = await fetch('http://localhost:5300/projects/unassigned-projects', {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    })

    let data = await options.json();
    

    let display = data.un_assigned_projects.response;
    

    let allDeleter = document.querySelectorAll(
      ".projects_table .table_data"
    );
    allDeleter.forEach((div) => {
      div.remove();
    });
    

    display.forEach((objectItem: any, index: number) => { 
      

      let table_row = document.createElement('tr');
      
      let loop = [objectItem.project_name, objectItem.project_description, objectItem.project_end_date];
      for (let table_data = 0; table_data < 3; table_data++) {
        let tableData = document.createElement('td');
        tableData.className = 'table_data';
        tableData.textContent = loop[table_data];
        table_row.appendChild(tableData);
      }

      projects_table.appendChild(table_row);

    });
  } catch (error) {
    console.log("error fetching data from database");
  }
}

displayProjectsOnTables();

async function displayUsersOnTables() {
  try {
    let options = await fetch('http://localhost:5300/users/unsigned-users ', {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    })

    let data = await options.json();    

    let display = data.users;

    let allDeleter = document.querySelectorAll(
      ".projects_table .table_data"
    );
    allDeleter.forEach((div) => {
      div.remove();
    });
    

    display.forEach((objectItem: any, index: number) => { 
      

      let table_row = document.createElement('tr');
      
      let loop = [objectItem.FirstName, objectItem.LastName, objectItem.email];
      for (let table_data = 0; table_data < 3; table_data++) {
        let tableData = document.createElement('td');
        tableData.className = 'table_data';
        tableData.textContent = loop[table_data];
        table_row.appendChild(tableData);
      }

      users_table.appendChild(table_row);

    });
  } catch (error) {
    console.log("error fetching data from database");
  }
}

displayUsersOnTables();



async function AssignProjectFunction(project_id:string) {
  
  try {
    let assign = await fetch(`http://localhost:5300/projects/assign-project/${project_id}`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
    })
    if (assign.ok) {
      return assign.json();      
    }
  } catch (error) {
    return {
      error: error
    }
  }
}

async function AssignUserFunction(change: {}) {
  try {
    let changes = await fetch('http://localhost:5300/users/set-assigned', {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(change)
    })

    if (changes.ok) {
      return changes.json();
    }
  } catch (error) {
    return {
      error: error
    }
  }
}

function activateAssignButton() {
  assignbtn.addEventListener('click', () => {
    let user_id = select_users.value;
    let project_id = select_projects.value;
  
    let change = {
      user_id,
      project_id
    }
  
    console.log("user_id: " + user_id);
    console.log("project_assigned_to: " + project_id);
    
    AssignProjectFunction(project_id);
    AssignUserFunction(change);
  
    displayOnUsersDropdown();
    displayOnProjectDropdown();
    displayProjectsOnTables();
    displayUsersOnTables();
    
  })
}
activateAssignButton()

function activateProjectsButton() {
  projectsbtn.addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = '../frontend/admin.html';
    }, 2000);
  })
}

activateProjectsButton();