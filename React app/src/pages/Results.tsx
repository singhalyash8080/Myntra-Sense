import * as React from 'react'
import { useEffect } from 'react'
import Card from '../common/components/Card'
import styles from '../styles/Results.module.css'
import useFetcher from '../common/hooks/useFetcher'
import Loader from '../common/components/Loader'
import Header from '../common/components/Header/Index'
// import { ItemType } from '../common/types'
// import ErrorScreen from '../common/components/ErrorBoundary/ErrorScreen'
import { addItemList } from '../redux/actions'
import { useDispatch } from 'react-redux'
import Error from '../common/components/Error'

export default function Results() {
    const matchedItems = useFetcher('https://myntra-sense-backend.herokuapp.com/item/findMatchedItems', 'matching')
    const similarItems = useFetcher('https://myntra-sense-backend.herokuapp.com/item/findSimilarItems', 'similar')
    const dispatch = useDispatch()
    console.log("hello");
    useEffect(() => {
        dispatch(addItemList('SIMILAR', similarItems.data))
        console.log("smilar done");

        dispatch(addItemList('MATCHED', matchedItems.data))
        console.log("matching done");
    }, [similarItems.loading, matchedItems.loading])
    if (matchedItems.loading || similarItems.loading)
        return <Loader />
    else if (matchedItems.error || similarItems.error)
        return <Error />
    console.log(similarItems.data);



    return (
        <>
            <Header />
            <div className={styles.patternMatches}>
                <h1>Similar items</h1>
                <div className={styles.patternMatchCarousel}>
                    {similarItems.data.map(item => <Card item={item} key={item._id} type="similar" />)}
                </div>
            </div>
            <h1> Matching items </h1>
            <div className={styles.matchingOutfit}>
                {
                    matchedItems.data.map(item => <Card item={item} key={item._id} type="matching" />)
                }
            </div>

        </>
    )
}