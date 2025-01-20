import React from 'react';
import {useEffect, useRef} from 'react';
import {numberReplace, SellItemProps} from 'core';
import {NpcShopProps} from 'datas'

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    npcNm : string;
    sendItemNm: ({shopNm, item} :SellItemProps) => void;
    sellFunc ?: () => void;
}

export const BaggageItem = ({item, sendItemNm, npcNm, sellFunc} :itemProps) =>{
    const thisItem = useRef<HTMLButtonElement>(null);

    const addToCart = () =>{
        sendItemNm({shopNm:npcNm, item:item})
    }

    return(
        <button className="item" onClick={addToCart} ref={thisItem}>
            <span className="img-wrap">
                <img src={item.image_url} className="" alt="" />
            </span>
            <span className="name">{item.item_display_name}</span>
            {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
            {item.limit_value ? (<span className="limit">구매 가능 횟수 {item.limit_value}회</span>) : null}
            <span className="price">
                {numberReplace(item.price[0].price_value)} 
                { item.price[0].price_type === '골드' ? (<span className="gold">{item.price[0].price_type}</span>) 
                : item.price[0].price_type === '두카트' ? (<span className="ducat">{item.price[0].price_type}</span>)
                : item.price[0].price_type === '금박 솔방울' ? (<span className="pinecone">{item.price[0].price_type}</span>)
                : (<span className="adv-seal">{item.price[0].price_type}</span>)
            }
            </span>
        </button>
    )
}