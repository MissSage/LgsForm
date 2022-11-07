// formValidate  currencyRules
// 输入验证 不允许空格
export function validateText(rule, value, callback) {
  if (value.trim() !== '') {
    callback()
  } else {
    callback(new Error('请输入有效字符 空格无效'))
  }
}
export function validateNumber(rule, value, callback) {
  const valid = /^[0-9]*$/
  if (valid.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入数字'))
  }
}
export function validateIp(rule, value, callback) {
  const reg = /^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的ip地址'))
  }
}

export function validatenumEng(rule, value, callback) {
  const reg1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,30}$/
  if (reg1.test(value)) {
    callback()
  } else {
    callback(new Error('请输入数字和英文的组合'))
  }
}
export default {
  // 常用输入验证
  // text: [{ required: true, validator: validateText, trigger: 'blur' }]
  text: [
    { required: true, message: '请输入信息', trigger: 'blur' },
    {
      min: 2, max: 18, message: '输入字符长度在2到18之间', trigger: 'blur'
    },
    { validator: validateText, trigger: 'blur' }
  ],
  port: [
    { required: true, message: '请输入tcp端口号', trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' }
  ],
  portName: [
    { required: true, message: '请输入RTU串口名', trigger: 'blur' },
    { validator: validatenumEng, trigger: 'blur' }
  ],
  host: [
    { required: true, message: '请输入TCP 地址', trigger: 'blur' },
    { validator: validateIp, trigger: 'blur' }
  ]
}

export const validatePhone = (rule, value, callback) => {
  // const valid = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g
  const valid = /^1\d{10}$/
  if (value === '' || value === null) {
    callback()
  } else if (valid.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确手机号'))
  }
}

export const postcode = (rule, value, callback) => {
  const valid = /^[1-9][0-9]{5}$/
  if (value === '' || value === null) {
    callback()
  } else if (valid.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确邮政编码'))
  }
}

export const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[34578]\d{9}$$/
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
    // 所以在前面加了一个+实现隐式转换

    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else if (phoneReg.test(value)) {
      callback()
    } else {
      callback(new Error('电话号码格式不正确'))
    }
  }, 100)
}
export const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}
