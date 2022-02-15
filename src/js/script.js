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
      bookFilters: '.filters',

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
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.bookContainer = document.querySelector('.books-list'); 
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = []; 
      thisBooksList.filters = [];
    }

    render(){
      const thisBooksList = this;
      
      for (let book of dataSource.books){
        const newObject = {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          rating: book.rating,
        };

        const generatedHTML = templates.books(newObject);
        const element = utils.createDOMFromHTML(generatedHTML); 
        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(element);
        thisBooksList.initActions(element);
      }
    }

    initActions(element){
      const thisBooksList = this;
     
      const bookImage = element.querySelector(select.containerOf.bookImage);
  
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookImage = event.target.offsetParent;
        const id = bookImage.getAttribute('data-id');
        if(!thisBooksList.favoriteBooks.includes(id)){
          thisBooksList.favoriteBooks.push(id);
          bookImage.classList.add('favorite');
        } else {
          bookImage.classList.remove('favorite');
        }
      });
      const bookFilter = element.querySelector(select.containerOf.bookFilters);

      bookFilter.addEventListener('click', function(callback){
        const clickedElem = callback.target;
        if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name == 'filters'){
          if(clickedElem.checked == true){
            bookFilter.push(clickedElem.value);
          } else {
            const indexValue = bookFilter.indexOf(clickedElem.value);
            bookFilter.splice(indexValue, 1);
          }
        }
      });
    }

    filterBooks() {
      const thisBooksList = this;
      for (let book of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of thisBooksList.filters){
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const filteredBooks = document.querySelector('.book__image[data-id="id-of-the-book-here"]');
        if(shouldBeHidden == true){
          filteredBooks.classList.add('hidden');
        }else {
          filteredBooks.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background;

      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8 ) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'inear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }  
}
  const app = new BooksList(); 
}

