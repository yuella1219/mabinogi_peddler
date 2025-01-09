import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {itemData, CartItem, BtnPress} from 'screens'
import {usePopup, useBaggage} from 'core';
import {CartProps} from 'type';
import {IcoGarbage, IcoBuy} from 'image';

export const Cart = ({shopNm, data, buyState, showList} : CartProps) =>{
    const {callPopup} = usePopup();
    const {handleBuyItem} = useBaggage();
    const cartWrap = useRef<HTMLDivElement>(null);
    const [shopName, setShopName] = useState('');
    const [cartList, setCartList] = useState<itemData[]>([]);
    const [showCart, setShowCart] = useState(false);

    // 샵 이름 받아오기
    useEffect(()=>{
        if(shopNm){
            setShopName(shopNm);
        }
    }, [shopNm])

    // 구매 데이터 array 적재하기
    useEffect(()=>{
        if(data !== null){
            setCartList((prevItem) => [...prevItem, data as itemData])
        }
        console.log(cartList)
    }, [data])

    // 카트 초기화
    const resetCart = () =>{
        setCartList([]);
        buyState(true);
    }

    // 카트 보이기
    useEffect(()=>{
        setShowCart(showList!);
    }, [showList])

    //장바구니에서 빼기
    const handleRemoveItems = () =>{
        if(cartWrap.current){
            const list = cartWrap.current;
            const removeList = Array(list.querySelectorAll('input:checked'));
        }
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
        <>
            <div className={showList ? 'cart-wrap show' : 'cart-wrap'}>
                <div className="wrap">
                    {/* 구매하기 */}
                    <button className="shop-btn" onClick={handleCartBuyPopup}>
                        <IcoBuy />
                    </button>
                    {/* 장바구니에서 빼기 */}
                    <button className="shop-btn" onClick={handleRemoveItems}>
                        <IcoGarbage />
                    </button>
                </div>
                <div className="inner">
                    {/* 배경용 격자 */}
                    <div className="plaid-wrap">
                        <div className="plaid-row">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="plaid-col">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {/* // 배경용 격자 */}
                    <div className="cart-item-wrap" ref={cartWrap}>
                        {cartList?.map((val, idx)=>(
                            <React.Fragment key={idx}>
                                <CartItem item={val}/>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}