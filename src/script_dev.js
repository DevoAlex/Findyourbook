import axios from "axios";
import "./CSS/styles.css";
import search from "./img/search.png";
import bookImage from "./img/books-icon.png";
import linkedin from "./img/linkedin.png";
import instagram from "./img/instagram.png";
import github from "./img/github.png";

//Getting all ids for the images and divs
function loadAssets() {
  const srcImg = (document.getElementById("srcImg").src = search);
  const bookImg = (document.getElementById("bookImg").src = bookImage);
  const linkedinImage = (document.getElementById("linkedinImg").src = linkedin);
  const instagramImage = (document.getElementById("instagramImg").src = instagram);
  const githubImage = (document.getElementById("githubImg").src = github);
}

loadAssets();

const bookList = document.getElementById("bookList");

let booksArray = []; //the array where i will put the book list

//writing the function to call OpenLibrary API
const $form = document.getElementById("srcDiv");
//Using async function to fetch datas
async function requestSubjectData(event) {
  event.preventDefault();
  const queryText = document
    .getElementById("srcCollectionInput")
    .value.trim()
    .split(" ")
    .join("_");

  document
    .getElementById("spinner--container")
    .classList.add("spinner--visible");
  output.innerHTML = "";
  const urlBooks = `https://openlibrary.org/subjects/${queryText}.json`;
  try {
    booksArray = await axios.get(urlBooks);
    const axiosBooks = booksArray.data.works;
    bookList.innerHTML = "<h2>Book list</h2>";
    const outputDiv = document.getElementById("output");
    //Using a forEach loop to cycle the array and display a card for every element of it
    if (axiosBooks.length == 0) {
      outputDiv.innerHTML += "<h3>There are no books of this kind</h3>";
    } else {
      axiosBooks.forEach((bookData) => {
        getBookHTML(bookData);
      });
    }

    function getBookHTML(bookData) {
      //we're gonna modify the output div HTML with this function
      //using template literals to pick different cover IDs
      //and different titles and authors
      //i gave the button the key of the book as the id so i can use it later
      //to show the description of it
      outputDiv.innerHTML += `<div class="card mb-3" style="max-width: 740px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${bookData.cover_id}-M.jpg" class="img-fluid rounded-start" alt="Cover of the book">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">${bookData.title}</h3>
              <p class="card-text">author: ${bookData.authors[0].name}</p>
              <button id="${bookData.key}" class="description-button btn btn-success mt-3 text-center" data-bs-toggle="modal" data-bs-target="#descModal">See description</button>
            </div>
          </div>
        </div>
      </div>`;
    }

    bookDesc();
  } catch (e) {
    document.getElementById(
      "output"
    ).innerHTML += `Something went wrong: ${e.message}`;
    console.log(e);
  } finally {
    document
      .getElementById("spinner--container")
      .classList.remove("spinner--visible");
  }
}

$form.addEventListener("submit", requestSubjectData);

//This is the function that gets the key of the book
//for each element of the books array that we got previously
function bookDesc() {
  try {
    const outputDiv = document.getElementById("output");

    outputDiv.addEventListener("click", function (e) {
      if (e.target.classList.contains("description-button")) {
        let key = e.target.id;
        //and here it calls another function that I used to display the description
        //of the book with the given key
        displayBookDesc(key);
      }
    });
  } catch (e) {
    document.getElementById(
      "output"
    ).innerHTML += `Something went wrong: ${e.message}`;
    console.log(e);
  }
}

//this function is the one that shows the description in the modal that pops up
//when you click the "see description" button
async function displayBookDesc(key) {
  try {
    const url_description = `https://openlibrary.org${key}.json`;
    const description = await axios.get(url_description);
    //This if statement makes sure that if there's no description for a certain book
    //it shows a message that says it
    //otherwise if the description is under "description.value" or "description" it
    //shows it in the modal
    if (
      description.data.description == null ||
      description.data.description == undefined
    ) {
      document.getElementById("modal-body").innerHTML =
        "<p>There is no description available for this book!</p>";
    } else {
      description.data.description.value != null
        ? (document.getElementById("modal-body").innerHTML =
            "<p>" + description.data.description.value + "</p>")
        : (document.getElementById("modal-body").innerHTML =
            "<p>" + description.data.description + "</p>");
    }
  } catch (e) {
    document.getElementById(
      "modal-body"
    ).innerHTML += `Something went wrong: ${e.message}`;
    console.log(e);
  }
}
