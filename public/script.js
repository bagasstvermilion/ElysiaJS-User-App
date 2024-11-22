document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (name && age) {
      fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      })
        .then((response) => response.json())
        .then((data) => {
          const dataTable = document.querySelector("#dataList tbody");
          const row = document.createElement("tr");

          row.innerHTML = `<td>${data.name}</td><td>${data.age}</td>`;
          dataTable.appendChild(row);

          document.getElementById("name").value = "";
          document.getElementById("age").value = "";
        });
    }
  });
