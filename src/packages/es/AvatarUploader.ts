import {App} from 'vue'
import AvatarUploaderIns from '../components/AvatarUploader.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
AvatarUploaderIns.install = (app: App):void=> {
  app.component(AvatarUploaderIns.name, AvatarUploaderIns)
}
const AvatarUploader: SFCWithInstall<typeof AvatarUploaderIns> = AvatarUploaderIns
export{AvatarUploader,AvatarUploader as default}