<template>
	<div class="home-container container pt-4">

		<!-- essa div Motion se repetirá por todo código, 
				pois ela engloba as animaçoes da lib! -->
		<Motion asChild
			:initial="{ y: -250, opacity: 0 }"
			:animate="{ y: 0, opacity: 1 }" 
			:transition="{ type: 'spring', stiffness: 75, damping: 25 }"
		>
			<h1 class="site-title display-1 mb-5 fw-bold text-muted text-center">
				Pokédex Interativa
			</h1>
		</Motion>


		<!-- componente de filtro que emite evento com nome digitado -->
		<Motion asChild
			:initial="{ y: 150, opacity: 0 }"
			:animate="{ y: 0, opacity: 1 }"
			:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 0.5 }"
		>
     		<Filter @filter="handleUpdateFilters" class="pb-4"/>
   		</Motion>

		<!-- lista de pokemon: se estiver buscando, mostra só o resultado da busca -->
		<Motion asChild
			:initial="{ y: 150, opacity: 0 }"
			:animate="{ y: 0, opacity: 1 }"
			:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 1.0	 }"
		>
			<ul class="pokemon-list list-group mb-5">
				<Motion asChild v-for="(pokemon, index) in displayPokemons" :key="index"
					:initial="{ scale: 0.5, opacity: 0 }"
					:whileInView="{ scale: 1, opacity: 1 }"
					:transition="{ type: 'spring', stiffness: 200, damping: 25 }"
					:inViewOptions="{ once: true, margin: '-10% 0px -10% 0px' }"
				>
					<PokemonCard :pokemon="pokemon"/>
				</Motion>
			</ul>
		</Motion>


		<!-- estado de loading -->
		<div v-if="loading" class="loading fw-bold text-secondary align-items-center gap-3">
			<i class="ti ti-pokeball"></i>
			Carregando...
		</div>

	</div>
</template>

<script>
import Filter from '../components/Filter.vue'
import { Motion } from 'motion-v' // Lib para animações
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
		PokemonCard,
		Motion
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
@media (max-width: 768px) {
	.site-title{
		font-size: 2.25rem;
	}
}

.loading {
	font-size: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
