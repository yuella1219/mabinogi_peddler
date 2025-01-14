import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {numberReplace} from 'core';
import {NpcShopProps} from '../../../datas'
import {ItemDetail} from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    key : string;
    sendItem: (item:itemData) => void;
    detailData : (data:itemData | null) => void;
    sendItemPosition : (getX:number, getY:number) => void;
}

export const Item = ({item, key, sendItem, detailData, sendItemPosition} :itemProps) =>{
    const thisItem = useRef<HTMLButtonElement>(null);

    const addToCart = () =>{
        if(thisItem.current){
            sendItem(item);
        }
    }
    // 디테일 데이터 보내기
    const showItemDetail = () => {

        const getClientRectData = thisItem.current?.getBoundingClientRect();
        if (getClientRectData) sendItemPosition(getClientRectData.x, getClientRectData.y);
        detailData(item);
    }

    // 디테일 언마운트
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
                    <span className="price-type">{numberReplace(item.price[0].price_value)}</span>
                    { item.price[0].price_type === '골드' ? (<span className="gold cost">{item.price[0].price_type}</span>) 
                    : item.price[0].price_type === '두카트' ? (<span className="ducat cost">{item.price[0].price_type}</span>)
                    : item.price[0].price_type === '금박 솔방울' ? (<span className="pinecone cost">{item.price[0].price_type}</span>)
                    : (<span className="adv-seal cost">{item.price[0].price_type}</span>)
                }
                </span>
            </button>
        </>            
    )
}