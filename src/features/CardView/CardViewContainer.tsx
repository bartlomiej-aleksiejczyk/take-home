import { useEffect, useState } from 'react'
import { ListItem, useGetListData } from '../../api/getListData'
import { Spinner } from '../../components/Spinner'
import { CardView } from './CardView'

export const CardViewContainer = () => {
    const [visibleCards, setVisibleCards] = useState<ListItem[]>([])
    const listQuery = useGetListData()

    // TOOD
    // const deletedCards: DeletedListItem[] = [];

    useEffect(() => {
        if (listQuery.isLoading) {
            return
        }

        setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? [])
    }, [listQuery.data, listQuery.isLoading])

    if (listQuery.isLoading) {
        return <Spinner />
    }

    return <CardView visibleCards={visibleCards} />
}
