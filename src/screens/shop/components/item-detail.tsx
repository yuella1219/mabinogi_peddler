import React from 'react';
import {useState, useEffect} from 'react';
import {numberReplace} from 'core';
import {NpcShopProps} from '../../../datas'
import { ItemColorPart } from 'screens';

export type itemData = NpcShopProps['shop'][number]['item'][number];

interface DetailProps {
    item : itemData;
    getX : number;
    getY : number;
}

export const ItemDetail = ({item, getX, getY} :DetailProps) =>{
    const [optionList, setOptionList] = useState(false);
    const [colorChart, setColorChart] = useState(false);

    useEffect(()=>{
        // 옵션값 있는지 체크
        const findOption = item.item_option.length;
        if(findOption > 0){
            setOptionList(true)
        } else{
            setOptionList(false)
        }

        // 옵션 중 컬러값 있는지 체크
        const findColor = item.item_option.find((color) => color.option_type === '아이템 색상');
        if(findColor) {
            setColorChart(true)
        }else{
            setColorChart(false)
        }
    }, [item])

    const positionCalc = {
        top:`${getY}px`,
        left:`${getX - 4}px`,
    };

    return(
        <div className="item-detail" style={positionCalc}>
            <p className="name">{item.item_display_name}</p>
            {item.item_count > 1 ? (<span className="cnt">{item.item_count}개 묶음</span>) : null}
            {item.limit_value ? (<span className="limit">구매 가능 횟수 {item.limit_value}회</span>) : null}            
            {optionList ? (
                <div className="options-wrap">
                <strong className="wrap-tit">아이템 속성</strong>
                {item.item_option.map((val, idx) => (
                    <React.Fragment key={idx}>
                        {val.option_type !== '아이템 색상' ? (
                            <div className="options">
                                    {val.option_type ==='인챈트' || val.option_type === '인챈트 종류' ? null :
                                    val.option_type === '퀘스트 종류' ? (<span className="option-txt">퀘스트 내용 : </span>)
                                    : (<span className="option-txt">{val.option_type}</span>)}                                    
                                    {val.option_sub_type !== null ? (<span className="option-txt">{val.option_sub_type}</span>) : null}                                    
                                    {val.option_value !== null ? (<span className="option-txt">{val.option_value}</span>) : null}                                    
                                    {val.option_type === '공격' ? (<span className="option-txt">~</span>) : null}                                    
                                    {val.option_type === '내구력' ? (<span className="option-txt">/</span>) : null}                                    
                                    {val.option_type === '부상률' ? (<span className="option-txt">~</span>) : null}                                    
                                    {val.option_value2 !== null ? (<span className="option-txt">{val.option_value2}</span>) : null}                                    
                                    {val.option_desc !== null ? (<span className="option-txt">{val.option_desc}</span>) : null}
                                </div>
                        ) : null}
                    </React.Fragment>
                ))}
                </div>
            ) : null}
            <div className="price-wrap">
                <strong className="wrap-tit">아이템 가격</strong>
                <div className="price">
                    {numberReplace(item.price[0].price_value)}
                    <span className={item.price[0].price_type === '골드' ? "cost gold" 
                        : item.price[0].price_type === '두카트' ? "cost ducat"
                        : item.price[0].price_type === '금박 솔방울' ? "cost pinecone"
                        : "cost adv-seal"}>{item.price[0].price_type}</span>
                </div>
            </div>
            {colorChart ? (
                <div className="color-wrap">
                    <strong className="wrap-tit">색상</strong>
                    {item.item_option.map((color, idx) => (
                        <React.Fragment key={idx}>
                            {/* Key 속성 사용
                            React에서는 key가 필요한 경우 React.Fragment에 key를 지정할 수 있지만, 
                            축약형 <>에서는 key를 사용할 수 없습니다. */}
                            {color.option_type === '아이템 색상' ? (
                                <div key={idx} className="color-txt">
                                    <span>{color.option_sub_type}</span>
                                    <span className='color-code'>{color.option_value}</span>
                                    <ItemColorPart color={color.option_value} />
                                </div>
                            ) : null}                    
                        </React.Fragment>
                    ))}
                </div>
            ): null}            
        </div>
    )
}