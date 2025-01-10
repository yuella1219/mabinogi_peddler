import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import type { WalletProps } from 'type';
import {useWallet, usePopup} from 'core';
import {itemData} from 'screens'

export type BaggageContextType = {
    baggage: BaggageProps[] | null;
    setBaggage: React.Dispatch<React.SetStateAction<BaggageProps[] | []>>;
    handleBuyItem:(shopNm:BuyItemProps) => void;
    handleSellItem : ({shopNm, item} : SellItemProps) => void;
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

export type SellItemProps = {
    shopNm : string;
    item : itemData | null;
    all? : boolean;
}

const BaggageContext = createContext<BaggageContextType|null>(null);

export const BaggageProvider = ({children} : {children : ReactNode}) =>{
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

    // 판매 로직
    const handleSellItem = ({item, shopNm, all} : SellItemProps) =>{
        
        const npcTab = baggage.find((npc) => npc.npcName === shopNm);
        if (!npcTab) return;

        if(all){
            const getItem = npcTab.items;

            let _appendG = wallet!.gold;
            let _appendD = wallet!.ducat;
            let _appendP = wallet!.pinecone;
            let _appendS = wallet!.seal;

            getItem!.map((item)=>(
                item.price.find((cost : any) => {
                    if(cost.price_type === '골드'){
                        _appendG = _appendG += cost.price_value;
                    }
                    else if(cost.price_type === '두카트'){
                        _appendD = _appendD += cost.price_value;
                    }
                    else if(cost.price_type === '금박 솔방울'){
                        _appendP = _appendP += cost.price_value;
                    }
                    else if(cost.price_type === '모험가의 인장'){
                        _appendS = _appendS += cost.price_value;
                    }
                })
            ))

            const updatedBaggage = baggage.filter((npc) => {
                // npcName이 shopNm과 다르면 유지
                if (npc.npcName !== shopNm) {
                    return true;
                }
            });
            
            setWallet({
                gold : _appendG,
                ducat : _appendD,
                pinecone : _appendP,
                seal : _appendS,
            });
            
            callPopup({
                popType : 'alert',
                mainTxt : '전체 판매가 완료되었어요.',
                handleFunc:()=>{},
            })
        
            // 상태 업데이트
            setBaggage(updatedBaggage);

        }else{
            const getItem = npcTab.items.find((el) => el === item);

            let _appendG = wallet!.gold;
            let _appendD = wallet!.ducat;
            let _appendP = wallet!.pinecone;
            let _appendS = wallet!.seal;
    
            getItem!.price.find((cost : any) => {
                if(cost.price_type === '골드'){
                    _appendG = _appendG += cost.price_value;
                }
                else if(cost.price_type === '두카트'){
                    _appendD = _appendD += cost.price_value;
                }
                else if(cost.price_type === '금박 솔방울'){
                    _appendP = _appendP += cost.price_value;
                }
                else if(cost.price_type === '모험가의 인장'){
                    _appendS = _appendS += cost.price_value;
                }
            })
            
            setWallet({
                gold : _appendG,
                ducat : _appendD,
                pinecone : _appendP,
                seal : _appendS,
            });
    
            const updatedBaggage = baggage.filter((npc) => {
                // npcName이 shopNm과 다르면 유지
                if (npc.npcName !== shopNm) {
                    return true;
                }
            
                // npcName이 shopNm이고 items 길이가 1이면 삭제
                if (npc.items.length === 1) {
                    return false;
                }
            
                // npcName이 shopNm이고 items가 여러 개인 경우, 특정 아이템만 삭제
                npc.items = npc.items.filter((item) => item !== getItem);
                return true;
            });
            callPopup({
                popType : 'alert',
                mainTxt : '판매가 완료되었어요.',
                handleFunc:()=>{},
            })
        
            // 상태 업데이트
            setBaggage(updatedBaggage);
        }
    }

      useEffect(()=>{
        if(baggage){
            localStorage.setItem('myBaggage', JSON.stringify(baggage));
        }
      }, [baggage])
    
      return(
        <BaggageContext.Provider value={{baggage, setBaggage, handleBuyItem, handleSellItem}}>
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