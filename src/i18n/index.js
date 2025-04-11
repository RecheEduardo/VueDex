import { createI18n } from 'vue-i18n'
import pt from './pt.json'
import en from './en.json'
import es from './es.json'

const messages = { pt, en, es }

const i18n = createI18n({
	legacy: false,          // usamos Composition API moderna
	globalInjection: true,  // permite usar $t diretamente nos templates
	locale: 'pt',           // idioma padrao: portugues
	fallbackLocale: 'en',   // fallback caso algo não esteja traduzido
	messages
})

export default i18n
