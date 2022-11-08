import {App} from 'vue'
import FormTableColumnIns from '../components/FormTableColumn.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FormTableColumnIns.install = (app: App):void=> {
  app.component(FormTableColumnIns.name, FormTableColumnIns)
}
const FormTableColumn: SFCWithInstall<typeof FormTableColumnIns> = FormTableColumnIns
export{FormTableColumn,FormTableColumn as default}