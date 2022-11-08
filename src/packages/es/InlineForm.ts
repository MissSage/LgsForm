import {App} from 'vue'
import InlineFormIns from '../components/InlineForm.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
InlineFormIns.install = (app: App):void=> {
  app.component(InlineFormIns.name, InlineFormIns)
}
const InlineForm: SFCWithInstall<typeof InlineFormIns> = InlineFormIns
export{InlineForm,InlineForm as default}