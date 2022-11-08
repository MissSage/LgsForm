import {App} from 'vue'
import VoicerIns from '../components/Voicer.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
VoicerIns.install = (app: App):void=> {
  app.component(VoicerIns.name, VoicerIns)
}
const Voicer: SFCWithInstall<typeof VoicerIns> = VoicerIns
export{Voicer,Voicer as default}