import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import {NpcShopProps} from '../datas/api'
import {Baggage, itemData} from 'screens'

export type BaggageContextType = {
    baggage: BaggageProps[] | null;
    setBaggage: React.Dispatch<React.SetStateAction<BaggageProps[] | null>>;
  };

export type BaggageProps = {
    npcName : string;
    items : itemData[]
}

const BaggageContext = createContext<BaggageContextType|null>(null);

export const Baggageprovider = ({children} : {children : ReactNode}) =>{
    const [baggage, setBaggage] = useState<BaggageProps[] | null>(null);
    const [_dataInit, _setDataInit] = useState(false)
 
    const _init: BaggageProps[] = [
        {
          npcName: '',
          items: [
            {
              item_display_name: '',
              item_count: 0,
              item_option: [
                {
                  option_type: '',
                  option_sub_type: '',
                  option_value: '',
                  option_value2: '',
                  option_desc: '',
                },
              ],
              price: [
                {
                  price_type: '',
                  price_value: 0,
                },
              ],
              limit_type: '',
              limit_value: 0,
              image_url: '',
            },
          ],
        },
      ];

      useEffect(() => {
        if (typeof window !== 'undefined') {
            const _get = localStorage.getItem('myBaggage')
                ? JSON.parse(localStorage.getItem('myBaggage') as string)
                : null;
    
            if (_get) {
                setBaggage(_get); // 상태 업데이트는 초기화 한 번만 실행
            } else {
                setBaggage(_init);
            }
        }
    }, []); // 초기화는 한 번만 실행
    

      useEffect(()=>{
        if(baggage){
            localStorage.setItem('maBaggage', JSON.stringify(baggage));
        }
      }, [baggage])
    
      return(
        <BaggageContext.Provider value={{baggage, setBaggage}}>
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