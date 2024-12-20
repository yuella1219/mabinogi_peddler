import React from 'react';
import {useState, useEffect} from 'react';
import {itemData, Item, BtnPress} from 'screens'
import {useWallet, usePopup} from 'core';

interface Props{
    data : itemData[];
}

export const Cart = ({data} : Props) =>{
    const {wallet, setWallet} = useWallet();
    const {callPopup} = usePopup();
    const [cartList, setCartList] = useState<itemData[] | null>([]);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    useEffect(()=>{
        setCartList(data)
    }, [data])

    const handleCartBuyPopup = () => {
        callPopup({
            mainTxt : '구매하기',
            subTxt: '구매하시겠습니까?',
            handleFunc : ()=>{},
            btnTxt : '구매하기',   
        })
    }

    return(
        <div className="baggage-wrap">
            <div className="btn-wrap">
                <BtnPress btnTxt={showList ? '목록 닫기' : '물건 목록 보기'} func={handleShowList} />
                {showList ? (<BtnPress btnTxt={'구매하기'} func={handleCartBuyPopup}/>) : null}
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