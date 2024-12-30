import React from 'react';
import {useState, useEffect} from 'react';
import {itemData, Item, BtnPress} from 'screens'
import {useWallet, usePopup, useBaggage} from 'core';

interface Props{
    shopNm : string | null;
    data : itemData | null;
}

export const Cart = ({shopNm, data} : Props) =>{
    const {callPopup} = usePopup();
    const {baggage, handleBuyItem} = useBaggage();
    const [shopName, setShopName] = useState('');
    const [cartList, setCartList] = useState<itemData[]>([]);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    useEffect(()=>{
        if(shopNm){
            setShopName(shopNm);
        }
    }, [shopNm])

    useEffect(()=>{
        if(data !== null){
            setCartList((prevItem) => [...prevItem, data as itemData])
        }
    }, [data])

    // useEffect(()=>{
    //     if(cartList){
    //         console.log(cartList)
    //     }
    // }, [cartList])

    const resetCart = () =>{
        setCartList([]);
    }

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
                        initCart : resetCart,
                    })},
                    btnTxt : '구매하기',   
                })
            }
        }
    }

    return(
        <div className="baggage-wrap cart">
            <div className="btn-wrap">
                <BtnPress btnTxt={showList ? '목록 닫기' : '물건 목록 보기'} func={handleShowList} />
                {showList ? (<BtnPress btnTxt={'구매하기'} func={handleCartBuyPopup}/>) : null}
            </div>
            <div className={showList ? `inner expanded` : 'inner'}>
                {showList && cartList?.map((val, idx)=>(
                    <div key={idx} className="minimal">
                        <Item item={val} sendItem={()=>{}} detailData={()=>{}} />
                    </div>
                ))}
            </div>
        </div>
    )
}