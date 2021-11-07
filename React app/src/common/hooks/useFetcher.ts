import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addItemList} from '../../redux/actions'
import { ItemType } from '../types'
//import { image } from '../assets/sample-test'


const useFetcher = (url:string, type :string) => {
    const [data, setData] = useState<ItemType[]>([])
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const itemsList = useSelector((state : any) => state.itemsList)
    const image = useSelector((state : any) => state.image)
    //data:image/jpeg;base64,
    const imageData = {
            image : image
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                if(itemsList.similar < 1 || itemsList.matching < 1)
                {
                    console.log("aloo");
                    
                    const dataItems = await fetch(url,{
                        method: "POST",
                        body: JSON.stringify(imageData),
                        headers: {
                            'Content-Type':'application/json'
                        }
                    });
                    const dataJson = await dataItems.json();
                    console.log(type,dataJson.itemsArray);
                    setData(dataJson.itemsArray)
                }
                else{
                    setData(itemsList[type])
                }
            }catch(e) {
                setError(e);
                console.log(e);
            }
        setLoading(false)
        }
        fetchData()
        //eslint-disable-next-line
    }, [])
    return {loading, error, data}
}

export default useFetcher

//