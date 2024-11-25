import React from 'react';
import {useState, useEffect} from 'react';
import {itemData, Item} from 'screens'

interface Props{
    data : itemData[];
}

export const Baggage = ({data} : Props) =>{
    const [baggageList, setBaggageList] = useState<itemData[] | null>([]);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    useEffect(()=>{
        setBaggageList(data)
    }, [data])

    return(
        <div className="baggage-wrap">
            <button type="button" className="btn-baggage" onClick={handleShowList}>물건 목록 보기</button>
            <div className="inner">
                {showList && baggageList?.map((val, idx)=>(
                    <div key={idx} className="minimal">
                        <Item item={val} sendItemNm={()=>{}} />
                    </div>
                ))}
            </div>
        </div>
    )
}