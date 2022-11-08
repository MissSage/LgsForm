import {App} from 'vue'
import TiniImageUploaderIns from '../components/TiniImageUploader.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
TiniImageUploaderIns.install = (app: App):void=> {
  app.component(TiniImageUploaderIns.name, TiniImageUploaderIns)
}
const TiniImageUploader: SFCWithInstall<typeof TiniImageUploaderIns> = TiniImageUploaderIns
export{TiniImageUploader,TiniImageUploader as default}