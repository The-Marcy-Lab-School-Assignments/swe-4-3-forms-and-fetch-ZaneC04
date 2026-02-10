const FORM_URL = 'https://formspree.io/f/xnjbjdqk'

export const getRandomPokemon = async () => {
    const pokemonId = Math.round(Math.random() * 150)
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        if (!response.ok) {
            throw Error(`Failed to fetch pokemon.`);
        }
        const responseData = await response.json();
        const pokemonObj = {
            name: responseData.species.name,
            types: responseData.types.map(obj => obj.type.name).join(', '),
            sprite: responseData.sprites.front_default
        }
        return { data: pokemonObj, error: null }
    }
    catch (error) {
        return { data: null, error: error }
    }
}

export const postDiscoveredPokemon = async (formData) => {
    try {
        const response = await fetch(FORM_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error(`Failed`)
        }
        const responseData = await response.json();
        console.log(responseData)
        return { data: responseData, error: null }
    }

    catch (error) {
        return { data: null, error: error }
    }
}


