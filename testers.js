let openPopover = null; // track the currently open popover (if any)

function closeOpenPopover() {
  if (openPopover) {
    openPopover.remove();
    openPopover = null;
  }
}

const renderCard = (products) => {
  products.forEach((items) => {
    const card = document.createElement('div');

    card.innerHTML = `
      <div>
        <button id='add'>+</button>
        <button class='favButton'>Fav</button>
        <button class='infoButton'>Info</button>
      </div>
      <div class='cardContainer'>
        <div class='headContainer'>
          <h1 class='cardHeader'>${items.title}</h1>
        </div>
        <h2 class='cardInfo'>${items.category}</h2>
        <h2 class='cardInfo'>$${Number(items.price).toFixed(2)}</h2>
        <img width='100%' src='${items.image}' alt='${items.title}'>
      </div>
    `;

    card.classList.add('wholeCard');
    card.style.border = '3px solid black';
    card.style.padding = '20px';
    card.style.width = 'fit-content';
    card.style.textAlign = 'center';
    card.style.position = 'relative'; // needed so the popover can anchor to this card

    displayContainer.appendChild(card);

    // --- Fav button (kept similar to your code, but scoped to this card) ---
    const favBtn = card.querySelector('.favButton');
    favBtn.addEventListener('click', () => {
      favBtn.textContent = 'unFav';
      favList.push(items);
      favList = [...new Set(favList)];
      localStorage.setItem('favoritedProduct', JSON.stringify(favList));
    });

    // --- Info button: builds & toggles the mini window ---
    const infoBtn = card.querySelector('.infoButton');
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // close any other open popover first
      if (openPopover && openPopover.closest('.wholeCard') !== card) {
        closeOpenPopover();
      }

      // if this card already has one, toggle it off
      const existing = card.querySelector('.info-popover');
      if (existing) {
        existing.remove();
        openPopover = null;
        return;
      }

      // build the popover content
      const pop = document.createElement('div');
      pop.className = 'info-popover';
      pop.innerHTML = `
        <button class="close" aria-label="Close">×</button>
        <h4>${items.title}</h4>
        <div class="row">
          <div class="muted">${items.category ?? ''}</div>
          <div class="price">$${Number(items.price).toFixed(2)}</div>
        </div>
        <p class="muted">${items.description ? items.description : 'High-quality product with great value.'}</p>
      `;

      // add handlers
      pop.querySelector('.close').addEventListener('click', (ev) => {
        ev.stopPropagation();
        pop.remove();
        openPopover = null;
        infoBtn.focus();
      });

      // show
      card.appendChild(pop);
      openPopover = pop;
      pop.querySelector('.close').focus();
    });
  });
};
