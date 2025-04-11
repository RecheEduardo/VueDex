<template>
	<div>
		<!-- navegaçao entre pokemons sequencial -->
		<div class="container" v-if="pokemon">
			<!-- essa div Motion se repetirá por todo código, 
				pois ela engloba as animaçoes da lib! -->
			<Motion asChild 
				:initial="{ y: -150, opacity: 0 }"
				:animate="{ y: 0, opacity: 1 }" 
				:transition="{ type: 'spring', stiffness: 150, damping: 20 }"
			>
				<div class="d-flex justify-content-between border-bottom py-3">

					<router-link :to="{ name: 'Home' }" class="btn btn-lg btn-outline-secondary">
						{{ $t('back') }}
					</router-link>

					<div class="d-flex gap-3">
						<router-link :to="{ name: 'Detail', params: { id: pokemon.id - 1 } }"
							class="btn btn-lg btn-danger fw-bold box-shadow downScale"
							v-if="pokemon.id > 1"
						>
							{{ pokemon.id - 1 }}
							<i class="ti ti-pokeball"></i>
						</router-link>

						<router-link :to="{ name: 'Detail', params: { id: pokemon.id + 1 } }"
							class="btn btn-lg btn-danger fw-bold box-shadow downScale"
						>
							<i class="ti ti-pokeball"></i>
							{{ pokemon.id + 1 }}
						</router-link>
					</div>
				</div>
			</Motion>
		</div>

		<div class="detail-container container d-flex justify-content-center my-4" v-if="pokemon">
			
			<!-- mostra imagem, id e nome do pokemon -->
			<section class="section img-div d-flex flex-column align-items-center">

				<div class="sprite-display">
					<Motion asChild
						:initial="{ y: 50, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 0.25 }"
					>
						<h3 class="text-muted text-center mb-2">#{{ pokemon.id }}</h3>
					</Motion>

					<Motion asChild
						:initial="{ scale: 0, opacity: 0 }"
						:animate="{ scale: 1, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 0.50 }"
					>
						<h1 class="text-center display-3 fw-bold mb-4">{{ capitalize(pokemon.name) }}</h1>
					</Motion>

					<div class="pokemon-types d-flex gap-2 justify-content-center" v-if="pokemon.types.length" >
						<Motion
							v-for="(type, index) in pokemon.types"
							:key="type"
							:initial="{ opacity: 0, scale: 0 }"
							:animate="{ opacity: 1, scale: 1 }"
							:transition="{ type: 'spring', stiffness: 100, damping: 15, delay: 0.75 }"
							asChild
						>
							<img
								:src="getTypeIcon(type)"
								:alt="type"
								class="type-icon"
							/>
						</Motion>
					</div>

					<Motion asChild
						:initial="{ scale: 0, opacity: 0 }"
						:animate="{ scale: 1, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 50, damping: 10, delay: 0.75 }"
					>
						<img
							:src="spriteUrl"
							:alt="pokemon.name + ' - ' + formatLabel(selectedSprite)"
							class="sprite-image"
						/>
					</Motion>
				</div>

				<Motion asChild
					:initial="{ y: 50, opacity: 0 }"
					:animate="{ y: 0, opacity: 1 }" 
					:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 1 }"
				>
					<!-- selecao de sprite dinamica -->
					<h2 class="fw-bold text-muted mt-3">{{ $t('sprite') }}</h2>
				</Motion>

				<div class="sprite-select">
					<Motion asChild
						:initial="{ y: 50, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 1.25 }"
					>

						<select v-model="selectedSprite" 
							class="form-select w-auto border-0 box-shadow text-muted mt-3"
						>
							<option v-for="(url, key) in validSprites" :key="key" :value="key">
								{{ formatLabel(key) }}
							</option>
						</select>
						
					</Motion>
				</div>

			</section>

			<Motion asChild
				:initial="{ y: 50, opacity: 0 }"
				:animate="{ y: 0, opacity: 1 }" 
				:transition="{ type: 'spring', stiffness: 100, damping: 25, delay: 1.25 }"
			>
				<!-- detalhes do pokemon da tela -->
				<section class="section details-div d-flex flex-column">

					<Motion asChild
						:initial="{ y: 80, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 125, damping: 15, delay: 1.5 }"
					>
						<!-- nova aba de descrição -->
						<section class="section border-bottom pb-4">
							<h2 class="fs-1 text-muted fw-bold mb-3">{{ $t('description') }}</h2>
							<p v-if="loadingDescription">{{ $t('loadingDescription') }}</p>
							<p v-else class="text-center fs-5 mb-0">{{ description }}</p>
						</section>
					</Motion>

					<Motion asChild
						:initial="{ y: 80, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 125, damping: 15, delay: 1.75 }"
					>
						<!-- movimentos com paginacao -->
						<section class="section d-flex flex-column gap-3 border-bottom py-4">

							<h2 class="fs-1 text-muted fw-bold mb-0">{{ $t('moves') }}</h2>

							<span class="text-end text-muted">
								{{ $t('pageOf', { current: currentMovePage, total: totalMovePages }) }}
							</span>
							
							<div class="row row-cols-2 g-3">
								<div v-for="(move, idx) in paginatedMoves" :key="`move-${idx}`" class="col">
									<div class="card box-shadow downScale border-0 p-3 text-muted text-center fs-5 fw-bold user-select-none">
										{{ capitalize(move) }}
									</div>
								</div>
							</div>
							<div class="pagination-controls d-flex justify-content-between mt-2">
								<button @click="prevPage" :disabled="currentMovePage === 1" 
									class="btn box-shadow fw-bold btn-secondary upScale"
								>
									{{ $t('previous') }}
								</button>
								<button
									@click="nextPage"
									:disabled="currentMovePage === totalMovePages"
									class="btn box-shadow fw-bold btn-primary upScale"
								>
									{{ $t('next') }}
								</button>
							</div>
						</section>
					</Motion>

					<Motion asChild
						:initial="{ y: 80, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 125, damping: 15, delay: 2 }"
					>
						<!-- lista de jogos -->
						<section v-if="pokemon.gameIndices.length" class="section border-bottom py-2">
							<h2 class="display-5">{{ $t('games') }}</h2>
							<div class="d-flex flex-wrap gap-2 my-4">
								<span
									v-for="(game, idx) in pokemon.gameIndices"
									:key="idx"
									class="badge box-shadow upScale user-select-none text-bg-secondary"
								>
									{{ capitalize(game) }}
								</span>
							</div>
						</section>
					</Motion>

					<Motion asChild
						v-if="evolutions.length"
						:initial="{ y: 80, opacity: 0 }"
						:animate="{ y: 0, opacity: 1 }" 
						:transition="{ type: 'spring', stiffness: 125, damping: 15, delay: 2.25 }"
					>
						<!-- lista de evolucoes, se existir -->
						<section class="py-4">
							<h2 class="text-center mb-4 display-5">{{ $t('evolutions') }}</h2>
							<div class="evo-list d-flex justify-content-center gap-3 flex-wrap">
								<Motion
									asChild
									v-for="(evo, idx) in evolutions"
									:key="idx"
									:initial="{ opacity: 0, y: 20 }"
									:whileInView="{ opacity: 1, y: 0 }"
									:transition="{ type: 'spring', stiffness: 75, damping: 25}"
									:inViewOptions="{ once: true, margin: '-10% 0px -10% 0px' }"
								>
									<router-link
										:to="{ name: 'Detail', params: { id: evo.name } }"
										class="badge box-shadow fs-4 text-bg-success text-decoration-none"
									>
										{{ capitalize(evo.name) }}
									</router-link>
								</Motion>
							</div>
						</section>
					</Motion>
					
				<Motion asChild
					:initial="{ opacity: 0 }"
					:animate="{ opacity: 1 }" 
					:transition="{ type: 'spring', stiffness: 75, damping: 25, delay: 1.5 }"
				>
					<!-- switcher de idioma -->
					<div class="container d-flex w-100 justify-content-end gap-3 pt-3 border-top">
						<button @click="changeLocale('pt')" class="btn flag flag-sm flag-country-br downScale"></button>
						<button @click="changeLocale('en')" class="btn flag flag-sm flag-country-us downScale"></button>
						<button @click="changeLocale('es')" class="btn flag flag-sm flag-country-es downScale"></button>
					</div>
				</Motion>
				</section>
			</Motion>
		</div>

		<div v-else-if="error" class="error">
			<button class="btn btn-danger fs-3 fw-bold mx-3">
				<i class="ti ti-exclamation-circle"></i>
				{{ error }}
			</button>
		</div>

		<div v-else class="loading fw-bold text-secondary align-items-center gap-3">
			<i class="ti ti-pokeball"></i>
			{{ $t('loading') }}
		</div>
	</div>
</template>

<script>
import {
	fetchPokemonDetail,
	fetchPokemonSpecies,
	fetchEvolutionChain
} from '../services/pokeapi'

import { Motion } from 'motion-v' // Lib para animações

export default {
	name: 'Detail',
	data() {
		return {
			pokemon: null,               // dados do pokemon carregado
			evolutions: [],              // lista de evolucoes
			description: '',             // descrição em pt-br
			loadingDescription: true,    // estado de carregamento da descrição
			error: null,                 // mensagem de erro
			currentMovePage: 1,          // pagina atual de movimentos
			movesPerPage: 4,             // quantos movimentos por pagina
			selectedSprite: 'official-artwork.front_default' // sprite padrao selecionado
		}
	},
	computed: {
		// monta objeto com todos sprites validos
		validSprites() {
			if (!this.pokemon?.sprites) return {}

			const sprites = {}
			// sprites do nivel principal
			Object.entries(this.pokemon.sprites).forEach(([k, v]) => {
				if (typeof v === 'string' && v) sprites[k] = v
			})
			// sprites dentro de other
			Object.entries(this.pokemon.sprites.other || {}).forEach(([group, obj]) => {
				if (obj && typeof obj === 'object') {
					Object.entries(obj).forEach(([k, v]) => {
						if (typeof v === 'string' && v) {
							sprites[`${group}.${k}`] = v
						}
					})
				}
			})
			return sprites
		},
		// retorna a url do sprite selecionado
		spriteUrl() {
			return this.validSprites[this.selectedSprite] || 'https://via.placeholder.com/150'
		},
		// movimentos da pagina atual
		paginatedMoves() {
			if (!this.pokemon?.moves) return []
			const start = (this.currentMovePage - 1) * this.movesPerPage
			return this.pokemon.moves.slice(start, start + this.movesPerPage)
		},
		// calcula total de paginas de movimentos
		totalMovePages() {
			if (!this.pokemon?.moves) return 1
			return Math.ceil(this.pokemon.moves.length / this.movesPerPage)
		}
	},
	methods: {
		// deixa primeira letra maiuscula
		capitalize(value) {
			if (!value) return ''
			return value.charAt(0).toUpperCase() + value.slice(1)
		},
		// transforma chave do sprite em label legivel
		formatLabel(key) {
			return key
				.replace(/\./g, ' ')
				.split(/[_\- ]/)
				.map(this.capitalize)
				.join(' ')
		},
		// extrai todas evolucoes de forma recursiva
		extractEvolutions(chain) {
			let list = []
			if (chain?.species) list.push({ name: chain.species.name })
			;(chain?.evolves_to || []).forEach(child => {
				list = list.concat(this.extractEvolutions(child))
			})
			return list
		},
		// vai para pagina anterior de movimentos
		prevPage() {
			if (this.currentMovePage > 1) this.currentMovePage--
		},
		// vai para proxima pagina de movimentos
		nextPage() {
			if (this.currentMovePage < this.totalMovePages) this.currentMovePage++
		},
		getTypeIcon(type) {
			// usa o import.meta.url do vite para resolver o caminho
			return new URL(`../assets/pokemon-types/${type}.svg`, import.meta.url).href
		},
		// metodo reutilizavel para buscar todos os dados do pokemon
		async loadPokemon(id) {
			try {
				this.loadingDescription = true
				this.error = null
				this.pokemon = null
				this.evolutions = []
				this.description = ''
				this.selectedSprite = 'official-artwork.front_default'
				this.currentMovePage = 1

				const data = await fetchPokemonDetail(id)
				this.pokemon = data

				// se sprite padrao nao existir, escolhe primeiro disponivel
				if (!this.validSprites[this.selectedSprite]) {
					this.selectedSprite = Object.keys(this.validSprites)[0] || ''
				}

				// busca dados da espécie (já retorna .description e .evolution_chain)
				const species = await fetchPokemonSpecies(id)

				// atribui descrição em português
				this.description = species.description
				this.loadingDescription = false

				// atribui evoluções, se houver
				if (species.evolution_chain?.url) {
					const evoData = await fetchEvolutionChain(species.evolution_chain.url)
					this.evolutions = this.extractEvolutions(evoData.chain)
				}

			} catch (err) {
				console.error(err)
				this.error = 'Erro ao carregar os dados do Pokemon.'
			}
		},
		// troca o idioma atual do site
		changeLocale(lang) {
			this.$i18n.locale = lang
		}
	},
	components: {
		Motion
	},
	async mounted() {
		// pega id do pokemon da rota
		await this.loadPokemon(this.$route.params.id)
	},
	// dispara de novo o mounted() quando mudar o :id da rota
	beforeRouteUpdate(to, from, next) {
		this.loadPokemon(to.params.id)
		next()
	}
}
</script>

<style scoped>

.detail-container{
	gap: 10rem;
}

.pokemon-description{
	font-size: 2.5rem;
}
.details-div{
	width: 45% !important;
}
.sprite-image {
	min-width: 500px;
	max-width: 500px;
	height: auto;
}
.box-shadow{
	box-shadow: 0 0 20px rgba(138, 138, 138, 0.25);
}
.type-icon {
  width: 48px;
  height: 48px;
}
.error, .loading {
	font-size: 2.5rem;
	height: 100svh !important;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (max-width: 1200px) {
	.sprite-image{
		min-width: 350px !important;
		max-width: 350px !important;
	}

	.detail-container{
		gap: 5rem;
	}
}

@media (max-width: 990px){
	.detail-container{
		flex-direction: column;
	}
	.sprite-image{
		margin-top: 2.5rem;
	}
	.details-div{
		width: 100% !important;
	}
} 

@media (max-width: 426px){
	.evo-list{
		flex-direction: column;
	}

	.error .loading{
		font-size: 5rem !important;
		height: 100svh !important;
	}
}
</style>
