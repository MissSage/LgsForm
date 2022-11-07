import { App } from 'vue'
import Form from './packages/es/Form'

const components = [Form]

const install = (app: App): void => {
  components.map(component => app.component(component.name, component))
}
export {
  Form
}
export default {
  install
}
