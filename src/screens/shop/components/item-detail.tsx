import React from 'react';
import {useEffect, useRef} from 'react';
import {numberReplace} from 'core';
import {NpcShopProps} from '../../../datas'
import { ItemColorPart } from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    getX : number;
    getY : number;
}

export const ItemDetail = ({item, getX, getY} :itemProps) =>{

    const positionCalc = {
        top:`${getY}px`,
        left:`${getX - 4}px`,
    };

    return(
        <div className="item-detail" style={positionCalc}>
            <p className="name">{item.item_display_name}</p>
            {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
            {item.limit_value ? (<span className="limit">구매 가능 횟수 {item.limit_value}회</span>) : null}            
            {item.item_option.map((val, idx) => (
                <div className="options" key={idx}>
                    <span className="option-txt">{val.option_type === '아이템 색상' ? null : (val.option_type)}</span>
                    {val.option_type === '아이템 색상' ? null : <span className="option-txt">{val.option_sub_type}</span>}
                    {val.option_type === '아이템 색상' ? 
                    null: (<span className="option-txt">{val.option_value}</span>)}
                    <span className="option-txt">{val.option_value2}</span>
                    <span className="option-txt">{val.option_desc}</span>
                </div>
            ))}
            <div className="price-wrap">
                <strong className="wrap-tit">아이템 가격</strong>
                <span className="price">
                    {numberReplace(item.price[0].price_value)} <br />
                    { item.price[0].price_type === '골드' ? (<span className="gold">{item.price[0].price_type}</span>) 
                    : item.price[0].price_type === '두카트' ? (<span className="ducat">{item.price[0].price_type}</span>)
                    : item.price[0].price_type === '금박 솔방울' ? (<span className="pinecone">{item.price[0].price_type}</span>)
                    : (<span className="adv-seal">{item.price[0].price_type}</span>)
                }
                </span>
            </div>
            <div className="color-wrap">
                {item.item_option.map((color, idx) => (
                    <>
                        {color.option_type === '아이템 색상' ? (
                            <div key={idx}>
                                <span>{color.option_type}</span>
                                <span>{color.option_sub_type}</span>
                                <span className="with-color">
                                    <span className='color-code'>{color.option_value}</span>
                                    <ItemColorPart color={color.option_value} />
                                </span>
                            </div>
                        ) : null}                    
                    </>
                ))}
            </div>
        </div>
    )
}