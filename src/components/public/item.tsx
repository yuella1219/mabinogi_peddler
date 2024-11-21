import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {NpcShopProps} from '../../api/api'

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    sendItemNm : (props:string) => void;
}

export const Item = ({item, sendItemNm} :itemProps) =>{
    const thisItem = useRef<HTMLAnchorElement>(null);

    const addToCart = () =>{
        if(thisItem.current){
            const nm = thisItem.current.querySelector('.name') as HTMLParagraphElement;
            sendItemNm(nm.innerText);
        }
    }

    return(
        <a role="button" className="item" onClick={addToCart} ref={thisItem}>
            <div className="img-wrap">
                <img src={item.image_url} className="" alt="" />
            </div>
            <p className="name">{item.item_display_name}</p>
            <p className="price">{item.price[0].price_value} <span>{item.price[0].price_type}</span></p>
            {item.item_option.map((val, idx) => (
                <div className="options" key={idx}>
                    <p>{val.option_type}</p>
                    <p>{val.option_sub_type}</p>
                    <p>{val.option_value}</p>
                    <p>{val.option_value2}</p>
                    <p>{val.option_desc}</p>
                </div>
            ))}
        </a>
    )
}