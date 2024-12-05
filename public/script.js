const apiUrl = "http://localhost:3000/users";
const form = document.querySelector("form");
const selectBtn = document.getElementById("selectBtn");
const deleteBtn = document.getElementById("deleteBtn");

async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const users = await response.json();
    const dataListBody = document.querySelector("#dataList tbody");
    dataListBody.innerHTML = "";

    users.forEach((user) => {
      const newRow = document.createElement("tr");
      newRow.dataset.id = user.id;

      newRow.innerHTML = `
        <td class="selectColumn hidden">
          <input type="checkbox" class="selectCheckbox" disabled>
        </td>
        <td>${user.name}</td>
        <td>${user.age}</td>
      `;
      dataListBody.appendChild(newRow);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

async function addUserToDatabase(name, age) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age }),
    });

    if (response.ok) {
      fetchUsers();
    } else {
      alert("Failed to add user");
    }
  } catch (err) {
    console.error("Error adding user:", err);
  }
}

async function deleteUsersFromDatabase(selectedRows) {
  const idsToDelete = Array.from(selectedRows).map((checkbox) => {
    return checkbox.closest("tr").dataset.id;
  });

  try {
    await Promise.all(
      idsToDelete.map((id) =>
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        })
      )
    );

    fetchUsers();
  } catch (err) {
    console.error("Error deleting users:", err);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  addUserToDatabase(name, age);

  form.reset();
});

selectBtn.addEventListener("click", function () {
  const selectColumn = document.querySelectorAll(".selectColumn");
  const selectColumnHeader = document.getElementById("selectColumn");
  const checkboxes = document.querySelectorAll(".selectCheckbox");

  if (selectBtn.textContent === "Select") {
    selectColumn.forEach((column) => column.classList.remove("hidden"));
    selectColumnHeader.classList.remove("hidden");
    checkboxes.forEach((checkbox) => (checkbox.disabled = false));
    deleteBtn.disabled = false;
    selectBtn.textContent = "Deselect";
  } else {
    selectColumn.forEach((column) => column.classList.add("hidden"));
    selectColumnHeader.classList.add("hidden");
    checkboxes.forEach((checkbox) => (checkbox.disabled = true));
    deleteBtn.disabled = true;
    selectBtn.textContent = "Select";
  }
});

deleteBtn.addEventListener("click", function () {
  const selectedRows = document.querySelectorAll(".selectCheckbox:checked");

  if (selectedRows.length > 0) {
    deleteUsersFromDatabase(selectedRows);

    selectedRows.forEach((checkbox) => {
      checkbox.closest("tr").remove();
    });
  }

  const remainingRows = document.querySelectorAll("#dataList tbody tr");

  if (remainingRows.length === 0) {
    deleteBtn.disabled = true;
  } else {
    const anySelected =
      document.querySelectorAll(".selectCheckbox:checked").length > 0;
    deleteBtn.disabled = !anySelected;
  }

  if (
    document.querySelectorAll(".selectCheckbox").length === 0 ||
    !document.querySelector(".selectCheckbox:checked")
  ) {
    const selectColumn = document.querySelectorAll(".selectColumn");
    selectColumn.forEach((column) => column.classList.add("hidden"));

    const selectColumnHeader = document.getElementById("selectColumn");
    selectColumnHeader.classList.add("hidden");

    selectBtn.textContent = "Select";
  }
});

fetchUsers();
