import {App} from 'vue'
import AttrTableIns from '../components/AttrTable.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
AttrTableIns.install = (app: App):void=> {
  app.component(AttrTableIns.name, AttrTableIns)
}
const AttrTable: SFCWithInstall<typeof AttrTableIns> = AttrTableIns
export{AttrTable,AttrTable as default}