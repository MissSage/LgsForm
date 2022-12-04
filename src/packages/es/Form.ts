import { App } from 'vue'
import FormIns from '../components/Form.vue'
import '@/styles/element-plus/index.scss'
import { SFCWithInstall } from '@/types/lgsform'

FormIns.install = (app: App): void => {
  app.component(FormIns.name, FormIns)
}
const Form: SFCWithInstall<typeof FormIns> = FormIns
export { Form, Form as default }