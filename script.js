
let myLibrary = []; //declare the myLibrary list which is the list for the books

function Book(title, author, pages, read) { //constructor for book object
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function (){
    return `${title}, ${author}, ${pages}, ${pages} `;
  }
}

const addBook = document.querySelector("#addBook");  //event listener for button that adds books 
addBook.addEventListener("click", () =>  {
    let title = prompt("Enter the book title"); //prompts user for information
    let author = prompt("Enter the book author"); 
    let pages = prompt("Enter the number of pages for the book"); 
    let read = ""
    let temp = true
    while (temp == true) {
        read = prompt("Have you read this book? (yes or no only)"); //error handling for incorrect info
        if (read == "no" || read == "yes"){
            temp = false;
        }
    }
    if (read == "yes") { //value for variables is affected by user answers
        read = "Read"
    } else {
        read = "Not read"
    }

    const book = new Book(title, author, pages, read); //new book is created and added to list
    myLibrary.push(book);
    createLibrary(); //library is created
    return;
});



function createLibrary() {

    currentVal = myLibrary.length -1; //current value determines which item in the array is being added to the list
    
    const container = document.querySelector('#container'); //container is selected

    const title = document.createElement('div');  //all of the different elements are added to the library
    title.classList.add('gridBox');
    title.textContent = myLibrary[currentVal].title;

    const author = document.createElement('div');
    author.classList.add('gridBox');
    author.textContent = myLibrary[currentVal].author;

    const pages = document.createElement('div');
    pages.classList.add('gridBox');
    pages.textContent = myLibrary[currentVal].pages;

    const read = document.createElement('button');
    read.classList.add('gridBox', 'read');
    read.dataset.number = currentVal;
    read.textContent = myLibrary[currentVal].read; 
    read.addEventListener('mousedown', () => {  //if the read button is clicked, the value in it switches
        let number = read.dataset.number;
        myLibrary[number].switchStatus();
        const gridBox = Array.from(document.querySelectorAll('.gridBox'));
        gridBox[(number*5)+8].textContent = myLibrary[number].read; //text is updated depending on the data value of the read grid box

        
    })

    const delButton = document.createElement('button');
    delButton.classList.add('gridBox','delButton');
    delButton.dataset.number = currentVal;
    delButton.innerHTML = "Delete"
    delButton.addEventListener('mousedown', () => { //when the delete button is pressed, all elements in that row are deleted
        let number = delButton.dataset.number; //the program knows what elements to delete due to the data property
        myLibrary.splice(number,1); //element is removed from the array
        const gridBox = Array.from(document.querySelectorAll('.gridBox'));  //the data values in the read and delete buttons lists are changed to accomodate
        const delButtonList = Array.from(document.querySelectorAll('.delButton'));
        const readList = Array.from(document.querySelectorAll('.read'));
        for (i = number; i < delButtonList.length; i++) {
            delButtonList[i].dataset.number--;
            readList[i].dataset.number--;
        }
        for (i = 5; i <10; i++) {
            container.removeChild(gridBox[(number*5)+i])
        }

        
    })

    container.appendChild(title);  //all elements are added to the container
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(read);
    container.appendChild(delButton);
    
    
    
    
    
}


Book.prototype.switchStatus = function () { //function that handles the switch in the read element when clicked
    
    if (this.read == "Read") {
        this.read = "Not read"
    } else {
        this.read = "Read";
    }
  };


