import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
        globals: true,         // usar describe/it sem importar
        environment: 'jsdom',  // simula browser para os testes
        exclude: [...configDefaults.exclude, 'cypress/*'],
      }
})
