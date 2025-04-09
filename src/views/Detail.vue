<template>
	<div class="detail-container container d-flex justify-content-center gap-5 my-5" v-if="pokemon">
		<!-- mostra imagem, id e nome do pokemon -->
		<section class="section d-flex flex-column align-items-center">
			<!-- selecao de sprite dinamica -->
			<h2 class="fw-bold text-muted">Sprite</h2>
			<div class="sprite-select">
				<select v-model="selectedSprite" class="form-select w-auto border-0 box-shadow text-muted mt-3">
					<option
						v-for="(url, key) in validSprites"
						:key="key"
						:value="key"
					>
						{{ formatLabel(key) }}
					</option>
				</select>
			</div>
			<div class="sprite-display">
				<img
					:src="spriteUrl"
					:alt="pokemon.name + ' - ' + formatLabel(selectedSprite)"
					class="sprite-image my-2"
				/>
				<h3 class="text-muted text-center mt-4">#{{ pokemon.id }}</h3>
				<h1 class="text-center display-3 fw-bold">{{ capitalize(pokemon.name) }}</h1>
			</div>
		</section>

		
		<section class="section d-flex flex-column gap-4">

			<!-- nova aba de descrição -->
			<section class="section">
				<h2 class="fs-1 text-muted fw-bold">Descrição</h2>
				<p v-if="loadingDescription">Carregando descrição...</p>
				<p v-else>{{ description }}</p>
			</section>

			<!-- movimentos com paginacao -->
			<section class="section d-flex flex-column gap-3">
				<h2 class="fs-1 text-muted fw-bold mb-0">Movimentos</h2>
				<span class="text-end text-muted">Página {{ currentMovePage }} de {{ totalMovePages }}</span>
				<div
					v-for="(move, idx) in paginatedMoves"
					:key="`move-${idx}`"
					class="card box-shadow border-0 p-3 text-muted text-center fs-5 fw-bold"
				>
					{{ capitalize(move) }}
				</div>
				<div class="pagination-controls d-flex justify-content-between">
					<button @click="prevPage" :disabled="currentMovePage === 1" class="btn box-shadow fw-bold btn-secondary">
						Anterior
					</button>
					<button
						@click="nextPage"
						:disabled="currentMovePage === totalMovePages"
						class="btn box-shadow fw-bold btn-primary"
					>
						Proximo
					</button>
				</div>
			</section>

			<!-- lista de jogos -->
			<section class="section">
				<h2 class="display-5">Jogos</h2>
				<div class="d-flex flex-wrap gap-2 my-4">
					<span
						v-for="(game, idx) in pokemon.gameIndices"
						:key="idx"
						class="badge box-shadow text-bg-secondary"
					>
						{{ capitalize(game) }}
					</span>
				</div>
			</section>

			<!-- lista de evolucoes, se existir -->
			<section class="text-center" v-if="evolutions.length">
				<h2 class="mb-4 display-5">Evoluções</h2>
					<span
						v-for="(evo, idx) in evolutions"
						:key="idx"
						class="badge box-shadow fs-4 text-bg-success mx-2"
					>
						{{ capitalize(evo.name) }}
					</span>
			</section>
		</section>
	</div>

	<div v-else-if="error" class="error">{{ error }}</div>
	<div v-else class="loading">Carregando...</div>
</template>

<script>
import {
	fetchPokemonDetail,
	fetchPokemonSpecies,
	fetchEvolutionChain
} from '../services/pokeapi'

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
			movesPerPage: 5,             // quantos movimentos por pagina
			selectedSprite: 'home.front_default' // sprite padrao selecionado
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
		}
	},
	async mounted() {
		// pega id do pokemon da rota
		const id = this.$route.params.id
		try {

			// busca dados do pokemon
			const data = await fetchPokemonDetail(id)
			this.pokemon = data
			this.currentMovePage = 1

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
	}
}
</script>

<style scoped>

.detail-container{
	width: 60% !important;
}
.sprite-image {
	min-width: 500px;
	max-width: 500px;
	height: auto;
}
.box-shadow{
	box-shadow: 0 0 20px rgba(138, 138, 138, 0.25);
}
</style>
