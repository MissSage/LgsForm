import {App} from 'vue'
import TagIns from '../components/Tag.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
TagIns.install = (app: App):void=> {
  app.component(TagIns.name, TagIns)
}
const Tag: SFCWithInstall<typeof TagIns> = TagIns
export{Tag,Tag as default}