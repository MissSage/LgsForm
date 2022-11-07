import { App } from 'vue'
import Button from './packages/components/Button.vue'
import AttrTable from './packages/components/AttrTable.vue'
import Form from './packages/components/Form.vue'

const components = [Button, AttrTable, Form]

const install = (app: App): void => {
  components.map(component => app.component(component.name, component))
}
export {
  Button,AttrTable,Form
}
export default {
  install
}
