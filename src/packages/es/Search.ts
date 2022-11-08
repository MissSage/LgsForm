import {App} from 'vue'
import SearchIns from '../components/Search.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
SearchIns.install = (app: App):void=> {
  app.component(SearchIns.name, SearchIns)
}
const Search: SFCWithInstall<typeof SearchIns> = SearchIns
export{Search,Search as default}