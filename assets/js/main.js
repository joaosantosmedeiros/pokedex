const pokemonsList = document.querySelector('.pokemons');
const loadMoreButton = document.querySelector('#more-button');
const limit = 10;
let offset = 0;
const maxRecords = 151;

const loadMorePokemons = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => `
      <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail" >
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>

          <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
      </li>
    `).join("");

    pokemonsList.innerHTML += newHtml;
  });
}

loadMorePokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadMorePokemons(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }else{
    loadMorePokemons(offset, limit);
  }

})
