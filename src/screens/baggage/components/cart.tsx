import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {itemData, CartItem, BtnPress} from 'screens'
import {usePopup, useBaggage} from 'core';
import {CartProps} from 'type';
import {IcoGarbage, IcoBuy} from 'image';

interface RemoveData {
    item: itemData,
    _type: boolean;
}

export const Cart = ({shopNm, data, buySts, showList} : CartProps) =>{
    const {callPopup} = usePopup();
    const {handleBuyItem} = useBaggage();
    const cartWrap = useRef<HTMLDivElement>(null);
    const [shopName, setShopName] = useState('');
    const [cartList, setCartList] = useState<itemData[]>([]); // 장바구니 담긴 아이템 목록
    const [removeList, setRemoveList] = useState<itemData[]>([]); // 삭제리스트
    const [removeData, setRemoveData] = useState<RemoveData | null>(null); // 삭제예정 데이터 임시 저장
    const [showCart, setShowCart] = useState(false); // 카트 show 토글

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
    }, [data])

    // 카트 초기화
    const resetCart = () =>{
        setCartList([]);
        buySts('buy');
    }

    // 카트 보이기
    useEffect(()=>{
        setShowCart(showList!);
    }, [showList])

    // 삭제예정 임시 리스트 업데이트
    useEffect(()=>{
        setRemoveList((prevList) => {
            if (removeData?._type) {
                return [...prevList, removeData.item];
            } else {
                // 체크 해제 시 해당 아이템 제거
                return prevList.filter((prevItem) => prevItem !== removeData?.item);
            }
        });        
    }, [removeData])
    
    // 제거 리스트 배열에 담기
    const checkedRemoveItem = (item:itemData, checked:boolean) => {
        setRemoveData({item:item, _type:checked});
    }

    // 제거 배열 비우기
    const removeListCleaner = () =>{
        const _remove = cartList.filter((remove) => !removeList.includes(remove))
        setCartList(_remove);
        // setCartList((prevItem) => (
        //     prevItem.filter((item) => !removeList.includes(item))
        // ))
        setRemoveList([])
        callPopup({
            popType:'alert',
            mainTxt:'장바구니에서 제거하였습니다',
            handleFunc : ()=>{},
        })
    }

    //장바구니에서 빼기
    const handleRemoveItems = () =>{
        if(removeList.length > 0) {
            callPopup({
                mainTxt:'장바구니 빼기',
                subTxt : '해당 아이템들을 장바구니에서 제거하시겠습니까?',
                handleFunc : () =>{removeListCleaner()},
                btnTxt : '확인',
            })
        }
    }

    // 구매하기
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
                                <CartItem item={val} removeData={checkedRemoveItem}/>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}