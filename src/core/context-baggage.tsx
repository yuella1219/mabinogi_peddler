import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import type { WalletProps } from 'type';
import {useWallet} from 'core';
import {Baggage, itemData} from 'screens'

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
}

const BaggageContext = createContext<BaggageContextType|null>(null);

export const Baggageprovider = ({children} : {children : ReactNode}) =>{
    const {wallet, setWallet} = useWallet();
    const [baggage, setBaggage] = useState<BaggageProps[] | []>([]);
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
    const handleBuyItem = ({shopNm, itemList} : BuyItemProps) =>{
        let wholeCost:WalletProps = {
            gold:0,
            ducat:0,
            pinecone:0,
            seal:0,
        }

        const _getBuyItem = () => {
            itemList.forEach((idx) => {
                idx.price.forEach((cost) => {
                    const key = cost.price_type as keyof WalletProps;
                    if(wholeCost[key]){
                        wholeCost[key] += cost.price_value;
                    }
                })
            })
            return wholeCost;
        }
        
        _getBuyItem();
        // if(wallet)
        
        console.log(wholeCost)
        // if(baggage){
        //     setBaggage((prevItem)=>[...prevItem, {
        //         npcName : shopNm,
        //         items : itemList,
        //     }])
        // }
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