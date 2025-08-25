const favorited = JSON.parse(localStorage.getItem('favoritedProduct')) || [];

const renderFavorite = (items) => {
    
    items.forEach((product)=>{
        const favCard = document.createElement('div');
        console.log(product);
       favCard.innerHTML = `
        <div id='favCardContainer'>
            <div id='favImageContainer'>
                <img src=${product.image}>
            </div>
            <div id='favInfo'>
                <h2>${product.title}</h2>
                <h2>${product.price}</h2>
            </div>
        </div>`;
        favoriteDisplay.appendChild(favCard);
    });
};

if(favorited.length > 0) { renderFavorite(favorited) };

