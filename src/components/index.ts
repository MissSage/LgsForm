import { App } from 'vue'
import Button from './Button.vue'

const components = [
  Button
]

const install: any = function(app: App) {
  if(install.installed) return
  install.installed  = true
  components.forEach(res=>{
    app.component(res.name,res)
  })
}
export default {
  install
}