import {App} from 'vue'
import ImportButtonIns from '../components/ImportButton.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
ImportButtonIns.install = (app: App):void=> {
  app.component(ImportButtonIns.name, ImportButtonIns)
}
const ImportButton: SFCWithInstall<typeof ImportButtonIns> = ImportButtonIns
export{ImportButton,ImportButton as default}