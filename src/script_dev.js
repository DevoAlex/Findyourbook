import axios from 'axios';

let arrayLibri =[]; //the array where i will put the book list

//writing the function to call OpenLibrary API 
let select = document.getElementById("srcCollectionInput");

   async function requestSubjectData() {
     output.innerHTML="";
     let url_libri = `https://openlibrary.org/subjects/${select.options[select.selectedIndex].value}.json`;
       try{
        arrayLibri = await axios.get (url_libri);
        let axiosLibri = arrayLibri.data.works;
        console.log(axiosLibri);
        //for loop to display the results of the array 
        for (let i=0; i<=12; i++) {
            document.getElementById("output").innerHTML+="<h2 id='title'>"+ axiosLibri[i].title + "</h2>";
            }
       } catch (e){
        console.log (e);
       } 
    }

//adding event listener to the button so he can call the function when pressed
  let srcButton = document.getElementById("srcBtn");

  srcButton.addEventListener('click', requestSubjectData);

