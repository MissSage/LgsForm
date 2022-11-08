import {App} from 'vue'
import VideorIns from '../components/Videor.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
VideorIns.install = (app: App):void=> {
  app.component(VideorIns.name, VideorIns)
}
const Videor: SFCWithInstall<typeof VideorIns> = VideorIns
export{Videor,Videor as default}