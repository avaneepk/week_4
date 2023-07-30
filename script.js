document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const inputShow = document.getElementById("input-show").value.trim();
    if (inputShow !== "") {
      fetch(`https://api.tvmaze.com/search/shows?q=${inputShow}`)
        .then((response) => response.json())
        .then((data) => {
          const showsContainer = document.getElementById("shows-container");
          showsContainer.innerHTML = "";
          data.forEach((item) => {
            const showDataDiv = document.createElement("div");
            showDataDiv.classList.add("show-data");

            const imgElement = document.createElement("img");
            imgElement.src = item.show.image
              ? item.show.image.medium
              : "no-image.png";

            const showInfoDiv = document.createElement("div");
            showInfoDiv.classList.add("show-info");

            const h1Element = document.createElement("h1");
            h1Element.textContent = item.show.name;

            const pElement = document.createElement("p");
            pElement.innerHTML = item.show.summary;

            showInfoDiv.appendChild(h1Element);
            showInfoDiv.appendChild(pElement);

            showDataDiv.appendChild(imgElement);
            showDataDiv.appendChild(showInfoDiv);

            showsContainer.appendChild(showDataDiv);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  });
