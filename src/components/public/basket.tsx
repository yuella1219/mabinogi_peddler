import React from 'react';
import {useState, useEffect} from 'react';
import {itemData} from '../../components';

interface BasketData {
    data : itemData;
}

export const Basket = ({data}:BasketData) => {
    const [addItem, setAddItem] = useState<itemData | null>(null)
    useEffect(()=>{
        setAddItem(data)
    }, [data])
    return(
        <div>
            {/* {item.length > 0 ? item.map((nm, idx)=>(
                <p key={idx}>{nm.shop[0].item[0].item_display_name}</p>
            ))
            : <p>empty</p>
        } */}
        </div>
    )
}