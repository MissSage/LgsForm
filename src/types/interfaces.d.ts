// export type IButtonType =
//   | 'default'
//   | 'success'
//   | 'warning'
//   | 'info'
//   | 'primary'
//   | 'danger'
//   | 'text'
// export type ISize = 'small' | 'large' | 'default' | ''
// export type NormalOption = {
//   id?: string
//   label: string
//   value: any
//   data?: any
//   disabled?: boolean | ((value?: any, row?: any, ...args: any[]) => boolean)
//   path?: string[] | number[]
//   parent?: string | number
//   children?: NormalOption[]
//   icon?: string
//   svgIcon?: string
//   type?: string
//   isLeaf?: boolean
//   /** 单位 表单中值第一个参数为值，第二个参数为表单数据，第三个值为当前表单元素的配置 */
//   unit?: string | ((val: any, row: any, config: any) => any)
// }
// export type MoreFilterConditions = {
//   label?: string
//   value?: any
//   filter?: IFormItem
//   formatter?: (val: any, row?: any, filter?: IFormItem) => any
// }
// export type IButton = {
//   type?: IButtonType | ((row?: any) => IButtonType)
//   text?: string | ((row?: any) => string)
//   icon?: string | ((row?: any) => string)
//   iconStyles?: Record<string, any> | ((row?: any) => Record<string, any>)
//   svgIcon?: any
//   color?: string | ((row?: any) => string)
//   styles?: Record<string, any> | ((row?: any) => string)
//   className?: string | ((row?: any) => string)
//   perm?: boolean | ((row?: any) => boolean)
//   size?: ISize
//   disabled?: boolean | ((row?: any) => boolean)
//   // 隐藏 true隐藏/false显示
//   hide?: boolean | ((row?: any) => boolean)
//   loading?: boolean | ((row?: any) => boolean)
//   isTextBtn?: boolean
//   /** 是不是正方形的按钮 */
//   isBlockBtn?: boolean
//   click?: (row?: any, ...args) => void
//   /**
//    * 没有封装到Button组件中，自行在外层业务中添加逻辑,
//    * 提交按钮配置和row数据
//    */
//   component?: any
//   link?: boolean
//   // 是否镂空
//   plain?: boolean
//   // 是否为圆形按钮
//   circle?: boolean
//   // 只显示图标时设置此项
//   title?: string
//   // 下拉菜单
//   items?: any[]
// }

// export interface IFormItemBase {
//   refId?: string
//   id?: string
//   type: string
//   field?: string
//   label?: string
//   hidden?: boolean
//   /**
//    * 指定此表单元素可以根据指定条件进行显隐
//    *
//    * @params params 表单的数据
//    * @params formItem 当前表单的配置
//    *
//    */
//   handleHidden?: (params: any, query: any, formItem: IFormItem) => void
//   style?:
//     | Record<string, any>
//     | ((value: any, row: any, formItem: IFormItem) => Record<string, any>)
//   placeholder?: string
//   readonly?: boolean | ((value: any, row: any, formItem: IFormItem) => boolean)
//   rules?: IFormItemRule
//   aInfo?: boolean
//   size?: ISize
//   clearable?: boolean
//   labelWidth?: string | number | 'auto'
//   /**
//    * 单位, 当设置此项时，会附加在表单元素的尾端
//    */
//   unit?: string

//   /**
//    * 输入框尾部内容，只对非 type="textarea" 有效
//    */
//   suffix?: string
//   /**
//    * 输入框头部内容，只对非 type="textarea" 有效
//    */
//   prefix?: string
//   /**
//    * 输入框前置内容，只对非 type="textarea" 有效
//    */
//   prepend?: string | IFormSelect
//   prependDefault?: any
//   /**
//    * 输入框后置内容，只对非 type="textarea" 有效
//    */
//   append?: string | IFormSelect
//   appendDefault?: any
//   appendBtns?: IButton[]
//   /** 表单元素的盒子的样式 el-form-item */
//   itemContainerStyle?: string | Record<string, any>
//   colStyles?: Record<string, any> | string
//   className?: string
//   xs?: number
//   sm?: number
//   md?: number
//   lg?: number
//   xl?: number
//   /** 额外的表单，即一个标签对应多个表单 */
//   extraFormItem?: IFormItem[]
//   /** 绑定到表单元素本身的宽度 */
//   width?: string | number
//   noBorder?: boolean
//   // #append 按钮
//   btn?: IButton
//   /**
//    * 格式化表单值
//    */
//   formatter?: (val, row?, config?: IFormItem) => any
//   /** 当值变化时的回调，这个只会在能够绑定值的item中都会生效 Only effect with bind a value */
//   onChange?: (...args: any[]) => any
//   /** 在点击由 clearable 属性生成的清空按钮时触发 */
//   onClear?: (...args: any[]) => any
//   onFocus?: (...args: any[]) => any
//   onBlur?: (...args: any[]) => any
// }
// export interface IFormInput extends IFormItemBase {
//   type: 'input' | 'password' | 'textarea'
//   inputType?:
//     | 'text'
//     | 'textarea'
//     | 'button'
//     | 'checkbox'
//     | 'color'
//     | 'date'
//     | 'datetime-local'
//     | 'email'
//     | 'file'
//     | 'image'
//     | 'month'
//     | 'number'
//     | 'password'
//     | 'radio'
//     | 'range'
//     | 'reset'
//     | 'search'
//     | 'submit'
//     | 'tel'
//     | 'time'
//     | 'url'
//     | 'week'
//   /** 最大输入长度 */
//   maxlength?: number | string
//   /** 最小输入长度 */
//   minlength?: number | string
//   /** 显示统计数字 */
//   showWordLimit?: boolean
//   /** 显示切换密码图标 */
//   showPassword?: boolean
//   /** 自定义前缀图标 */
//   prefixIcon?: any
//   /** 自定义后缀图标 */
//   suffixIcon?: any
//   /** 输入框行数，仅type=textarea时生效 */
//   rows?: number
//   /** 自适应文本域,仅type=textarea时生效，当值为Object时，属性有： minRows:number,maxRows: number */
//   autosize?: boolean | Object
//   /** 单独配置autosize的属性：最大行数, 配置了autosize时不生效 */
//   maxRow?: number
//   /** 单独配置autosize的属性：最小行数, 配置了autosize时不生效 */
//   minRow?: number
//   /** 原生autocomplete属性 */
//   autocomplete?: boolean
//   disabled?: boolean | ((value: any, row: any, formItem: IFormItem) => boolean)
//   /** 最大值 */
//   max?: number
//   /** 最小值 */
//   min?: number
//   /** 设置输入字段 的合法数字间隔 */
//   step?: number
//   /** 控制是否能被用户缩放 */
//   resize?: 'none' | 'both' | 'horizontal' | 'vertical'
//   /** 自动获得焦点 */
//   autofocus?: boolean
//   /** 用来控制通过tab切换输入框焦点时的顺序 */
//   tabindex?: number | string
//   /** 是否在输入时触发表单的校验 */
//   validateEvent?: boolean
//   /** input元素或textarea元素的style */
//   inputStyle?: Object
//   controlPosition?: 'right'
// }
// export interface IFormInputNumber extends IFormItemBase {
//   type: 'input-number'
// }
// export interface IFormText extends IFormItemBase {
//   type: 'text'
// }
// export interface IFormPassword extends IFormItemBase {
//   type: 'password'
// }
// export interface IFormTextArea extends IFormItemBase {
//   type: 'textarea'
//   minRow?: number
//   maxRow?: number
// }
// export interface IFormNumber extends IFormItemBase {
//   type: 'number'
//   min?: number
//   max?: number
//   controlPosition?: 'right'
// }
// export interface IFormSelect extends IFormItemBase {
//   type: 'select'
//   multiple?: boolean
//   allowCreate?: boolean
//   options?: NormalOption[]
//   remote?: boolean
//   returnType?: 'str' | 'arr'
//   remoteMethod?: (val: any) => NormalOption[]
//   setOptionBy?: string
//   setOptionMethod?: (config: any, row: any) => any
//   disableOption?: (option?: any, value?: any, row?: any) => boolean
// }
// export interface ICascaderProps {
//   checkStrictly?: boolean
//   label?: string
//   value?: string
//   children?: string
//   emitPath?: boolean
// }
// export interface ISelectTreeProps {
//   label?: string
//   children: string
//   isLeaf?: string
//   disabled?: string
//   class?: string
// }
// export interface IFormCascader extends IFormItemBase {
//   type: 'cascader'
//   props?: ICascaderProps
//   multiple?: boolean
//   options?: NormalOption[]
// }
// export interface IFormCheckbox extends IFormItemBase {
//   type: 'checkbox'
//   options?: NormalOption[]
// }
// export interface IFormRadio extends IFormItemBase {
//   type: 'radio' | 'radio-button'
//   options?: NormalOption[]
//   suffix?:
//     | string
//     | ((option: NormalOption, val: any, row: any, config: IFormRadio) => string)
//   prefix?:
//     | string
//     | ((option: NormalOption, val: any, row: any, config: IFormRadio) => string)
//   suffixStyle?:
//     | Record<string, any>
//     | ((option: NormalOption, val: any, row: any, config: IFormRadio) => any)
//   prefixStyle?:
//     | Record<string, any>
//     | ((option: NormalOption, val: any, row: any, config: IFormRadio) => any)
//   /** 统一给元素添加样式 */
//   itemStyle?:
//     | Record<string, any>
//     | ((val: any, row: any, config: IFormRadio) => any)
//   itemClick?: () => any
// }

// export interface IFormSwitch extends IFormItemBase {
//   type: 'switch'
//   activeText?: string
//   inActiveText?: string
//   activeColor?: string
//   inActiveColor?: string
//   /** switch的宽度 */
//   width?: number
//   activeValue?: string | boolean
//   inActiveValue?: string | boolean
//   inlinePrompt?: boolean
// }
// export interface IFormDate extends IFormItemBase {
//   type: 'date' | 'datetime' | 'month' | 'year'
//   min?: string
//   max?: string
//   format?: string
//   textFormat?: string
// }
// export interface IFormDateRange extends IFormItemBase {
//   type: 'daterange' | 'datetimerange' | 'monthrange' | 'yearrange'
//   min?: string
//   max?: string
//   format?: string
//   textFormat?: string
//   rangeSeparator?: string
// }
// export interface IFormTime extends IFormItemBase {
//   type: 'time'
//   min?: string
//   max?: string
//   format?: string
//   isRange?: boolean
// }
// export interface IFormEditor extends IFormItemBase {
//   type: 'editor'
// }
// export interface IFormUploader extends IFormItemBase {
//   type: 'uploader'
//   desc?: string
//   multiple?: boolean
//   maxFile?: number
//   maxSize?: number
//   autoUpload?: boolean
//   fileTypes?: string[]
//   downLoad?: boolean
//   uploadBefore?: (...args: any[]) => void
//   uploadAfter?: (...args: any[]) => void
//   removeBefore?: (...args: any[]) => void
//   fileClick?: (...args: any[]) => void
// }
// export interface IFormImgUploader extends IFormItemBase {
//   type: 'image'
//   url?: string
//   limit?: number
//   multiple?: boolean
//   returnType?: 'arrStr' | 'comma'
// }
// export interface IAvatarUploader extends IFormItemBase {
//   type: 'avatar'
//   url?: string
//   tips?: string
// }
// export interface IFormFileUploader extends IFormItemBase {
//   type: 'file'
//   url?: string
//   limit?: number
//   multiple?: boolean
//   returnType?: 'arrStr' | 'comma'
//   tips?: string
// }
// export interface IFormAMap extends IFormItemBase {
//   type: 'amap'
//   required?: boolean
//   resultType?: 'str' | 'arrStr'
// }
// export interface IFormUser extends IFormItemBase {
//   type: 'user'
//   height?: string
//   width?: string
//   /**
//    * 多选返回的是用逗号分隔的字符串
//    */
//   multiple?: boolean
//   checkUsers?: (users: any) => void
// }
// export interface TagNormalOption extends NormalOption {
//   width?: string | number
//   data?: {
//     suffix?: string
//     prefix?: string
//     suffixStyle?: string | Record<string, any>
//     prefixStyle?: Record<string, any> | string
//     style?: Record<string, any>
//   }
// }
// export interface ITagGroup extends IFormItemBase {
//   type: 'tags'
//   cancelable?: boolean
//   options: TagNormalOption[]
//   width?: string | number
//   height?: string | number
//   color?: string
//   border?: string
//   className?: string
//   /** 激活时的背景色 */
//   activeColor?: string
//   /** 激活时的文本颜色 */
//   activeTextColor?: string
//   btns?: IButton[]
// }

// export interface IFormTableColumn {
//   /** 表列头的表单配置 */
//   headerFormItemConfig?: IFormItem
//   /**
//    * 表头label
//    */
//   label: string
//   /**
//    * 字段
//    */
//   prop: string
//   /**
//    * 右边单位
//    */
//   unit?: string
//   /**
//    * 左边的单位
//    */
//   preUnit?: string
//   /**
//    * 表格项图标
//    */
//   icon?: string
//   iconStyle?:
//     | Record<string, any>
//     | ((row, val, config: IFormTableColumn) => Record<string, any>)
//   symbolIcon?: any
//   svgIcon?: any
//   /**
//    * 是否显示成图片
//    */
//   image?: boolean
//   /** 是否显示为tag */
//   tag?: boolean
//   /** tag的颜色 */
//   tagColor?: string | ((row, val) => any)
//   /** tag是否圆角 */
//   tagRound?: boolean
//   /**
//    * 表格列 是否必填，需要配全formItemConfig的rules来正确的进行表单验证
//    */
//   required?: boolean
//   /**
//    * 列宽
//    */
//   width?: string | number

//   /**
//    * 列的布局
//    */
//   align?: 'left' | 'center' | 'right'
//   /**
//    * 最小宽度
//    */
//   minWidth?: string | number
//   /**
//    * 是否是固定列/固定位置
//    */
//   fixed?: 'right' | 'left' | boolean
//   /**
//    * 当配置此项时为表单元素显示，表单元素的配置
//    */
//   formItemConfig?: IFormItem
//   /**
//    * 单元格的样式
//    */
//   cellStyle?:
//     | StyleSheet
//     | Record<string, string>
//     | string
//     | ((row: any, val: any, field?: string) => any)
//   className?: string
//   /**
//    * 格式化文本内容
//    */
//   formatter?: (row: any, value: any, field: string) => any
//   /** 是否合计此列 */
//   summary?: boolean
//   handleClick?: (row: any) => any
//   /**
//    * 子列，用于多级表头
//    */
//   subColumns?: IFormTableColumn[]
//   /** 声音播放组件 */
//   isVoice?: boolean
//   showUrl?: boolean
//   download?: boolean
//   isVideo?: boolean
//   isUrl?: boolean
//   // 启用排序
//   sortable?: boolean
//   /** 隐藏列 */
//   hidden?: boolean | (() => boolean)
// }
// export interface IPagination {
//   /** 当页码和条数改变时会触发此方法，设置此方法将使handSize和handlePage失效 */
//   refreshData?: (pageSize: { page: number; size: number }) => any
//   hide?: boolean
//   page?: number
//   limit?: number
//   total?: number
//   align?: 'left' | 'right' // 默认在左侧
//   /** 操作按钮布局 默认total,sizes, prev, pager, next, jumper */
//   layout?: string // 分布布局
//   pageSize?: number[]
//   handleSize?: (size: number) => any
//   handlePage?: (page: number) => any
// }
// export interface ITableIndex {
//   label?: string
//   width?: string
//   align?: string
//   fixed?: 'right'
//   showRank?: boolean
// }
// export interface ITable {
//   title?: string
//   loading?: boolean
//   /**
//    * table标题右侧的操作按钮
//    */
//   titleRight?: {
//     style?: Record<string, any>
//     className?: string
//     items: IFormItem[]
//   }[]
//   /**
//    * 配置包括表头在内的默认查询条件
//    */
//   titleDefaultValue?: any
//   handleQuery?: (val: any, item?: IFormItem, group?: IFormFieldGroup) => any
//   /**
//    * 斑马条纹
//    */
//   stripe?: boolean
//   border?: boolean
//   dataList: any[]
//   /**
//    * 表格列配置
//    */
//   columns: IFormTableColumn[]
//   indexVisible?: ITableIndex | boolean
//   defaultSort?: {
//     order: 'ascending' | 'descending'
//     prop: string
//   }
//   sort?: {
//     // topColors?: string[] // 暂时无用
//     showBackground?: boolean
//     order?: 'ascending' | 'descending'
//     prop?: string
//   }
//   // 树形结构
//   rowKey?: string

//   /**
//    * 表格高度
//    */
//   height?: string | number
//   /** 最大高度 */
//   maxHeight?: string | number
//   /**
//    * 操作栏的按钮
//    */
//   operations?: IButton[]
//   /**
//    * 操作栏表头自定义
//    */
//   operationHeader?: IFormItem
//   /**
//    * 操作栏固定，boolean或者left|right
//    */
//   operationFixed?: boolean | string
//   /** 操作栏宽度 */
//   operationWidth?: string | number
//   /** 分页组件 */
//   pagination: IPagination
//   /** 表格已选项，需要通过 handleSelectChange方法来填充此项 */
//   selectList?: any[]
//   /** 控制行是否可选 */
//   selectable?: (row, index) => boolean
//   /** 当前选中行 需要通过 handleRowClick 方法来填充此项 */
//   currentRow?: any
//   /** 高亮当前行 */
//   highlightCurrentRow?: boolean
//   // 当前行的 key，只写属性
//   currentRowKey?: string
//   /** 是否显示合计 */
//   showSummary?: boolean
//   /** 是否是可展开的table */
//   expandable?: boolean
//   /** 默认展开子级 */
//   defaultExpandAll?: boolean
//   /** 给展开行传一个组件 */
//   expandComponent?: any
//   /** 合计计算方法 */
//   summaryMethod?: (params: any, data: any) => any
//   /** 合并行列的方法 */
//   spanMethod?: ({ row, column, rowIndex, columnIndex }) => {
//     rowspan: number
//     colspan: number
//   }
//   /** checkbox触发方法 配置此项才会显示checkbox */
//   handleSelectChange?: (val: any) => any
//   /**
//    * 是否是单选表格，需要配置rowKey,同时需要设置select方法来接收选中的行，并判断是否选中来给selectedList赋值以同步checkbox选中状态
//    */
//   singleSelect?: boolean
//   /**
//    * 如果配置了singleSelect,则要设置selectList=[row]来更新选中状态
//    */
//   select?: (row: any, ischecked?: boolean) => any
//   /** 行点击事件 */
//   handleRowClick?: (row: any) => any
//   /**
//    * 行双击点击事件
//    */
//   handleRowDbClick?: (row: any) => any
// }
// export interface IFormTable extends IFormItemBase {
//   type: 'table'
//   config: ITable
// }
// export interface IFormCardTable extends IFormTable {
//   type: 'card-table'
//   /**
//    * 表格标题
//    */
//   title?: string
//   /** 标题右侧的操作配置 */
//   titleRight?: {
//     style?: Record<string, any>
//     className?: string
//     items: IFormItem[]
//   }[]
//   /**
//    * 表格搜索
//    */
//   handleQuery?: (
//     queryParams: any,
//     item?: IFormItem,
//     group?: IFormFieldGroup
//   ) => any
// }
// export interface ICardTable extends ITable {
//   title?: string
//   titleRight?: {
//     className?: string
//     style?: Record<string, any>
//     items: IFormItem[]
//   }[]
//   /**
//    * 表格搜索
//    */
//   handleQuery?: (
//     queryParams: any,
//     item?: IFormItem,
//     group?: IFormFieldGroup
//   ) => any
// }
// export interface IFormButtonGroup extends IFormItemBase {
//   type: 'btn-group'
//   btns: IButton[]
// }
// export interface ITabs extends IFormItemBase {
//   type: 'tabs'
//   closable?: boolean
//   theme?: 'darkblue' | 'dark'
//   tabs: NormalOption[]
//   tabType?: 'simple' | 'card' | 'inset' | 'border-card'
//   btns?: IButton[]
//   handleTabClick?: (tab: any, event: Event) => any
//   /**
//    * 移除标签的回调
//    * @param tabName 移除的标签
//    * @param nextTabName 自动选中时的标签，当不存在时，即已经没有标签时，值为undefined
//    */
//   handleTabRemove?: (
//     tabName: string | number,
//     nextTabName?: string | number
//   ) => any
//   /** 在移除标签后是否自动选中下一个 默认true */
//   selectNextAfterRemove?: boolean
//   // 标签的宽度是否自撑开
//   stretch?: boolean
// }
// export interface IIconSelector extends IFormItemBase {
//   type: 'icon-selector'
//   title?: string
//   defaultType?: 'ali' | 'ele' | 'awe' | ''
//   clearable?: boolean

//   onClear?: () => void
// }
// export interface IProgress extends IFormItemBase {
//   type: 'progress'
// }
// export interface ISelectTree extends IFormItemBase {
//   type: 'select-tree'
//   /** 绑定数据 */
//   options: NormalOption[]
//   /** 指定值对应的键 */
//   valueKey?: string
//   /** 选择任意级别 默认false */
//   checkStrictly?: boolean
//   /** 多选 默认false */
//   multiple?: boolean
//   /** 显示多选框 默认false, 只在muLtiple开启时才生效 */
//   showCheckbox?: boolean
//   /** 可筛选 默认true */
//   filterable?: boolea
//   lazy?: boolean
//   props?: ISelectTreeProps
//   defaultExpandAll?: boolean
//   lazyLoad?: (node: any, resolve) => void
//   nodeClick?: (data: NormalOption, node: any, component: any) => any
// }
// export interface IAttrTableRow {
//   label?: string
//   value?: string
//   prop?: string
//   /** 值列合并列数 */
//   cols?: number
//   className?: string
//   cellStyle?: Record<string, any>

//   /**
//    * 右边单位
//    */
//   unit?: string
//   /**
//    * 左边的单位
//    */
//   preUnit?: string
//   /**
//    * 表格项图标
//    */
//   icon?: string
//   iconStyle?:
//     | Record<string, any>
//     | ((row, val, config?: IFormTableColumn) => Record<string, any>)
//   symbolIcon?: any
//   svgIcon?: any
//   /**
//    * 是否显示成图片
//    */
//   image?: boolean
//   // 是否显示音频
//   audio?: boolean
//   // 是否显示视频
//   video?: boolean
//   // 是否显示文件
//   file?: boolean
//   /** 是否显示为tag */
//   tag?: boolean
//   /** tag的颜色 */
//   tagColor?: string | ((row, val) => any)
//   /** tag是否圆角 */
//   tagRound?: boolean
//   /**
//    * 最小宽度
//    */
//   minWidth?: string | number
//   /**
//    * 当配置此项时为表单元素显示，表单元素的配置
//    */
//   formItemConfig?: IFormItem
//   /**
//    * 单元格的样式
//    */
//   cellStyle?:
//     | Record<string, string>
//     | string
//     | ((row: any, val: any, field?: string) => any)
//   className?: string
//   handleClick?: (row: any) => any
//   /** 声音播放组件 */
//   isVoice?: boolean
//   showUrl?: boolean
//   download?: boolean
//   /**
//    * 格式化文本内容
//    */
//   formatter?: (row: any, value: any, field: string) => any
// }
// export interface TinyImageUploaderExtraButton extends IButton {
//   click: (row?: { value?: any; config?: ITinyImageUploader }) => void
// }
// export interface ITinyImageUploader extends IFormItemBase {
//   type: 'image-tiny'
//   url?: string
//   /**
//    * 默认上传按钮的文字
//    */
//   btnText?: string
//   /** 添加额外的按钮 */
//   extraBtns?: TinyImageUploaderExtraButton[]
// }
// export interface IFormTree extends IFormItemBase {
//   type: 'tree'
//   options: NormalOption[]
//   // check?: (data:NormalOption, checkOptions:{
//   //   checkedNodes:any[]
//   //   checkedKeys:any[]
//   //   halfCheckedNodes:any[]
//   //   halfCheckedKeys:any[]
//   // })=>any

//   /**
//    * 当节点复选框被选中时的回调
//    * @param data 节点数据
//    * @param isChecked 节点本身是否被选中
//    * @param hasChildChecked 节点的子树中是否有被选中的节点
//    */
//   handleCheckChange?: (
//     data: NormalOption,
//     isChecked: boolean,
//     hasChildChecked: boolean
//   ) => any
//   /** 选择任意级别 默认false */
//   checkStrictly?: boolean
//   loading?: boolean | ((row: any, val: any) => boolean)
//   /** 多选 默认false */
//   multiple?: boolean
//   /** 显示多选框 默认false, 只在muLtiple开启时才生效 */
//   showCheckbox?: boolean
//   /** 可筛选 默认true */
//   filterable?: boolean
//   props?: ISelectTree
//   /**
//    * 当值对应的字段不为id时，需要指定此项，不然拿不到值
//    */
//   nodeKey?: string

//   nodeClick?: (data: NormalOption, node: any, component: any) => any
// }
// export interface IFormList extends IFormItemBase {
//   type: 'list'
//   data: any[]
//   loading?: boolean | ((row: any, val: any) => boolean)
//   highlightCurrentRow?: boolean
//   /**
//    * 指定显示的字段，如果数据是字符串数组，则不用指定此项
//    */
//   displayField?: string
//   wrapperStyle?: Record<string, any>
//   listStyle?: Record<string, any>
//   showCheckbox?: boolean
//   singleSelect?: boolean

//   filters?: IFormItem[]
//   /** 列表头部搜索表单的包裹元素的样式 */
//   filterWrapperStyle?: Record<string, any>
//   filterDefaultValue?: any
//   setDataBy?: string
//   setData?: (config: any, row: any) => any
//   /**
//    * 指定值的字段，可选择时需要指定，如果数据是字符串数组，则不用指定此项
//    */
//   valueField?: string
//   itemStyle?:
//     | Record<string, any>
//     | ((params: any, ...args: any[]) => Record<string, any>)
//   itemClass?: string | ((params: any) => string)
//   nodeClick?: (node?: any, row?: any) => any
//   nodeDBClick?: (node?: any, row: any) => any
// }
// export interface IAttrTable {
//   attributes?: {
//     label: string
//     value: any
//   }[]
//   rows?: IAttrTableRow[][]
//   data?: any
//   columns?: IAttrTableRow[][]
// }
// export interface IFormAttrTable extends IFormItemBase {
//   type: 'attr-table'
//   config: IAttrTable
// }
// export interface IFormVChart extends IFormItemBase {
//   type: 'vchart'
//   option: any
//   handleHighlight?: (...args: any[]) => any
//   handleClick?: (...args: any[]) => any
//   handleZRClick?: (...args: any[]) => any
// }
// type ColorAttrType = 'hex' | 'hex8' | 'hsl' | 'hsv' | 'rgba' | ''
// export interface IFormColorPicker extends IFormItemBase {
//   type: 'color-picker'
//   colorType?: ColorAttrType
// }
// interface IFormTag extends IFormItemBase {
//   type: 'tag'
//   round?: boolean
//   color?: string | ((row?: any, val?: any) => string)
// }
// /**
//  * 传入一个组件
//  * props:
//  * 1、 row： 当前form的所有表单值的对象
//  * 2、 modelValue: 当前组件绑定的值，可选
//  * event:
//  * 1、 change: 绑定值变动时触发的回调，参数为绑定值
//  */
// export interface IComponent extends IFormItemBase {
//   type: 'component'
//   component: any
// }
// export interface IRangeInput extends IFormItemBase {
//   type: 'range'
//   /** 范围类型： select: 下拉框，input: 输入框， year: 年份选择 */
//   rangeType?: 'select' | 'input' | 'year' | ''
//   /** 选项 仅rangeType值为select时可用 */
//   options?: NormalOption[]
//   startPlaceHolder?: string
//   endPlaceHolder?: string
//   /** 中间分隔符号，默认~ */
//   separator?: string
//   /** 动态控制选项是否可选 rangeType值为select时可用 */
//   startOptionDisabled?: (option: NormalOption, end: any) => boolean
//   /** 动态控制选项是否可选 rangeType值为select时可用 */
//   endOptionDisabled?: (option: NormalOption, start: any) => boolean
// }
// export type IFormItem =
//   | IFormSelect
//   | IFormInput
//   | IFormText
//   | IFormPassword
//   | IFormTextArea
//   | IFormNumber
//   | IFormEditor
//   | IFormUploader
//   | IFormCascader
//   | IFormCheckbox
//   | IFormRadio
//   | IFormSwitch
//   | IFormDate
//   | IFormDateRange
//   | IFormTime
//   | IFormImgUploader
//   | IAvatarUploader
//   | IFormAMap
//   | IFormTable
//   | IFormCardTable
//   | IFormUser
//   | IFormInputNumber
//   | IFormFileUploader
//   | ITagGroup
//   | IFormButtonGroup
//   | ITabs
//   | IIconSelector
//   | ISelectTree
//   | ITinyImageUploader
//   | IFormTree
//   | IFormWangEditor
//   | IFormAnnex
//   | IFdivider
//   | IFormList
//   | IFormAttrTable
//   | IFormVChart
//   | IComponent
//   | IRangeInput
//   | IFormColorPicker
//   | IFormTag

// /** fieldset */
// export interface IFormFieldset {
//   width?: string | number
//   type?: 'simple' | 'default' | 'underline'
//   /**
//    * 描述内容
//    */
//   desc?: string
//   style?: Record<string, any>
//   right?: {
//     className?: string
//     style?: Record<string, any>
//     items: IFormItem[]
//   }[]
//   handleQuery?: (
//     val: any,
//     params: any,
//     item: IFormItem,
//     column: IFormFieldGroup
//   ) => any
// }

// /**
//  * 一个表单字段组
//  */
//  export interface IFormFieldGroup {
//   /**
//    * 标识字段组
//    */
//   id?: any
//   /**
//    * fieldset分组，可以通过right配置右侧选项，支持FormItem中所有选项
//    */
//   fieldset?: IFormFieldset
//   /**
//    * 元素间隔
//    */
//   gutter?: number
//   /**
//    * 表单元素
//    */
//   fields: IFormItem[]
//   hidden?: boolean
//   handleHidden?: (row: any, query: any, group: IFormFieldGroup) => void
//   groupBtns?: {
//     btns: IButton[]
//     className?: string
//     styles?: string | Record<string, any>
//     /** inlineform中不生效，用styles或className来处理 */
//     xs?: number
//     /** inlineform中不生效，用styles或className来处理 */
//     sm?: number
//     /** inlineform中不生效，用styles或className来处理 */
//     md?: number
//     /** inlineform中不生效，用styles或className来处理 */
//     lg?: number
//     /** inlineform中不生效，用styles或className来处理 */
//     xl?: number
//   }
//   styles?: Record<string, any> | string
// }
// export interface IFormConfig {
//   /**
//    * 是否表单结构不会变更，设置此项可以适当提高性能
//    */
//   static?: boolean
//   /**
//    * 元素间隔
//    */
//   gutter?: number
//   /** 表单字段配置 */
//   group: IFormFieldGroup[]
//   /** 标签宽度，在InlineForm中生效，且可以被表单元素的width覆盖 */
//   labelWidth?: string | number
//   /** 标签位置 */
//   labelPosition?: 'top' | 'left' | 'right'
//   /** 表单中嵌套的查询项的默认值 */
//   defaultQuerys?: Record<string, any>
//   /** 表单默认值 */
//   defaultValue?: Record<string, any>
//   /** 控件大小  'large' | 'default' | 'small' */
//   size?: ISize
//   /** 提交方法,设置此项才会显示确定按钮 */
//   submit?: (params: any, status?: boolean) => any
//   /** 只是标记当前是否处理提交状态，可用此状态来处理按钮状态 */
//   submitting?: boolean
// }
// export interface IDialogFormConfig extends IFormConfig {
//   /** 弹窗标题 */
//   title?: string
//   /** 弹窗宽度 60% */
//   dialogWidth?: number | string
//   /** 取消按钮 true */
//   cancel?: boolean
//   /** 提交的加载状态 false */
//   submitting?: boolean
//   /** 弹窗可拖拽 false */
//   draggable?: boolean
//   /** 弹窗全屏 false */
//   fullscreen?: boolean
//   /** 弹窗距顶部距离 margin-top 15vh */
//   top?: string
//   /** 遮罩层 true */
//   model?: boolean
//   /** 点击遮罩关闭弹窗 false */
//   closeOnClickModal?: boolean
//   /** 按esc键关闭弹窗 false */
//   closeOnPressEscape?: boolean
//   /** 显示右上角关闭按钮 true */
//   showClose?: boolean
//   /** 在关闭时销毁DOM true */
//   desTroyOnClose?: boolean
//   // 自定义按钮
//   btns?: IButton[]
//   // 是否启用打印
//   print?: boolean
//   // 打印配置
//   printConfigure?: any
// }
// export interface ISearch {
//   size?: ISize
//   filters?: IFormItem[]
//   moreFilters?: IFormItem[]
//   // rightFilters?: IFormItem[]
//   defaultParams?: Record<string, any>
//   handleSearch?: (params: any) => void
//   labelWidth?: string | number
//   // hiddenFields?: string[]
//   /**
//    * 是否表单结构不会变更，设置此项可以适当提高性能
//    */
//   static?: boolean
// }

// export interface IFormWangEditor extends IFormItemBase {
//   type: 'wangeditor'
//   // 图片上传地址
//   url?: string
//   // 菜单模式
//   mode?: 'default' | 'simple'
// }

// export interface IFormAnnex extends IFormItemBase {
//   type: 'hint'
//   // 显示内容
//   text: string
// }

// // 表单分割线
// export interface IFdivider extends IFormItemBase {
//   type: 'divider'
//   // 文本
//   text: string
//   // 方向
//   direction?: 'horizontal' | 'vertical'
//   // 样式
//   borderStyle?:
//     | 'none'
//     | 'dotted'
//     | 'inset'
//     | 'dashed solid'
//     | 'dashed double none'
//     | 'dashed groove none dotted'
//   // 文本位置
//   contentPosition?: 'left' | 'center' | 'right'
// }
