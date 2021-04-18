/*TechDegree Project 5: Public API Request*/

//API returns has 12 results
randomPeopleUrl = "https://randomuser.me/api/?results=12&nat=us";

//Select element that will be used to insert HTML elements created dynamically
const galleryDiv = document.getElementById("gallery");

/*Function getPeopleInfo uses fetch to get the 12 results from random user
generator, then the data is parsed into JSON, and then is used to call out other functions*/

function getPeopleInfo(url) {
  return fetch(url)
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
            <img class="card-img" src="${person.picture.medium}" alt="profile picture">
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

/*Function below does a few things - it reformats both the phone number and birthday.
It also creates the modal HTML when the date is passed from the modalAppear function
It also makes the button "clickable" and removes the modal when clicked*/

function modalHTML(personData) {
  //Formatting Birthday below

  let birthday = new Date(personData.dob.date);
  let newBirthday =
    ("0" + (birthday.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + birthday.getUTCDate()).slice(-2) +
    "/" +
    birthday.getUTCFullYear();

  //Formatting Phone Number below
  let phone = personData.phone;
  let phoneNumber = phone.replace(
    /^\((\d{3})\)\D(\d{3})-(\d{4})/,
    "($1) $2-$3"
  );

  //Creating the Modal HTML using the provided html code
  modal = `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src="${personData.picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${personData.name.first} ${personData.name.last}</h3>
              <p class="modal-text">${personData.email}</p>
              <p class="modal-text cap">${personData.location.street.number} ${personData.location.street.name}. ${personData.location.city}, ${personData.location.state}</p>
              <hr>
              <p class="modal-text">${phoneNumber}</p>
              <p class="modal-text">${personData.location.city}, ${personData.location.state}</p>
              <p class="modal-text">Birthday: ${newBirthday}</p>
          </div>
      </div>`;
  galleryDiv.insertAdjacentHTML("afterend", modal);

  //Below we select the button and remove the modal once button is clicked
  const button = document.querySelector("#modal-close-btn");
  const modalContainer = document.querySelector(".modal-container");

  button.addEventListener("click", event => {
    modalContainer.remove();
  });
}

/*Function below selects all of the card HTML elements and iterates over each one
 and when one of those cards is clicked the modalHTML is called and passed
 the data pertaining to that specific person to display
 */

function modalAppear(modalData) {
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i += 1) {
    cards[i].addEventListener("click", event => {
      modalHTML(modalData[i]);
    });
  }
}

getPeopleInfo(randomPeopleUrl);
