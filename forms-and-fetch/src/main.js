import { getRandomPokemon } from "./fetch-helpers";
import { renderPokemon } from "./dom-helpers";
import { renderError } from "./dom-helpers";
import { renderSuccess } from "./dom-helpers";
const discoverButton = document.querySelector('#discover-button')


const getAndRenderPokemon = async () => {
  const pokemon = await getRandomPokemon();
  if (pokemon.error) {
    renderError(pokemon.error)
    return;
  }
  renderPokemon(pokemon.data);
  renderSuccess(`${pokemon.data.name} was discovered!`)
}

getAndRenderPokemon();

discoverButton.addEventListener('click', () => {
  getAndRenderPokemon();
})