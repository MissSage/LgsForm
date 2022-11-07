import { App } from 'vue'
import Button from './Button.vue'

const components = [
  Button
]

const install = (app:App):void => {
  components.map((component) => app.component(component.name,component))
}
export {
  Button
}
export default {
  install
}