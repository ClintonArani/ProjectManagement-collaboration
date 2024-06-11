
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



//extracting data from database and displaying it into project table
interface Project {
    project_name: string;
    project_description: string;
    project_end_date: string;
    project_assigned: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const projectTableBody = document.querySelector<HTMLTableSectionElement>('#projectTable tbody');

    if (!projectTableBody) {
        console.error('Project table body not found');
        return;
    }

    console.log('Project table body found, proceeding to fetch projects...');

    const fetchProjects = async (): Promise<void> => {
        try {
            console.log('Fetching projects...');
            const response = await fetch('http://localhost:5300/projects/all-projects', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            const projects: Project[] = data.projects;  // Adjust based on the actual response structure

            console.log('Projects fetched successfully:', projects);
            populateProjectTable(projects);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const populateProjectTable = (projects: Project[]): void => {
        console.log('Populating project table...');
        projectTableBody.innerHTML = ''; // Clear any existing rows
        projects.forEach(project => {
            console.log('Adding project to table:', project);
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = project.project_name;
            row.appendChild(nameCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = project.project_description;
            row.appendChild(descriptionCell);

            const endDateCell = document.createElement('td');
            endDateCell.textContent = project.project_end_date;
            row.appendChild(endDateCell);

            const assignedCell = document.createElement('td');
            assignedCell.textContent = project.project_assigned ? 'Yes' : 'No';
            row.appendChild(assignedCell);

            projectTableBody.appendChild(row);
        });
    };

    fetchProjects();
});



//extracting data from database and displaying it into user table
interface User {
    id: string;
    FirstName: string;
    LastName: string;
    phone_number: string;
    email: string;
    user_image: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.querySelector<HTMLTableSectionElement>('#userTable tbody');

    if (!userTableBody) {
        console.error('User table body not found');
        return;
    }

    console.log('User table body found, proceeding to fetch users...');

    const fetchUsers = async (): Promise<void> => {
        try {
            console.log('Fetching users...');
            // Include query parameter 'limit=5' to limit the number of records fetched to 5
            const response = await fetch('http://localhost:5300/users/all-users?limit=3', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            const users: User[] = data.users;

            console.log('Users fetched successfully:', users);
            populateUserTable(users);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const populateUserTable = (users: User[]): void => {
        console.log('Populating user table...');
        userTableBody.innerHTML = ''; // Clear any existing rows
        users.forEach(user => {
            console.log('Adding user to table:', user);
            const row = document.createElement('tr');

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = user.FirstName; // Adjust property name
            row.appendChild(firstNameCell);

            const lastNameCell = document.createElement('td');
            lastNameCell.textContent = user.LastName; // Adjust property name
            row.appendChild(lastNameCell);

            const phoneNumberCell = document.createElement('td');
            phoneNumberCell.textContent = user.phone_number; // Adjust property name
            row.appendChild(phoneNumberCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            const userImageCell = document.createElement('td');
            const userImage = document.createElement('img');
            userImage.src = user.user_image; // Adjust property name
            userImage.alt = 'User Image';
            userImage.style.width = '40px'; // Set width
            userImage.style.height = '40px'; // Set height
            userImageCell.appendChild(userImage);
            row.appendChild(userImageCell);

            userTableBody.appendChild(row);
        });
    };

    fetchUsers();
});
interface User {
    id: string;
    FirstName: string;
    LastName: string;
    phone_number: string;
    email: string;
    user_image: string;
}

interface Project {
    id: string;
    projectName: string; // Ensure that projectName is correctly defined
    description: string;
    endDate: string;
    assigned: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const userDropdown = document.getElementById('users') as HTMLSelectElement;
    const projectDropdown = document.getElementById('projects') as HTMLSelectElement;

    if (!userDropdown || !projectDropdown) {
        console.error('Dropdown elements not found');
        return;
    }

    console.log('Dropdown elements found, proceeding to fetch data...');

    const fetchUsers = async (): Promise<void> => {
        try {
            console.log('Fetching users...');
            const response = await fetch('http://localhost:5300/users/all-users?limit=5');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            const users: User[] = data.users;
            console.log('Users fetched successfully:', users);
            populateUserDropdown(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProjects = async (): Promise<void> => {
        try {
            console.log('Fetching projects...');
            const response = await fetch('http://localhost:5300/projects/all-projects?limit=5');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            const projects: Project[] = data.projects;
            console.log('Projects fetched successfully:', projects);
            populateProjectDropdown(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const populateUserDropdown = (users: User[]): void => {
        console.log('Populating user dropdown...');
        userDropdown.innerHTML = '';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.FirstName} ${user.LastName}`;
            userDropdown.appendChild(option);
        });
    };

    const populateProjectDropdown = (projects: Project[]): void => {
        console.log('Populating project dropdown...');
        projectDropdown.innerHTML = '';
        projects.forEach(project => {
            console.log('Adding project to dropdown:', project);
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.projectName;
            projectDropdown.appendChild(option);
        });
    };
    

    fetchUsers();
    fetchProjects();
});
