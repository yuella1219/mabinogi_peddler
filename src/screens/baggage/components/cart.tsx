import React from 'react';
import {useState, useEffect} from 'react';
import {itemData, Item} from 'screens'
import {useWallet} from 'core';

interface Props{
    data : itemData[];
}

export const Cart = ({data} : Props) =>{
    const {wallet, setWallet} = useWallet();
    const [cartList, setCartList] = useState<itemData[] | null>([]);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    useEffect(()=>{
        setCartList(data)
    }, [data])

    return(
        <div className="baggage-wrap">
            <div className="btn-wrap">
                <button type="button" className="btn-baggage" onClick={handleShowList}>물건 목록 보기</button>
                <button type="button" className="buy-cart">구매하기</button>
            </div>
            <div className={showList ? `inner expanded` : 'inner'}>
                {showList && cartList?.map((val, idx)=>(
                    <div key={idx} className="minimal">
                        <Item item={val} sendItemNm={()=>{}} />
                    </div>
                ))}
            </div>
        </div>
    )
}