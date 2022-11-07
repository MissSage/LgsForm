import type { App, Plugin } from 'vue'
import Form from './packages/es/Form'

const components = [Form]

const LgsForm:Plugin = {
  install(app: App) {
    components.map(component => app.component(component.name, component))
  }
}
export {
  Form
}
export default LgsForm