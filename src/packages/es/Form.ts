import {App} from 'vue'
import Form from '../components/Form.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
Form.install = (app: App):void=> {
  app.component(Form.name, Form)
}
const FormInstall: SFCWithInstall<typeof Form> = Form
export default FormInstall