import {App} from 'vue'
import ColorPickerIns from '../components/ColorPicker.vue'
import '@/styles/element-plus/index.scss'
type SFCWithInstall<T> = T & { install?:(app: App)=> void };
ColorPickerIns.install = (app: App):void=> {
  app.component(ColorPickerIns.name, ColorPickerIns)
}
const ColorPicker: SFCWithInstall<typeof ColorPickerIns> = ColorPickerIns
export{ColorPicker,ColorPicker as default}