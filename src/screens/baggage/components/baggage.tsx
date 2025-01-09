import React from 'react';
import {useState, useEffect} from 'react';
import {BaggageProps, SellItemProps, useBaggage, usePopup} from 'core';
import {itemData, BaggageItem, BtnPress} from 'screens'

export const Baggage = () =>{
    const {baggage, handleSellItem} = useBaggage();
    const {callPopup} = usePopup();
    const [baggageList, setBaggageList] = useState<BaggageProps[] | []>([]);
    const [sellItemData, setSellItemData] = useState<SellItemProps | null>(null);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    const getSellItemData = ({shopNm, item}:SellItemProps) => {
        setSellItemData({shopNm, item})        
    };
    
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
        }
    }, [baggage])

    return(
        <div className="baggage-wrap">
            <div className="expanded inner">
                {baggageList.map((val, idx)=>(
                    <div className="baggage-list-wrap" key={idx}>
                        <strong className="baggage-shop-name">{val.npcName}</strong>
                        <div key={idx} className="minimal">
                            {val.items.map((el, idxItems)=>(
                                <div key={idxItems}>
                                    <BaggageItem 
                                        item={el} 
                                        npcNm={val.npcName} 
                                        sendItemNm={getSellItemData} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}