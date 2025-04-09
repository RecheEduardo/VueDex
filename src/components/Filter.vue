<template>
	<!-- input com botão de busca -->
	<div class="filter rounded my-4">
		<div class="input-group input-group-lg">
			<!-- campo de texto vinculado ao estado local -->
			<input
				type="text"
				v-model="searchQuery"
				placeholder="Buscar Pokémon..."
				class="form-control border-0 fs-2"
			>
			<!-- botão que dispara o filtro -->
			<button
				class="btn btn-danger fw-bold border-0 filter-btn"
				type="button"
				@click="emitFilter"
			>
				<i class="ti ti-pokeball fs-1"></i>
			</button>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	emits: ['filter'], // declara que esse componente pode emitir o evento 'filter'

	setup(props, { emit }) {
		// cria uma variável reativa pro valor do input (o texto da busca)
		const searchQuery = ref('')

		// função chamada quando o botão de busca é clicado
		// ela dispara o evento 'filter' pro componente pai, enviando o texto digitado
		function emitFilter() {
			// envia o valor atual do input pro pai
			emit('filter', searchQuery.value)
		}

		// retorna as propriedades que vão ser usadas no template
		return {
			searchQuery,  // vinculado ao campo de texto (v-model)
			emitFilter    // chamada quando o botão for clicado
		}
	}
}
</script>

<style scoped>
/* estilo da caixa de filtro */
.filter {
	box-shadow: 0 0 20px rgba(138, 138, 138, 0.1);
}
</style>
