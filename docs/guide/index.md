# istar组件库

- 基于vue3+vite3+element-plus开发的快速开发组件库
- 适用于vue3项目，其它项目没试过

## 安装

```sh
# for yarn
yarn add @missssage/lgsform

# fro npm
npm install @missssage/lgsform
```

## 全局引入

- 在main.ts中引用

```ts
import LgsForm from '@missssage/lgsform'
app.use(lgsForm)
```

- 使用

```html
<template>
  <Form ref="refForm" :config="FormConfig"></Form>
</template>
```

```ts
<script lang="ts" setup>
const refForm = ref<InstanceType<typeof Form>>()
const FormConfig = reactive<__lgsform.IFormConfig>({
  group: [
    {
      fields: [
        {type: 'input',label: '搜索',field: 'keyword'}
      ]
    },
    {
      fields: [
        {
          type: 'btn-group',
          btns: [
          {
            perm: true,
            text:'提交',
            click: () => {
              refForm.value.Submit()
            }
          }
        ]}
      ]
    }
  ],
  submit: async (params: any) => {
    await postFormData(params)
  }
})
</sript>
```
