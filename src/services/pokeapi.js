import axios from 'axios'

const API_BASE = 'https://pokeapi.co/api/v2/'

// busca os dados principais do pokemon, tipo nome, id, sprites e todo o resto...
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
			}}
    )
}

// busca dados da espécie do pokemon, necessário pra pegar as evoluções e a descrição
export function fetchPokemonSpecies(pokemonIdentifier) {
	return axios.get(`${API_BASE}pokemon-species/${pokemonIdentifier}`)
		.then(response => {
			const data = response.data

			// tenta encontrar primeiro a versão omega-ruby em ingles
			let flavorTextEntry = data.flavor_text_entries.find(
				entry => entry.language.name === 'en' && entry.version.name === 'omega-ruby'
			)

			// se nao encontrar, pega a versao padrão
			if (!flavorTextEntry) {
				flavorTextEntry = data.flavor_text_entries.find(
					entry => entry.language.name === 'en'
				)
			}

			return {
				...data,
				description: flavorTextEntry
					? flavorTextEntry.flavor_text.replace(/[\f\n\r]/g, ' ')
					: 'Descrição indisponivel...'
			}
		})
}

// busca a cadeia de evolução a partir de uma URL que vem da especie
export function fetchEvolutionChain(url) {
	return axios.get(url)
		.then(response => response.data)
}

// busca a lista completa de pokemons (nome + url)
export function fetchAllPokemons() {
	// range de busca alto pra garantir que a requisição traga todos os pokemon
	return axios
		.get(`${API_BASE}pokemon?offset=0&limit=2000`)
		.then(response => response.data.results)
}

// busca a lista de tipos
export function fetchTypeList() {
	return axios.get(`${API_BASE}type`)
		.then(response => response.data.results.map(type => type.name))
}

// busca os pokemons por tipo
export function fetchPokemonsByType(type) {
	return axios.get(`${API_BASE}type/${type}`)
		.then(response => response.data.pokemon.map(p => p.pokemon.name))
}

// busca a lista de regiões
export function fetchPokedexList() {
	return axios.get(`${API_BASE}pokedex`)
		.then(response => response.data.results.map(p => p.name))
}

// busca os pokemons de uma região
export function fetchPokemonsByRegion(region) {
	return axios.get(`${API_BASE}pokedex/${region}`)
		.then(response => response.data.pokemon_entries.map(p => p.pokemon_species.name))
}
