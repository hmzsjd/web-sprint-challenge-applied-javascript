import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const headlineDiv = document.createElement("div");
  headlineDiv.classList.add("headline");

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img-container");

  const image = document.createElement("img");

  const authorSpan = document.createElement("span");

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  authorDiv.appendChild(authorSpan);
  imgDiv.appendChild(image);

  headlineDiv.textContent = article.headline;

  image.src = article.authorPhoto;

  authorSpan.textContent = "By " + article.authorName;

  cardDiv.addEventListener('click', function(){
    console.log(article.headline);
  })

  return cardDiv;

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  const elementToAppend3 = document.querySelector(selector);


  axios.get("http://localhost:5000/api/articles")
  .then(resp => {
    
    function topicAppender(topic) {
      for (let i = 0; i < topic.length; i++) {
        elementToAppend3.appendChild(Card(topic[i]));
      }
    }


    topicAppender(resp.data.articles.javascript);
    topicAppender(resp.data.articles.bootstrap);
    topicAppender(resp.data.articles.technology);
    topicAppender(resp.data.articles.jquery);
    topicAppender(resp.data.articles.node);



    // const articleArr = Object.entries(resp.data.articles);
    // console.log(articleArr);

    // for (let i=0; i < articleArr.length; i++) {
    //   const articleName = articleArr[i][0];
    //   for (let j=0; j < articleArr[i].length; j++) {
    //     elementToAppend3.appendChild(Card(articleName))
    //   }
    // }
   
    // for (let i = 0; i < resp.data.articles.javascript.length; i++){
    //   elementToAppend3.appendChild(Card(resp.data.articles.javascript[i]))
    // }
  }).catch(err => {
    console.error(err);
  });



}

export { Card, cardAppender }
