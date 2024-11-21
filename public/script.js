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
          const dataList = document.getElementById("dataList");
          const listItem = document.createElement("li");
          listItem.textContent = `Name: ${data.name}, Age: ${data.age}`;
          dataList.appendChild(listItem);

          document.getElementById("name").value = "";
          document.getElementById("age").value = "";
        });
    }
  });
