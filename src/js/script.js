/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  
  const select = {
    templateOf: {
      books: '#template-book',     
    },

    containerOf: {
      bookList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };
  
  class BooksList{
    constructor(){
      const thisBooksList = this;
      thisBooksList.getElements();
      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.initAction();
      
      
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector('.books-list');
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = []; 

    }

    render(){
      const thisBooksList = this;
      
      for (let book of dataSource.books){
        const newObject = {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image
        };

        const generatedHTML = templates.books(newObject);
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML); 
        const bookContainer = document.querySelector(select.containerOf.books);
        bookContainer.appendChild(thisBooksList.element);
      }
    }

    initActions(){
      const thisBooksList = this;
      //?

      thisBooksList.element.addEventListener('dblclick', function(event){
        event.preventDefault();
      });
      

    }
    

     
  }

}