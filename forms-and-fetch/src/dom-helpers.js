import { getRandomPokemon } from "./fetch-helpers"

const error = document.querySelector('#error');
const success = document.querySelector('#success');

export const renderPokemon = async (pokemonObj) => {
    const listItem = document.createElement("li")
    const pokemonFig = document.createElement('figure')
    const pokemonSprite = document.createElement("img")
    const pokemonName = document.createElement("figcaption")
    const pokemonTypes = document.createElement("p")

    pokemonSprite.src = pokemonObj.sprite
    pokemonName.textContent = pokemonObj.name
    pokemonTypes.textContent = pokemonObj.types

    pokemonFig.append(pokemonSprite, pokemonName)
    listItem.append(pokemonFig, pokemonTypes)
    document.querySelector("#discovered-list").append(listItem)
}

export const renderError = (msg) => {
    error.textContent = msg;
    success.textContent = '';
}

export const renderSuccess = (msg) => {
    success.textContent = msg;
    error.textContent = '';
}