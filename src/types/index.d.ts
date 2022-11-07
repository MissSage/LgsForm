/// <reference types="vite/client" />

import FormIns from './components/Form'
declare module 'vue'{
  export interface GlobalComponents{
    Form: typeof FormIns
  }
}
export const Form:typeof FormIns