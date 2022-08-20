const tableBody = document.querySelector("tbody");
const alert = document.querySelector(".alert");
const modal = document.querySelector("#my-modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector("#submit-btn");
const form = document.querySelector("#form");

async function getUsers() {
  const url = "https://6300279d34344b643105731e.mockapi.io/api/v1/users";
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
  createUsersTable(data);
}
getUsers();

function createUsersTable(users) {
  tableBody.innerHTML = "";

  for (let user of users) {
    const { id, fname, lname, age, email, title, avatar } = user;
    const validAvatarURL = avatar.startsWith("http")
      ? avatar
      : "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1220.jpg";

    const userRow = `
     <tr>
        <td>${id}</td>
        <td><img class='avatar' src=${validAvatarURL}/></td>
        <td>${fname}</td>
        <td>${lname}</td>
        <td>${title}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>
        <button onclick="editUser(${id})" onclick="editUser()" class="edit-btn">Edit</button>
        <button onclick="deleteUser(${id})" class="delete-btn">Delete</button>
        </td>
      </tr>
     `;

    tableBody.innerHTML += userRow;
  }
}

//fetch with DELETE method-delete
async function deleteUserFromApi(id) {
  const url = `https://6300279d34344b643105731e.mockapi.io/api/v1/users/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.log("something went wrong", response);
  } else {
    getUsers();
  }
  const data = await response.json();
  console.log(data);
}

function editUser(id) {
  console.log(id);
  displayAlert("User information is edited", "alert-success");
}
function deleteUser(id) {
  deleteUserFromApi(id);
  displayAlert("User information is deleted", "alert-danger");
}
function addNewUserFn() {
  modal.style.display = "block";
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      title: e.target.title.value,
      age: e.target.age.value,
      avatar: e.target.avatar.value,
    };

    console.log(newUser);
    postNewUser(newUser);

    displayAlert("New User Information Is Added", "alert-success");
  });
}

async function postNewUser(newUser) {
  const url = "https://6300279d34344b643105731e.mockapi.io/api/v1/users/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    console.log("something went wrong", response);
  } else {
    getUsers();
  }
}

function displayAlert(message, color) {
  alert.innerHTML = message;
  alert.classList.add(color);
  setTimeout(() => {
    alert.innerHTML = "";
    alert.classList.remove(color);
  }, 2000);
}
