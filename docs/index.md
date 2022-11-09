[[toc]]

# header

## h1

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

:tada: :100:

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::

::: raw
Wraps in a div
:::

```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!codeㅤ hl]
    }
  }
}
```

```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!codeㅤ focus]
    }
  }
}
```

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!codeㅤ --]
      msg: 'Added' // [!codeㅤ ++]
    }
  }
}
```

```js
export default {
  data () {
    return {
      msg: 'Error', // [!codeㅤ error]
      msg: 'Warning' // [!codeㅤ warning]
    }
  }
}
```

