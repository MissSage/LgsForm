import {App} from 'vue'
import ImgViewerIns from '../components/ImgViewer.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
ImgViewerIns.install = (app: App):void=> {
  app.component(ImgViewerIns.name, ImgViewerIns)
}
const ImgViewer: SFCWithInstall<typeof ImgViewerIns> = ImgViewerIns
export{ImgViewer,ImgViewer as default}