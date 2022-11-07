type SFCWithInstall<T> = T & { install?:(app: App)=> void };
import FormIns from '../packages/components/Form.vue'
export declare const Form: SFCWithInstall<typeof FormIns>
export default Form