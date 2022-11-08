import {App} from 'vue'
import FormItemIns from '../components/FormItem.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FormItemIns.install = (app: App):void=> {
  app.component(FormItemIns.name, FormItemIns)
}
const FormItem: SFCWithInstall<typeof FormItemIns> = FormItemIns
export{FormItem,FormItem as default}