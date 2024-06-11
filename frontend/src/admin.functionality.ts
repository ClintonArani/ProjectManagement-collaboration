// div for displaying all users
let dynamic_body = document.querySelector(".dynamic-body") as HTMLDivElement;

//creating a project inorder to assign to user

let project_name = document.querySelector(".project_name") as HTMLInputElement;
let project_description = document.querySelector(
  ".project_description"
) as HTMLInputElement;
let project_end_date = document.querySelector(
  ".project_end_date"
) as HTMLInputElement;
let submitbtn = document.querySelector(".submit_button") as HTMLButtonElement;
let cancelbtn = document.querySelector(".cancel") as HTMLButtonElement;

// selection for create button
let new_project = document.querySelector(".button") as HTMLButtonElement;
let popup = document.querySelector(".promt-user-conatainer") as HTMLDivElement;

//Updating Functionalities

let update_display = document.querySelector('.promt-user-conatainer1') as HTMLDivElement;

let updated_project_name = document.querySelector(
  ".project_name1"
) as HTMLInputElement;
let updated_project_description = document.querySelector(
  ".project_description1"
) as HTMLInputElement;
let updated_project_end_date = document.querySelector(
  ".project_end_date1"
) as HTMLInputElement;
let updated_submitbtn = document.querySelector(
  ".submit_button1"
) as HTMLButtonElement;
let updated_cancelbtn = document.querySelector('.cancel1') as HTMLButtonElement;

new_project.addEventListener("click", () => {
  popup.style.display = "flex";
});

cancelbtn.addEventListener("click", () => {
  popup.style.display = "none";
});

submitbtn.addEventListener('click', (event) => {  

  let p_name = project_name.value.trim();
  let p_description = project_description.value.trim();
  let p_end_date = project_end_date.value.trim();

  let isValid = p_name != "" && p_description != "" && p_end_date != "";

  if (isValid) {
    let projectDetails = {
      project_name: p_name,
      project_description: p_description,
      project_end_date: p_end_date,
    };

    createProject(projectDetails);
    popup.style.display = "none";
    displayAllProjects();
  } else {
    //else block for if input is null
  }
});

async function createProject(new_project: {}) {
  try {
    let creation = await fetch('http://localhost:5300/projects/new-project', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(new_project)
    })
    if (creation.ok) {
      return creation.json()
    }
  } catch (error) {
    return {
      error: error
    }
  }
}


async function displayAllProjects() {
  try {
    let data = await fetch("http://localhost:5300/projects/all-projects", {
      headers: {
        "content-type": "application/json"
      },
      method: 'GET'
    })

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    let dataFetched = await data.json();

    let iterator = dataFetched.projects;
    

    let allDeleter = document.querySelectorAll(
      ".dynamic-body .activity-diagram"
    );
    allDeleter.forEach((div) => {
      div.remove();
    });    

    iterator.forEach((objectItem: any, index: number) => {
      
      let activityDiagram = document.createElement("div");
      activityDiagram.className = "activity-diagram";

      let numberHolder = document.createElement("div");
      numberHolder.className = "number-holder";

      let numberView = document.createElement("h2");
      numberView.textContent = `${index + 1}`;

      let name_holder = document.createElement("div");
      name_holder.className = "name_holder";

      let project_name = document.createElement("h2");
      project_name.textContent = objectItem.project_name;

      let description_holder = document.createElement("div");
      description_holder.className = "description_holder";

      let project_description = document.createElement("p");
      project_description.textContent = objectItem.project_description;

      let date_holder = document.createElement("div");
      date_holder.className = "date_holder";

      let end_date = document.createElement("p");
      end_date.textContent = objectItem.project_end_date;

      let assigned_to_holder = document.createElement("div");
      assigned_to_holder.className = "assigned_to_holder";

      let assigned_to = document.createElement("p");
      assigned_to.textContent = "... no assigned user yet ...";

      let buttons_holder = document.createElement("div");
      buttons_holder.className = "buttons_holder";

      let updatebtn = document.createElement("button");
      updatebtn.textContent = "Update";

      let deletebtn = document.createElement("button");
      deletebtn.textContent = "Delete";

      numberHolder.appendChild(numberView);
      name_holder.appendChild(project_name);
      description_holder.appendChild(project_description);
      date_holder.appendChild(end_date);
      assigned_to_holder.appendChild(assigned_to);
      buttons_holder.appendChild(updatebtn);
      buttons_holder.appendChild(deletebtn);

      activityDiagram.appendChild(numberHolder);
      activityDiagram.appendChild(name_holder);
      activityDiagram.appendChild(description_holder);
      activityDiagram.appendChild(date_holder);
      activityDiagram.appendChild(assigned_to_holder);
      activityDiagram.appendChild(buttons_holder);
      dynamic_body.appendChild(activityDiagram);

      deletebtn.addEventListener("click", () => {
        let myNuber = objectItem.project_id;
        deleteAnItem(myNuber);
        displayAllProjects()
      });

      updatebtn.addEventListener("click", () => {
        // first display the form then ...

        update_display.style.display = 'flex'

        updated_project_name.value = objectItem.project_name;
        updated_project_description.value = objectItem.project_description;
        updated_project_end_date.value = objectItem.project_end_date;

        //display

        updated_project_name.textContent = objectItem.project_name;
        updated_project_description.textContent =
          objectItem.project_description;
        updated_project_end_date.textContent = objectItem.project_end_date;

        updated_cancelbtn.addEventListener('click', () => {
          update_display.style.display = 'none'
        })

        updated_submitbtn.addEventListener('click', (e) => {
          
          e.preventDefault();

          console.log('i am clicked');
          let myId = objectItem.project_id;

          let u_project_name = updated_project_name.value.trim();
          let u_project_description = updated_project_description.value.trim();
          let u_project_end_date = updated_project_end_date.value.trim();

          let validator =
            u_project_name != "" &&
            u_project_description != "" &&
            u_project_end_date != "";

          if (validator) {
            let updatedObject = {
              project_name: u_project_name,
              project_description: u_project_description,
              project_end_date: u_project_end_date,
            };
            updateAnItem(myId, updatedObject);
            update_display.style.display = 'none';
            displayAllProjects();

          } else {
            console.log("//else clause lies here");
            
          }
        });
      });
    });
  } catch (error) {
    console.log("error fetching data from database");
  }
}

displayAllProjects();

function deleteAnItem(id: string) {
  let deletingVar = new Promise<any>(async (resolve, reject) => {
    try {
      let mainDeleter = await fetch(
        `http://localhost:5300/projects/delete-project/${id}`,
        {
          method: "DELETE",
        }
      );

      resolve(mainDeleter);

      if (mainDeleter.ok) {
        displayAllProjects();
      } else {
        console.log("There was an error in deleting the project");
      }
    } catch (error) {
      reject(`error`);
    }
  });
}

async function updateAnItem(myId: string, updatedObject: {}) {
  try {
    let result = await fetch(
      `http://localhost:5300/projects/update-project/${myId}`,
      {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedObject),
      }
    );

    if (result.ok) {
      console.log("project updated seccessfully");
    } else {
      console.log("project not updated, please try again ...");
    }
  } catch (error) {
    console.log("Error connecting to the server ...");
  }
}
//
