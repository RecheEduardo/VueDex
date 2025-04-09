<template>
	<!-- input com botão de busca -->
	<div>
        <!-- campo de texto vinculado ao estado local -->
        <input type="text" v-model="searchQuery" placeholder="Buscar Pokémon...">
        <!-- botão que dispara o filtro -->
        <button class="btn" type="button" @click="emitFilter">
            Buscar
        </button>
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