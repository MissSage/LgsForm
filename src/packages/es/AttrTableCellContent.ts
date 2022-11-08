import {App} from 'vue'
import AttrTableCellContentIns from '../components/AttrTableCellContent.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
AttrTableCellContentIns.install = (app: App):void=> {
  app.component(AttrTableCellContentIns.name, AttrTableCellContentIns)
}
const AttrTableCellContent: SFCWithInstall<typeof AttrTableCellContentIns> = AttrTableCellContentIns
export{AttrTableCellContent,AttrTableCellContent as default}