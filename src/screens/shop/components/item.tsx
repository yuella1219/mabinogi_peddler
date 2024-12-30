import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {numberReplace} from 'core';
import {NpcShopProps} from '../../../datas'
import {ItemDetail} from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    sendItem: (item:itemData) => void;
    detailData : (data:itemData | null) => void;
}

export const Item = ({item, sendItem, detailData} :itemProps) =>{
    const thisItem = useRef<HTMLButtonElement>(null);

    const addToCart = () =>{
        if(thisItem.current){
            sendItem(item);
        }
    }

    const showItemDetail = () => {
        detailData(item);
    }

    const hideItemDetail = () => {
        detailData(null);
    }

    return(
        <>
            <button className="item" onClick={addToCart} ref={thisItem} onMouseEnter={showItemDetail} onMouseLeave={hideItemDetail}>
                <span className="img-wrap">
                    <img src={item.image_url} className="" alt="" />
                </span>
                <span className="name">{item.item_display_name}</span>
                {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
                <span className="price">
                    <span>{numberReplace(item.price[0].price_value)}</span>
                    { item.price[0].price_type === '골드' ? (<span className="gold">{item.price[0].price_type}</span>) 
                    : item.price[0].price_type === '두카트' ? (<span className="ducat">{item.price[0].price_type}</span>)
                    : item.price[0].price_type === '금박 솔방울' ? (<span className="pinecone">{item.price[0].price_type}</span>)
                    : (<span className="adv-seal">{item.price[0].price_type}</span>)
                }
                </span>
            </button>
        </>            
    )
}