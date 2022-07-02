import axios from 'axios';
import './CSS/styles.css';
import search from './img/search.png'
import bookImage from './img/books-icon.png'

//Getting all ids for the images and divs
const srcImg = document.getElementById ('srcImg');
srcImg.src = search;

const bookImg = document.getElementById('bookImg');
bookImg.src = bookImage;

const bookList = document.getElementById('bookList');


let arrayLibri =[]; //the array where i will put the book list

//writing the function to call OpenLibrary API 
let select = document.getElementById("srcCollectionInput");
//Using async function to fetch datas
   async function requestSubjectData() {
     output.innerHTML="";
     let url_libri = `https://openlibrary.org/subjects/${select.options[select.selectedIndex].value}.json`;
       try{
        arrayLibri = await axios.get (url_libri);
        let axiosLibri = arrayLibri.data.works;
        console.log(arrayLibri.data);
        bookList.innerHTML = "<h2>Book list</h2>";
        //Using a for loop to display the results of the array 
        for (let i=0; i<=12; i++) {
            document.getElementById("output").innerHTML+="<h3>"+ axiosLibri[i].title + "</h3>" + "<h3>"+ axiosLibri[i].authors[0].name + "</h3><br>";
            };
       } catch (e){
        console.log (e);
       } 
    }

//Adding event listener to the button so he can call the function when pressed
  let srcButton = document.getElementById("srcBtn");

  srcButton.addEventListener('click', requestSubjectData);

