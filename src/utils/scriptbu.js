const form = document.getElementById("form");
const selectBtn = document.getElementById("selectBtn");
const deleteBtn = document.getElementById("deleteBtn");
const dataListBody = document.querySelector("#dataList tbody");

let isSelectMode = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="selectColumn ${
      isSelectMode ? "" : "hidden"
    }"><input type="checkbox" class="selectCheckbox" ${
    isSelectMode ? "" : "disabled"
  }></td>
    <td>${name}</td>
    <td>${age}</td>
  `;

  if (dataListBody.firstChild) {
    dataListBody.insertBefore(newRow, dataListBody.firstChild);
  } else {
    dataListBody.appendChild(newRow);
  }

  form.reset();
});

selectBtn.addEventListener("click", function () {
  const selectColumn = document.querySelectorAll(".selectColumn");
  const selectColumnHeader = document.getElementById("selectColumn");
  const checkboxes = document.querySelectorAll(".selectCheckbox");

  isSelectMode = !isSelectMode;

  if (isSelectMode) {
    selectColumn.forEach((column) => column.classList.remove("hidden"));
    checkboxes.forEach((checkbox) => (checkbox.disabled = false));
    selectColumnHeader.classList.remove("hidden");
    deleteBtn.disabled = false;
    selectBtn.textContent = "Deselect";
  } else {
    selectColumn.forEach((column) => column.classList.add("hidden"));
    checkboxes.forEach((checkbox) => (checkbox.disabled = true));
    selectColumnHeader.classList.add("hidden");
    deleteBtn.disabled = true;
    selectBtn.textContent = "Select";
  }
});

deleteBtn.addEventListener("click", function () {
  const selectedRows = document.querySelectorAll(".selectCheckbox:checked");
  selectedRows.forEach((checkbox) => {
    checkbox.closest("tr").remove();
  });

  if (document.querySelectorAll(".selectCheckbox").length === 0) {
    const selectColumn = document.querySelectorAll(".selectColumn");
    selectColumn.forEach((column) => column.classList.add("hidden"));

    const selectColumnHeader = document.getElementById("selectColumn");
    selectColumnHeader.classList.add("hidden");

    deleteBtn.disabled = true;
    selectBtn.textContent = "Select";
    isSelectMode = false;
  }
});
