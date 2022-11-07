/// <reference types="vite/client" />

import FormIns from './components/Form'
declare module 'vue'{
  export interface GlobalComponents{
    Form: typeof FormIns
  }
}
declare module 'lgsform' {
  export const Form: typeof FormIns
}