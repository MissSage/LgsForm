import { App } from 'vue'
import Button from './Button/Button.vue'
import AttrTable from './AttrTable/AttrTable.vue'

const components = [
  Button,
  AttrTable
]

const install = (app:App):void => {
  components.map((component) => app.component(component.name,component))
}
export default {
  install
}