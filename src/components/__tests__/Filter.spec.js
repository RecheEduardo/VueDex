import Filter from '../Filter.vue'

// importa o mount pra montar o componente no teste
import { mount } from '@vue/test-utils'

// importa funçoes do vitest: describe, it, expect e vi (pra mock)
import { describe, it, expect, vi } from 'vitest'


// cria um mock dos serviços que fazem chamada a api
// assim o teste nao faz requisiçao de verdade
vi.mock('../../services/pokeapi', () => ({
  fetchTypeList: vi.fn().mockResolvedValue([]), // simula retorno vazio
  fetchPokedexList: vi.fn().mockResolvedValue([]) // simula retorno vazio
}))

// TESTES:
describe('Filter.vue (smoke test)', () => {

  // teste simples pra ver se o componente monta certo
  it('monta o componente e renderiza input e botao', () => {

    // monta o componente
    const wrapper = mount(Filter, {
        global: {
            // cria um componente falso pra substituir o Motion
            components: { Motion: { template: '<div><slot/></div>' } },

            // simula a funçao $t do i18n pra traduzir
            mocks: { $t: (msg) => msg }
      }
    })

    // pega o input de texto (campo de busca)
    const input = wrapper.find('input[type="text"]')
    // espera que o input exista na tela
    expect(input.exists()).toBe(true)

    // pega o botao de busca com classe .filter-btn
    const button = wrapper.find('button.filter-btn')
    // espera que o botao exista na tela
    expect(button.exists()).toBe(true)
  })
})

