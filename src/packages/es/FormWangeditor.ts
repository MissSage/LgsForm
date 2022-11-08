import {App} from 'vue'
import FormWangeditorIns from '../components/FormWangeditor.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FormWangeditorIns.install = (app: App):void=> {
  app.component(FormWangeditorIns.name, FormWangeditorIns)
}
const FormWangeditor: SFCWithInstall<typeof FormWangeditorIns> = FormWangeditorIns
export{FormWangeditor,FormWangeditor as default}