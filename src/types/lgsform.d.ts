import { App, Plugin } from 'vue';

export type SFCWithInstall<T> = T & { install?: (app: App) => void };
export declare const AttrTable: SFCWithInstall<typeof import('../packages/components/AttrTable.vue')['default']>
export declare const AttrTableCellContent: SFCWithInstall<typeof import('../packages/components/AttrTableCellContent.vue')['default']>
export declare const AvatarUploader: SFCWithInstall<typeof import('../packages/components/AvatarUploader.vue')['default']>
export declare const Button: SFCWithInstall<typeof import('../packages/components/Button.vue')['default']>
export declare const CardSearch: SFCWithInstall<typeof import('../packages/components/CardSearch.vue')['default']>
export declare const CardTable: SFCWithInstall<typeof import('../packages/components/CardTable.vue')['default']>
export declare const ColorPicker: SFCWithInstall<typeof import('../packages/components/ColorPicker.vue')['default']>
export declare const DialogForm: SFCWithInstall<typeof import('../packages/components/DialogForm.vue')['default']>
export declare const FieldSet: SFCWithInstall<typeof import('../packages/components/FieldSet.vue')['default']>
export declare const Form: SFCWithInstall<typeof import('../packages/components/Form.vue')['default']>
export declare const FormItem: SFCWithInstall<typeof import('../packages/components/FormItem.vue')['default']>
export declare const FormTable: SFCWithInstall<typeof import('../packages/components/FormTable.vue')['default']>
export declare const FormTableColumn: SFCWithInstall<typeof import('../packages/components/FormTableColumn.vue')['default']>
export declare const FormTree: SFCWithInstall<typeof import('../packages/components/FormTree.vue')['default']>
export declare const FormWangeditor: SFCWithInstall<typeof import('../packages/components/FormWangeditor.vue')['default']>
export declare const ImgViewer: SFCWithInstall<typeof import('../packages/components/ImgViewer.vue')['default']>
export declare const ImportButton: SFCWithInstall<typeof import('../packages/components/ImportButton.vue')['default']>
export declare const InlineForm: SFCWithInstall<typeof import('../packages/components/InlineForm.vue')['default']>
export declare const List: SFCWithInstall<typeof import('../packages/components/List.vue')['default']>
export declare const Pagination: SFCWithInstall<typeof import('../packages/components/Pagination.vue')['default']>
export declare const RangeSelecter: SFCWithInstall<typeof import('../packages/components/RangeSelecter.vue')['default']>
export declare const Search: SFCWithInstall<typeof import('../packages/components/Search.vue')['default']>
export declare const SearchMore: SFCWithInstall<typeof import('../packages/components/SearchMore.vue')['default']>
export declare const Tabs: SFCWithInstall<typeof import('../packages/components/Tabs.vue')['default']>
export declare const Tag: SFCWithInstall<typeof import('../packages/components/Tag.vue')['default']>
export declare const TagGroup: SFCWithInstall<typeof import('../packages/components/TagGroup.vue')['default']>
export declare const TiniImageUploader: SFCWithInstall<typeof import('../packages/components/TiniImageUploader.vue')['default']>
export declare const Videor: SFCWithInstall<typeof import('../packages/components/Videor.vue')['default']>
export declare const Voicer: SFCWithInstall<typeof import('../packages/components/Voicer.vue')['default']>
declare const LgsForm: {
    install: any
}
export default LgsForm