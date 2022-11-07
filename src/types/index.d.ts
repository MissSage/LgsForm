/// <reference types="vite/client" />

import {Form} from '../packages/es/Form'
declare module 'vue'{
  export interface GlobalComponents{
    Form
  }
}
export{
  Form
} 
export default {
  Form
}