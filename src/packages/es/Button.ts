import {App} from 'vue'
import ButtonIns from '../components/Button.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
ButtonIns.install = (app: App):void=> {
  app.component(ButtonIns.name, ButtonIns)
}
const Button: SFCWithInstall<typeof ButtonIns> = ButtonIns
export{Button,Button as default}