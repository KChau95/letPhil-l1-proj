const computer = document.getElementById('computer');

let favorites = JSON.parse(localStorage.getItem('favoritedProduct')) || [];
let productList = [];
let favList = [];
let newList = [];

computer.addEventListener('change', () => {
  
  displayContainer.innerHTML = ``;

  //Ternary Operator to either get whole list or filter with the appropriate value
  newList = computer.value === 'All' ? productList : productList.filter((product)=> product.category === computer.value);

  renderCard(newList);
  });

const productId = fetch('productInfo.JSON')
  .then(response => response.json())
  .then(products => {productList = products;})


const renderCard = (products) =>{
    
    products.forEach (items => {
    const card = document.createElement('div');
    card.innerHTML = `
    <div>
      <button id='add'>+</button>
      <button class='favButton'>Fav</button>
    </div>
    <div class='cardContainer'>
      <div class='headContainer'>
        <h1 class='cardHeader'>${items.title}</h1>
      </div>
      <h2 class='cardInfo'>${items.category}</h2>
      <h2 class='cardInfo'>${items.price}</h2>
      <img width='100%' src='${items.image} '>
    </div>
    `
    card.classList.add('wholeCard');
    card.style.border = '3px solid black';
    card.style.padding = '20px';
    card.style.width = 'fit-content';
    card.style.textAlign = 'center';

    displayContainer.appendChild(card);

    const favButton = document.querySelectorAll('.favButton');
    favButton.forEach((fav, i)=>{
      fav.addEventListener('click', ()=>{
        let productSelect = newList[i];

        fav.textContent = 'unFav';
        favList.push(productSelect);
      
        favList = [... new Set(favList)]; 

        localStorage.setItem('favoritedProduct', JSON.stringify(favList));
    });});
    });};



 
