/// <reference types="vite/client" />
import FormIns from '../packages/components/Form.vue'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@missssage/lgsform'{
  export const Form: typeof FormIns
}