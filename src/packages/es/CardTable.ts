import {App} from 'vue'
import CardTableIns from '../components/CardTable.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
CardTableIns.install = (app: App):void=> {
  app.component(CardTableIns.name, CardTableIns)
}
const CardTable: SFCWithInstall<typeof CardTableIns> = CardTableIns
export{CardTable,CardTable as default}