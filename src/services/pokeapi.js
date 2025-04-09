import axios from 'axios'

const API_BASE = 'https://pokeapi.co/api/v2/'

// busca os dados principais do pokemon, tipo nome, id, sprites e por ai vai
export function fetchPokemonDetail(pokemonIdentifier) {
    return axios.get(`${API_BASE}pokemon/${pokemonIdentifier}`)
        .then(response => {
            const data = response.data
            return {
                id: data.id,
                name: data.name,
                sprites: data.sprites, // imagens do pokemon
                moves: data.moves.map(move => move.move.name), // pega só o nome de cada movimento
                gameIndices: data.game_indices.map(game => game.version.name), // lista de jogos onde ele aparece
                types: data.types.map(type => type.type.name), // tipos do pokemon, tipo "fire", "water"...
                species: data.species // dados da especie, usados pra puxar a evolucao depois
            }
        })
}

// busca dados da especie do pokemon, necessario pra pegar as evoluções
export function fetchPokemonSpecies(pokemonIdentifier) {
    return axios.get(`${API_BASE}pokemon-species/${pokemonIdentifier}`)
        .then(response => response.data)
}

// busca a cadeia de evolução a partir de uma URL que vem da especie
export function fetchEvolutionChain(url) {
    return axios.get(url)
        .then(response => response.data)
}