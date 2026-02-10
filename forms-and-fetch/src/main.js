import { getRandomPokemon } from "./fetch-helpers";
import { renderPokemon } from "./dom-helpers";
import { renderError } from "./dom-helpers";
import { renderSuccess } from "./dom-helpers";
import { postDiscoveredPokemon } from "./fetch-helpers";

const discoverButton = document.querySelector('#discover-button')
const pokemonForm = document.querySelector("#pokemon-form")

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

pokemonForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(pokemonForm)
  const formValues = Object.fromEntries(formData);
  const { name, types } = formValues;
  const isFavorite = pokemonForm.elements.favorite.checked
  const data = await postDiscoveredPokemon(formValues);
  console.log(data)
  if (data.error) {
    renderError(`Error: unable to capture Pokémon. Please try again later`);
    return;
  }
  renderSuccess(`${formValues.name} has been captured!`)
  pokemonForm.reset()
})

