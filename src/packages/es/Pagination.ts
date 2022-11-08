import {App} from 'vue'
import PaginationIns from '../components/Pagination.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
PaginationIns.install = (app: App):void=> {
  app.component(PaginationIns.name, PaginationIns)
}
const Pagination: SFCWithInstall<typeof PaginationIns> = PaginationIns
export{Pagination,Pagination as default}