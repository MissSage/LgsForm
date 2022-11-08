import {App} from 'vue'
import TabsIns from '../components/Tabs.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
TabsIns.install = (app: App):void=> {
  app.component(TabsIns.name, TabsIns)
}
const Tabs: SFCWithInstall<typeof TabsIns> = TabsIns
export{Tabs,Tabs as default}