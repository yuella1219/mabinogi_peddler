import React from 'react';
import {useState, useEffect} from 'react';
import {BaggageProps, useBaggage, usePopup} from 'core';
import {itemData, Item, BtnPress} from 'screens'

interface Props{
    data : itemData[];
}

export const Baggage = () =>{
    const {baggage} = useBaggage();
    const {callPopup} = usePopup();
    const [baggageList, setBaggageList] = useState<BaggageProps[] | []>([]);
    const [sellNpcName, setSellNpcName] = useState('');
    const [sellItemData, setSellItemData] = useState<itemData | null>(null);
    const [showList, setShowList] = useState(false);

    const handleShowList = () =>{
        setShowList(!showList);
    }

    const handleBaggageSellItems = () =>{
        callPopup({
            mainTxt:'판매',
            subTxt : '판매하시겠습니까?',
            handleFunc : ()=>{},
            btnTxt : '판매'
        })
    }

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
            <BtnPress btnTxt={'적재화물 확인'} func={handleShowList}/>
            <div className={showList ? `inner expanded` : 'inner'}>
                {showList && baggageList.map((val, idx)=>(
                    <div className="baggage-list-wrap" key={idx}>
                        <strong className="baggage-shop-name">{val.npcName}</strong>
                        <div key={idx} className="minimal">
                            {val.items.map((el, idxItems)=>(
                                <div key={idxItems}>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}