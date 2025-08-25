const productId = fetch('https://fakestoreapi.com/products/1')
  .then(response => response.json())
  .then(data => {
    const card = document.createElement('div');

    card.innerHTML = `
    <div>
      <button id='add'>+</button>
      <button id='favButton'>Fav</button>
    </div>
    <div class='cardContainer'>
      <div class='headContainer'>
        <h1 class='cardHeader'>${data.title}</h1>
      </div>
      <h2 class='cardInfo'>${data.category}</h2>
      <h2 class='cardInfo'>${data.price}</h2>
      <img width='100%' src='${data.image} '>
    </div>
    `
    card.style.border = '5px solid black';
    card.style.padding = '20px';
    card.style.width = 'fit-content';
    card.style.textAlign = 'center';

    productContainer.appendChild(card);
  });

 
