import React from 'react';
import {useEffect, useRef} from 'react';
import {NpcShopProps} from '../../../datas'
import { ItemColorPart } from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface itemProps {
    item : itemData;
    type? : string;
    sendItemNm: (nm:string, cnt?:number, color?:string) => void;
}

export const Item = ({item, sendItemNm, type="default"} :itemProps) =>{
    const thisItem = useRef<HTMLButtonElement>(null);

    const addToCart = () =>{
        if(thisItem.current){
            const nm = thisItem.current.querySelector('.name') as HTMLSpanElement;
            const cnt = thisItem.current.querySelector('.cnt') as HTMLSpanElement;
            const col = item?.item_option.find((txt) => txt.option_type === '아이템 색상');
            
            if(cnt){
                sendItemNm(nm.innerText, item.item_count);
            }else if(col){
                const val = col?.option_value;
                sendItemNm(nm.innerText, undefined, val);
            }
            else{
                sendItemNm(nm.innerText);
            }
            
        }
    }

    return(
        <button className="item" onClick={addToCart} ref={thisItem}>
            <span className="img-wrap">
                <img src={item.image_url} className="" alt="" />
            </span>
            <span className="name">{item.item_display_name}</span>
            {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
            {item.limit_value ? (<span className="limit">구매 가능 횟수 {item.limit_value}회</span>) : null}
            <span className="price">{item.price[0].price_value} <span>{item.price[0].price_type}</span></span>
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
        </button>
    )
}