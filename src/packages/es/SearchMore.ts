import {App} from 'vue'
import SearchMoreIns from '../components/SearchMore.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
SearchMoreIns.install = (app: App):void=> {
  app.component(SearchMoreIns.name, SearchMoreIns)
}
const SearchMore: SFCWithInstall<typeof SearchMoreIns> = SearchMoreIns
export{SearchMore,SearchMore as default}