import React from 'react';
import {useEffect, useRef} from 'react';
import {numberReplace} from 'core';
import {NpcShopProps} from '../../../datas'
import { ItemColorPart } from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
}

export const ItemDetail = ({item} :itemProps) =>{

    return(
        <div className="item-detail">
            <span className="img-wrap">
                <img src={item.image_url} className="" alt="" />
            </span>
            <span className="name">{item.item_display_name}</span>
            {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
            {item.limit_value ? (<span className="limit">구매 가능 횟수 {item.limit_value}회</span>) : null}
            <span className="price">
                {numberReplace(item.price[0].price_value)} <br />
                { item.price[0].price_type === '골드' ? (<span className="gold">{item.price[0].price_type}</span>) 
                : item.price[0].price_type === '두카트' ? (<span className="ducat">{item.price[0].price_type}</span>)
                : item.price[0].price_type === '금박 솔방울' ? (<span className="pinecone">{item.price[0].price_type}</span>)
                : (<span className="adv-seal">{item.price[0].price_type}</span>)
            }
            </span>
            {item.item_option.map((val, idx) => (
                <span className="options" key={idx}>
                    <span className="option-txt">{val.option_type}</span>
                    <span className="option-txt">{val.option_sub_type}</span>
                    {val.option_type === '아이템 색상' ? 
                    (
                        <span className="with-color">
                            <span className='color-code'>{val.option_value}</span>
                            <ItemColorPart color={val.option_value} />
                        </span>
                    ) : (<span className="option-txt">{val.option_value}</span>)}
                    <span className="option-txt">{val.option_value2}</span>
                    <span className="option-txt">{val.option_desc}</span>
                </span>
            ))}
        </div>
    )
}