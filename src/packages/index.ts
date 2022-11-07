import { App } from 'vue'
import Button from './components/Button.vue'
import AttrTable from './components/AttrTable.vue'
import Form from './components/Form.vue'

const components = [Button, AttrTable, Form]

const install = (app: App): void => {
  components.map(component => app.component(component.name, component))
}
export default {
  install
}
