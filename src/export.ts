import { App, Plugin } from 'vue'
import AttrTable from './packages/es/AttrTable'
import AttrTableCellContent from './packages/es/AttrTableCellContent'
import AvatarUploader from './packages/es/AvatarUploader'
import Button from './packages/es/Button'
import CardSearch from './packages/es/CardSearch'
import CardTable from './packages/es/CardTable'
import ColorPicker from './packages/es/ColorPicker'
import DialogForm from './packages/es/DialogForm'
import FieldSet from './packages/es/FieldSet'
import Form from './packages/es/Form'
import FormItem from './packages/es/FormItem'
import FormTable from './packages/es/FormTable'
import FormTableColumn from './packages/es/FormTableColumn'
import FormTree from './packages/es/FormTree'
import FormWangeditor from './packages/es/FormWangeditor'
import ImgViewer from './packages/es/ImgViewer'
import ImportButton from './packages/es/ImportButton'
import InlineForm from './packages/es/InlineForm'
import List from './packages/es/List'
import Pagination from './packages/es/Pagination'
import RangeSelecter from './packages/es/RangeSelecter'
import Search from './packages/es/Search'
import SearchMore from './packages/es/SearchMore'
import Tabs from './packages/es/Tabs'
import Tag from './packages/es/Tag'
import TagGroup from './packages/es/TagGroup'
import TiniImageUploader from './packages/es/TiniImageUploader'
import Videor from './packages/es/Videor'
import Voicer from './packages/es/Voicer'
const components = [
  AttrTable,
  AttrTableCellContent,
  AvatarUploader,
  Button,
  CardSearch,
  CardTable,
  ColorPicker,
  DialogForm,
  FieldSet,
  Form,
  FormItem,
  FormTable,
  FormTableColumn,
  FormTree,
  FormWangeditor,
  ImgViewer,
  ImportButton,
  InlineForm,
  List,
  Pagination,
  RangeSelecter,
  Search,
  SearchMore,
  Tabs,
  Tag,
  TagGroup,
  TiniImageUploader,
  Videor,
  Voicer,
]

const LgsForm: Plugin = {
  install(app: App) {
    components.map(component => app.component(component.name, component))
  }
}
export {
  AttrTable,
  AttrTableCellContent,
  AvatarUploader,
  Button,
  CardSearch,
  CardTable,
  ColorPicker,
  DialogForm,
  FieldSet,
  Form,
  FormItem,
  FormTable,
  FormTableColumn,
  FormTree,
  FormWangeditor,
  ImgViewer,
  ImportButton,
  InlineForm,
  List,
  Pagination,
  RangeSelecter,
  Search,
  SearchMore,
  Tabs,
  Tag,
  TagGroup,
  TiniImageUploader,
  Videor,
  Voicer,
}
export default LgsForm