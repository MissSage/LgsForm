import Form from './components/Form'
declare module 'vue'{
  export interface GlobalComponents{
    Form: typeof Form
  }
}