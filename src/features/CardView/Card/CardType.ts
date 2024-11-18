import { ListItem } from '../../../api/useGetListData'

export interface CardType extends ListItem {
    isDeleted: boolean
    isCollapsed: boolean
}
