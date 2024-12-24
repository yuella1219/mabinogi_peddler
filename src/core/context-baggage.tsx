import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import type { WalletProps } from 'type';
import {useWallet, usePopup} from 'core';
import {itemData} from 'screens'

export type BaggageContextType = {
    baggage: BaggageProps[] | null;
    setBaggage: React.Dispatch<React.SetStateAction<BaggageProps[] | []>>;
    handleBuyItem:(shopNm:BuyItemProps) => void;
  };

export type BaggageProps = {
    npcName : string;
    items : itemData[]
}

export type BuyItemProps = {
    shopNm : string;
    itemList : itemData[];
    initCart : ()=>void;
}

const BaggageContext = createContext<BaggageContextType|null>(null);

export const Baggageprovider = ({children} : {children : ReactNode}) =>{
    const {wallet, setWallet} = useWallet();
    const {callPopup} = usePopup();
    const [baggage, setBaggage] = useState<BaggageProps[] | []>(() => {
        if (typeof window !== "undefined") {
          const savedBaggage = localStorage.getItem("myBaggage");
          return savedBaggage ? JSON.parse(savedBaggage) : [];
        }
        return [];
      });
    const [_dataInit, _setDataInit] = useState(false)

      useEffect(() => {
        if (typeof window !== 'undefined') {
            const _get = localStorage.getItem('myBaggage')
                ? JSON.parse(localStorage.getItem('myBaggage') as string)
                : null;
    
            if (_get) {
                setBaggage(_get); // 상태 업데이트는 초기화 한 번만 실행
            }
        }
    }, []); // 초기화는 한 번만 실행
    
    // 구매 로직
    const handleBuyItem = ({shopNm, itemList, initCart} : BuyItemProps) =>{
        // 구매 총액 초기화
        let wholeCost:WalletProps = {
            gold:0,
            ducat:0,
            pinecone:0,
            seal:0,
        }

        // 장바구니 금액 합산
        itemList.forEach((idx) => {
            idx.price.forEach((cost) => {
                if(cost.price_type === '골드'){
                    wholeCost['gold'] += cost.price_value;
                }
                else if(cost.price_type === '두카트'){
                    wholeCost['ducat'] += cost.price_value;
                }
                else if(cost.price_type === '금박 솔방울'){
                    wholeCost['pinecone'] += cost.price_value;
                }
                else if(cost.price_type === '모험가의 인장'){
                    wholeCost['seal'] += cost.price_value;
                }
            })
        })
        
        if(wallet){
            const _gold = wallet.gold - wholeCost.gold;
            const _ducat = wallet.ducat - wholeCost.ducat;
            const _pinecone = wallet.pinecone - wholeCost.pinecone;
            const _seal = wallet.seal - wholeCost.seal;

            if(_gold < 0){
                callPopup({
                    popType:'alert',
                    mainTxt:'골드가 부족해요',
                    handleFunc:()=>{},
                })
            }else if(_ducat < 0){
                callPopup({
                    popType:'alert',
                    mainTxt:'두카트가 부족해요',
                    handleFunc:()=>{},
                })
            }else if(_pinecone < 0){
                callPopup({
                    popType:'alert',
                    mainTxt:'금박 솔방울이 부족해요',
                    handleFunc:()=>{},
                })
            }else if(_seal < 0){
                callPopup({
                    popType:'alert',
                    mainTxt:'모험가의 인장이 부족해요',
                    handleFunc:()=>{},
                })
            }else{
                if(baggage){
                    const _findPrevItemsList = baggage.find((name) => name.npcName === shopNm);
                    if(_findPrevItemsList){
                        setBaggage((prevItem)=>
                            prevItem.map((npc)=>
                                npc.npcName === shopNm
                                ? {
                                    ...npc,
                                    items: [...npc.items, ...itemList],
                                }
                                : npc
                            )
                        )
                    }else{
                        setBaggage((prevItem)=>[...prevItem, {
                            npcName : shopNm,
                            items : itemList,
                        }])
                    }
                }
                setWallet({
                    gold : _gold,
                    ducat : _ducat,
                    pinecone : _pinecone,
                    seal : _seal
                })
                initCart();
                callPopup({
                    popType:'alert',
                    mainTxt:'구매가 완료되었어요',
                    handleFunc : ()=>{},
                })
            }
        }
    }

      useEffect(()=>{
        if(baggage){
            localStorage.setItem('myBaggage', JSON.stringify(baggage));
        }
      }, [baggage])
    
      return(
        <BaggageContext.Provider value={{baggage, setBaggage, handleBuyItem}}>
            {children}
        </BaggageContext.Provider>
      )
}

export const useBaggage = () =>{
    const context = useContext(BaggageContext);
    if(!context){
        throw new Error('마 읍따');
    }
    return context;
}