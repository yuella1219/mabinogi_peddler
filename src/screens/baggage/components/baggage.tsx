import React from 'react';
import {useState, useEffect} from 'react';
import {BaggageProps, SellItemProps, useBaggage, usePopup} from 'core';
import {itemData, BaggageItem, BtnPress} from 'screens'
import {IcoSell} from 'image';

export const Baggage = () =>{
    const {baggage, handleSellItem} = useBaggage();
    const {callPopup} = usePopup();
    const [baggageList, setBaggageList] = useState<BaggageProps[] | []>([]);
    const [sellItemData, setSellItemData] = useState<SellItemProps | null>(null);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    // 판매 아이템 데이터 받아오기
    const getSellItemData = ({shopNm, item}:SellItemProps) => {
        setSellItemData({shopNm, item})        
    };
    
    // 단일클릭
    useEffect(()=>{
        if(sellItemData){
            callPopup({
                mainTxt:'판매',
                subTxt : '판매하시겠습니까?',
                handleFunc : ()=>{handleSellItem(sellItemData)},
                btnTxt : '판매'
            })
        }
    }, [sellItemData])

    const handleBaggageSellAllItems = () =>{
        callPopup({
            mainTxt:'전체 판매',
            subTxt : '모두 판매하시겠습니까?',
            handleFunc : ()=>{},
            btnTxt : '전체 판매'
        })
    }

    useEffect(()=>{
        if(baggage !== null){
            setBaggageList(baggage)
            setSellItemData(null);
        }
    }, [baggage])

    return(
        <div className="baggage-wrap">
            <div className="inner">
                {baggageList.map((val, idx)=>(
                    <div className="baggage-whole-info-wrap" key={idx}>
                        <div className="wrap">
                            <strong className="baggage-shop-name">{val.npcName}</strong>
                            <div>
                                <button type="button" className="shop-btn"><IcoSell /></button>
                            </div>
                        </div>
                        <div className="baggage-list-wrap" key={idx}>
                            {/* 배경용 격자 */}
                            <div className="plaid-wrap">
                                <div className="plaid-row">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="plaid-col">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            {/* // 배경용 격자 */}
                            <div className="scroll-wrap">
                                {val.items.map((el, idxItems)=>(
                                    <React.Fragment key={idxItems}>
                                        <BaggageItem 
                                            item={el} 
                                            npcNm={val.npcName} 
                                            sendItemNm={getSellItemData} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}