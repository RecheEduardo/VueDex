<template>
	<div class="home-container container pt-4">
		<h1 class="display-1 mb-4 fw-bold text-muted text-center">Pokédex Interativa</h1>

		<!-- componente de filtro que emite evento com nome digitado -->
		<Filter @filter="handleUpdateFilters" />

		<!-- lista de pokemon: se estiver buscando, mostra so o resultado da busca -->
		<ul class="pokemon-list list-group mb-5">
			<PokemonCard
				v-for="(pokemon, index) in displayPokemons"
				:key="index"
				:pokemon="pokemon"
			/>
		</ul>

		<!-- estado de loading -->
		<div v-if="loading" class="loading">Carregando...</div>
	</div>
</template>

<script>
import Filter from '../components/Filter.vue'
import PokemonCard from '../components/PokemonCard.vue'
import {
	fetchPokemonDetail,
	fetchAllPokemons,
	fetchPokemonsByType,
	fetchPokemonsByRegion
} from '../services/pokeapi' // pega todos os filtros necessarios vindo da API

export default {
	name: 'Home',
	components: {
		Filter,
		PokemonCard
	},
	data() {
		return {
			loading: false,         // controla o estado de carregamento
			offset: 0,              // controle da paginação
			limit: 20,              // quantidade por requisição
			searchMode: false,      // indica se está em modo busca
			searchResults: []       // armazena resultados da busca
		}
	},
	computed: {
		// se estiver buscando, mostra os resultados. senão, mostra os pokémons do Vuex
		displayPokemons() {
			return this.searchMode
				? this.searchResults
				: this.$store.state.poke.pokemons
		}
	},
	methods: {
		// carrega mais pokemons da API (scroll infinito)
		async fetchPokemons() {
			if (this.searchMode) return
			this.loading = true
			await this.$store.dispatch('poke/fetchPokemons', {
				offset: this.offset, // vai somando 20 a partir do primeiro carregamento
				limit: this.limit
			})
			this.loading = false
			this.offset += this.limit // adiciona +20 no offset
		},
		// chamado quando o filtro e usado
		async handleUpdateFilters({ query, type, region }) {
            // limpa o texto do pokemon e coloca tudo em minusculo
			const pokemon = query.trim().toLowerCase()

            // se todos os campos estiverem vazios
            // sai do modo de busca e limpa os resultados
			if (!pokemon && !type && !region) {
				this.searchMode = false
				this.searchResults = []
				return
			}

            // ativa o modo de busca e liga o loading
			this.searchMode = true
			this.loading = true

			try {
                // REFACT - agora ele faz uma busca simples (nome, url) para cada caso
                // (tipo, região e nome) e aloca dentro da variável names
				let names = (await fetchAllPokemons()).map(p => p.name)

                // se campo caso existir (o usuario selecionar), será feita uma busca nele
				if (type) {
					const typeList = await fetchPokemonsByType(type)
					names = names.filter(name => typeList.includes(name))
				}

				if (region) {
					const regionList = await fetchPokemonsByRegion(region)
					names = names.filter(name => regionList.includes(name))
				}

				if (pokemon) {
					names = names.filter(name => name.includes(pokemon))
				}

                // caso sejam bem sucedidas, sera feito o fetch total dos dados
				const details = await Promise.all(
					names.map(name => fetchPokemonDetail(name))
				)

				// salva os resultados pra exibir na tela
				this.searchResults = details
			} catch (err) {
				console.error('erro na busca:', err) // lança o erro e zera os resultados
				this.searchResults = []
			} finally {
                // de qualquer forma finaliza o loading
				this.loading = false
			}
		},
		// busca um unico pokemon pelo nome ou ID
		async fetchSearchResult(nameOrId) {
			this.loading = true
			try {
				const result = await fetchPokemonDetail(nameOrId)
				this.searchResults = [result]
			} catch (error) {
				console.error('Pokémon não encontrado:', error)
				this.searchResults = []
			}
			this.loading = false
		},
		// detecta scroll no final da pagina e carrega mais (se nao estiver buscando)
		handleScroll() {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            // calculo das condicionais para verificar se é hora de fazer mais um fetch
			if (scrollTop + clientHeight >= scrollHeight - 5 && !this.loading && !this.searchMode) {
				this.fetchPokemons()
			}
		}
	},
	mounted() {
		this.fetchPokemons()
		window.addEventListener('scroll', this.handleScroll)
	},
	beforeUnmount() {
        // remove o evento para evitar estouro de fetchs desnecessários
		window.removeEventListener('scroll', this.handleScroll)
	}
}
</script>

<style scoped>
</style>
