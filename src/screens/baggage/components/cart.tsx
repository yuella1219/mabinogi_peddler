import React from 'react';
import {useState, useEffect} from 'react';
import {itemData, Item, BtnPress} from 'screens'
import {useWallet, usePopup, useBaggage} from 'core';

interface Props{
    shopNm : string | null;
    data : itemData[];
}

export const Cart = ({shopNm, data} : Props) =>{
    const {wallet, setWallet} = useWallet();
    const {callPopup} = usePopup();
    const {handleBuyItem} = useBaggage();
    const [shopName, setShopName] = useState('');
    const [cartList, setCartList] = useState<itemData[] | null>([]);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    useEffect(()=>{
        if(shopNm){
            setShopName(shopNm);
            // console.log(shopName)
        }
    }, [shopNm])

    useEffect(()=>{
        setCartList(data)
    }, [data])

    useEffect(()=>{
        if(cartList){
            // console.log(cartList)
        }
    }, [cartList])

    const handleCartBuyPopup = () => {
        if(cartList){
            if(cartList.length === 0){
                callPopup({
                    popType : 'alert',
                    mainTxt : '장바구니에 담긴 아이템이 없어요',
                    handleFunc:()=>{},
                    btnTxt:'확인'
                })
            }else{
                callPopup({
                    mainTxt : '구매',
                    subTxt: '구매하시겠습니까?',
                    handleFunc : ()=>{handleBuyItem({
                        shopNm : shopName,
                        itemList : cartList,
                    })},
                    btnTxt : '구매하기',   
                })
            }
        }
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