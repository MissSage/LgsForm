import {App} from 'vue'
import FormTableIns from '../components/FormTable.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FormTableIns.install = (app: App):void=> {
  app.component(FormTableIns.name, FormTableIns)
}
const FormTable: SFCWithInstall<typeof FormTableIns> = FormTableIns
export{FormTable,FormTable as default}