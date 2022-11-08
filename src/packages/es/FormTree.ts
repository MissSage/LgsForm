import {App} from 'vue'
import FormTreeIns from '../components/FormTree.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FormTreeIns.install = (app: App):void=> {
  app.component(FormTreeIns.name, FormTreeIns)
}
const FormTree: SFCWithInstall<typeof FormTreeIns> = FormTreeIns
export{FormTree,FormTree as default}