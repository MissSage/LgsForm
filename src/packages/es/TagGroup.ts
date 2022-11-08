import {App} from 'vue'
import TagGroupIns from '../components/TagGroup.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
TagGroupIns.install = (app: App):void=> {
  app.component(TagGroupIns.name, TagGroupIns)
}
const TagGroup: SFCWithInstall<typeof TagGroupIns> = TagGroupIns
export{TagGroup,TagGroup as default}