import {App} from 'vue'
import Form from '../components/Form.vue'

Form.install = (app: App):void=> {
  app.component(Form.name, Form)
}
export default Form