import {App} from 'vue'
import FieldSetIns from '../components/FieldSet.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
FieldSetIns.install = (app: App):void=> {
  app.component(FieldSetIns.name, FieldSetIns)
}
const FieldSet: SFCWithInstall<typeof FieldSetIns> = FieldSetIns
export{FieldSet,FieldSet as default}