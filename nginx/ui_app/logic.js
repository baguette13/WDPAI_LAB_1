const url = "http://localhost:8000";

async function getItems() {
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    const users = data.user_list;
    displayUsers(users);
  } catch (error) {
    console.log(error);
  }
}

function displayUsers(users) {
  console.log(users);

  const userList = document.querySelector(".users-wrapper");
  userList.innerHTML = "";

  users.forEach((user) => {
    console.log(user);

    const wrapper = document.createElement("div");
    wrapper.classList.add("user-wrapper");

    const infosDiv = document.createElement("div");
    infosDiv.classList.add("user-wrapper-infos");
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = user.first_name + " " + user.last_name;
    nameDiv.classList.add("user-wrapper-infos-name");
    const functionDiv = document.createElement("div");
    functionDiv.innerHTML = user.role;
    functionDiv.classList.add("user-wrapper-infos-role");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
      deleteUser(user.id);
    };
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("material-icons");
    iconSpan.textContent = "delete";
    deleteButton.appendChild(iconSpan);

    infosDiv.appendChild(nameDiv);
    infosDiv.appendChild(functionDiv);
    wrapper.appendChild(infosDiv);
    wrapper.appendChild(deleteButton);
    userList.appendChild(wrapper);
  });
}

async function addUser(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const role = document.getElementById("role").value;

  const user = {
    first_name: firstName,
    last_name: lastName,
    role: role,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    const users = data.user_list;
    displayUsers(users);
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(userId) {
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    const users = data.user_list;
    displayUsers(users);
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("userForm").addEventListener("submit", addUser);
getItems();
