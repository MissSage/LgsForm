import {App} from 'vue'
import RangeSelecterIns from '../components/RangeSelecter.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
RangeSelecterIns.install = (app: App):void=> {
  app.component(RangeSelecterIns.name, RangeSelecterIns)
}
const RangeSelecter: SFCWithInstall<typeof RangeSelecterIns> = RangeSelecterIns
export{RangeSelecter,RangeSelecter as default}