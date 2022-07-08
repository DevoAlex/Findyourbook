import axios from 'axios';
import './CSS/styles.css';
import search from './img/search.png'
import bookImage from './img/books-icon.png'
import linkedin from './img/linkedin.png'
import instagram from './img/instagram.png'
import github from './img/github.png'

//Getting all ids for the images and divs
 const srcImg = document.getElementById ('srcImg');
 srcImg.src = search;

const bookImg = document.getElementById('bookImg');
bookImg.src = bookImage;

const linkedinImage = document.getElementById('linkedinImg');
linkedinImage.src = linkedin;

const instagramImage = document.getElementById('instagramImg');
instagramImage.src = instagram;

const githubImage = document.getElementById('githubImg');
githubImage.src = github;

const bookList = document.getElementById('bookList');



let arrayLibri =[]; //the array where i will put the book list

//writing the function to call OpenLibrary API 
let select = document.getElementById("srcCollectionInput");
//Using async function to fetch datas
   async function requestSubjectData() {
     output.innerHTML="";
     let url_libri = `https://openlibrary.org/subjects/${select.value}.json`;
       try{
        arrayLibri = await axios.get (url_libri);
        let axiosLibri = arrayLibri.data.works;
        bookList.innerHTML = "<h2>Book list</h2>";
        //Using a forEach loop to cycle the array and display a card for every element of it 
        if (axiosLibri.length == 0) {
          document.getElementById("output").innerHTML+= '<h3>There are no books of this kind</h3>'
        } else {
        axiosLibri.forEach(element => {
        //we're gonna modify the output div HTML with this function
        //using template literals to pick different cover IDs
        //and different titles and authors
        //i gave the button the key of the book as the id so i can use it later 
        //to show the description of it
        document.getElementById("output").innerHTML+=`<div class="card mb-3" style="max-width: 740px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_id}-M.jpg" class="img-fluid rounded-start" alt="Cover of the book">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">${element.title}</h3>
              <p class="card-text">author: ${element.authors[0].name}</p>
              <button id="${element.key}" class="description-button btn btn-success mt-3 text-center" data-bs-toggle="modal" data-bs-target="#descModal">See description</button>
            </div>
          </div>
        </div>
      </div>`
       })
      } 
       bookDesc();
     
        } catch (e){
         console.log (e);
        } 
    }

    
//Adding event listener to the button so he can call the function when pressed
  let srcButton = document.getElementById("srcBtn");
  srcButton.addEventListener('click', requestSubjectData);
  select.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
      requestSubjectData();
    }
  });

//This is the function that gets the key of the book
//for each element of the books array that we got previously
  async function bookDesc(){
    try{
      const descBtn = document.querySelectorAll(".description-button");
      
      descBtn.forEach((button) => {
        button.addEventListener('click', (e) =>{
         let key = e.target.id;
//and here it calls another function that I used to display the description 
//of the book with the given key 
           displayBookDesc(key);
       })
      })
      
    } catch(e){
      console.log (e);
    }
  };

//this function is the one that shows the description in the modal that pops up
//when you click the "see description" button
   async function displayBookDesc(key){
    try{
     const url_description = `https://openlibrary.org${key}.json`;
       let description = await axios.get (url_description);
//This if statement makes sure that if there's no description for a certain book 
//it shows a message that says it
//otherwise if the description is under "description.value" or "description" it
//shows it in the modal
       if (description.data.description == null || description.data.description == undefined) {
        document.getElementById("modal-body").innerHTML =
          "<p>There is no description available for this book!</p>";
      } else {
        description.data.description.value != null
          ? (document.getElementById("modal-body").innerHTML =
              "<p>" + description.data.description.value + "</p>")
          : (document.getElementById("modal-body").innerHTML =
          "<p>" + description.data.description + "</p>");
      }
   } catch(e){
    console.log (e);
  }
}


     

