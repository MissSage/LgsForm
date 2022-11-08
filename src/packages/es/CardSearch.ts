import {App} from 'vue'
import CardSearchIns from '../components/CardSearch.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
CardSearchIns.install = (app: App):void=> {
  app.component(CardSearchIns.name, CardSearchIns)
}
const CardSearch: SFCWithInstall<typeof CardSearchIns> = CardSearchIns
export{CardSearch,CardSearch as default}