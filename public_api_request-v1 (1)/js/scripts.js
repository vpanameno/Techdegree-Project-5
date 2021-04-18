//API
randomPeopleUrl = "https://randomuser.me/api/?results=12&nat=us";

//Create HTML elements that will go on the page once you finish fetching your info
const galleryDiv = document.getElementById("gallery");

function getPeopleInfo(url) {
  return fetch(url) //fetching - this returns a promise// once completed it goes to then() and executes what's in its call back
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      galleryHTML(data.results);
      modalAppear(data.results);
    })
    .catch(err => console.log("Error Fetching Random People: ", err)); //catches error if the API has failed to process;
}

function galleryHTML(data) {
  data.map(person => {
    person = ` <div class="card">
          <div class="card-img-container">
            <img class="card-img" src="${person.picture.thumbnail}" alt="profile picture">
            </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
            </div>`;
    galleryDiv.insertAdjacentHTML("beforeend", person);
  });
}

//create a modal window with the info fetched from the API
function modalHTML(data) {
  modal = `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${data.picture.thumbnail}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
              <p class="modal-text">${data.email}</p>
              <p class="modal-text cap">${data.location.street.number} ${data.location.street.name}. ${data.location.city}, ${data.location.state}</p>
              <hr>
              <p class="modal-text">${data.phone}</p>
              <p class="modal-text">${data.location.city}</p>
              <p class="modal-text">${data.dob.date}</p>
          </div>
      </div>`;
  galleryDiv.insertAdjacentHTML("afterend", modal);
  const button = document.querySelector("#modal-close-btn");
  const modalContainer = document.querySelector(".modal-container");

  button.addEventListener("click", event => {
    modalContainer.remove();
  });
}

//event listener that will listen to each individual box click and only show that info
function modalAppear(data) {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i += 1) {
    cards[i].addEventListener("click", event => {
      modalHTML(data[i]);
    });
  }
}

getPeopleInfo(randomPeopleUrl);
