import React from 'react';
import {useState, useEffect, useId, useRef} from 'react';
import {numberReplace} from 'core';
import {itemData} from 'screens'

interface CartItemProps {
    item : itemData;
    removeData : (item:itemData, checked:boolean) => void;
}

export const CartItem = ({item, removeData} : CartItemProps) =>{
    const thisItem = useRef<HTMLDivElement | null>(null);
    const [itemDataIn, setItemDataIn] = useState<itemData | null>(null);
    const id = useId();

    useEffect(()=>{
        setItemDataIn(item)
    }, [])
    const sendRemoveData = (event:React.MouseEvent<HTMLInputElement>) =>{
        removeData(item, event.currentTarget.checked)
    }
    return(
        <>
            {itemDataIn ? (
                <div className="cart-item">
                    <input type="checkbox" name="cart-in-item" id={id} onClick={sendRemoveData}/>
                    <label htmlFor={id}>
                        <div className="img-wrap">
                            <img src={itemDataIn.image_url} alt="" />
                        </div>
                        <p className="name">{itemDataIn.item_display_name}</p>
                        <span className="price">
                            <span>{numberReplace(item.price[0].price_value)}</span>
                            { item.price[0].price_type === '골드' ? (<span className="cost gold">{item.price[0].price_type}</span>) 
                            : item.price[0].price_type === '두카트' ? (<span className="cost ducat">{item.price[0].price_type}</span>)
                            : item.price[0].price_type === '금박 솔방울' ? (<span className="cost pinecone">{item.price[0].price_type}</span>)
                            : (<span className="cost adv-seal">{item.price[0].price_type}</span>)
                            }
                        </span>                        
                    </label>
                </div>
            ) : null}
        </>
    )
}