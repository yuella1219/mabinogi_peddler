import React from 'react';
import {useState, useEffect} from 'react';
import {Cart, Baggage} from 'screens';
import {CartProps} from 'type';
import {IcoBaggage, IcoCart} from 'image';

interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const ShopGnb = ({shopNm, data, buyState} : CartProps) =>{
    const [showCart, setShowCart] = useState(false);
    const [showBaggage, setShowBaggage] = useState(false);

    // 장바구니 온오프
    const handleShowCart = () =>{
        setShowCart(!showCart);
    }

    // 화물 온오프
    const handleShowBaggage = () =>{
        setShowBaggage(!showBaggage);
    }

    return(
        <div className="shop-gnb-wrap">
            <div className="btn-wrap">
                <button type="button" className="shop-btn cart-btn" onClick={handleShowCart}>
                    <span>장바구니</span>
                    <IcoCart />
                </button>
                <button type="button" className="shop-btn baggage-btn" onClick={handleShowBaggage}>
                    <span>적재화물</span>
                    <IcoBaggage />
                </button>
            </div>
            <div className="list-comp-wrap">
                <Cart shopNm={shopNm} data={data} buyState={buyState} showList={showCart}/>                
                {showBaggage ? (
                    <Baggage />
                ) : null}
            </div>
        </div>
    )
}