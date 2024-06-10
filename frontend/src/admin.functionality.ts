// div for displaying all users
let dynamic_body = document.querySelector(".dynamic-body") as HTMLDivElement;

//creating a project inorder to assign to user
function displayAll() {
  let pr = new Promise(async (resolve, reject) => {
    let x = await fetch("http://localhost:5302/projects/all-projects")
      
    console.log(x.json());
    
  });
}

displayAll();

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

new_project.addEventListener("click", () => {
  popup.style.display = "flex";
});

cancelbtn.addEventListener("click", () => {
  popup.style.display = "none";
});

submitbtn.addEventListener("submit", (event) => {
  console.log("I am clicked");

  let p_name = project_name.value.trim();
  let p_description = project_name.value.trim();
  let p_end_date = project_name.value.trim();

  let isValid = p_name != "" && p_description != "" && p_end_date != "";

  if (isValid) {
    let projectDetails = {
      project_name: p_name,
      project_description: p_description,
      project_end_date: p_end_date,
    };

    createNewProject(projectDetails);
  } else {
    //else block for if input is null
  }
});


async function displayAllProjects() {
  try {
    let data = await fetch("http://localhost:5302/projects/all-projects", {
      headers: {
        "content-type": "application/json"
      },
      method: 'GET'
    })

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    let dataFetched = await data.json();

    let allDeleter = document.querySelectorAll(
      ".dynamic-body .activity-diagram"
    );
    allDeleter.forEach((div) => {
      div.remove();
    });

    dataFetched.forEach((objectItem: any, index: number) => {
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
      assigned_to.textContent = "......";

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
      });

      updatebtn.addEventListener("click", () => {
        let myId = objectItem.project_id;
        // first display the form then ...

        let updated_project_name = document.querySelector(
          ".project_name"
        ) as HTMLInputElement;
        let updated_project_description = document.querySelector(
          ".project_description"
        ) as HTMLInputElement;
        let updated_project_end_date = document.querySelector(
          ".project_end_date"
        ) as HTMLInputElement;
        let updated_submitbtn = document.querySelector(
          ".submit_button"
        ) as HTMLButtonElement;

        //display

        updated_project_name.textContent = objectItem.project_name;
        updated_project_description.textContent =
          objectItem.project_description;
        updated_project_end_date.textContent = objectItem.project_end_date;

        updated_submitbtn.addEventListener("submit", (e) => {
          e.preventDefault();

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
          } else {
            //else clause lies here
          }
        });
      });
    });
  } catch (error) {
    console.log("error fetching data from database");
  }
}

function deleteAnItem(id: string) {
  let deletingVar = new Promise<any>(async (resolve, reject) => {
    try {
      let mainDeleter = await fetch(
        `http://localhost:5302/projects/delete-project/${id}`,
        {
          method: "DELETE",
        }
      );

      resolve(mainDeleter);

      if (mainDeleter.ok) {
        // displayAllProjects();
      } else {
        console.log("There was an error in deleting the project");
      }
    } catch (error) {
      reject(`error`);
    }
  });
}

async function createNewProject(project: any) {
  try {
    let response = await fetch("http://localhost:5302/projects/new-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    }).then((res) => {
      res.json();
    });
  } catch (error) {
    console.log("Error creating a project.");
  }
}

async function updateAnItem(myId: string, updatedObject: {}) {
  try {
    let result = await fetch(
      `http://localhost:5302/projects/update-project/${myId}`,
      {
        method: "POST",
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
