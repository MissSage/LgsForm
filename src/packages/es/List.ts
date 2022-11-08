import {App} from 'vue'
import ListIns from '../components/List.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
ListIns.install = (app: App):void=> {
  app.component(ListIns.name, ListIns)
}
const List: SFCWithInstall<typeof ListIns> = ListIns
export{List,List as default}