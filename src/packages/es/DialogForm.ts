import {App} from 'vue'
import DialogFormIns from '../components/DialogForm.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
DialogFormIns.install = (app: App):void=> {
  app.component(DialogFormIns.name, DialogFormIns)
}
const DialogForm: SFCWithInstall<typeof DialogFormIns> = DialogFormIns
export{DialogForm,DialogForm as default}