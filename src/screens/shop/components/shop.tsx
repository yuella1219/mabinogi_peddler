import React from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, getData} from '../../../datas'
import {Item, itemData} from 'screens'

interface ShopDataProps {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const Shop = () =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null); // 요청받은 데이터 or 로컬 데이터
    const [getBuyItemData, setGetBuyItemData] = useState<itemData | null>(null);

    // 실제 통신은 api.ts 파일에서 진행, 
    // 여기서는 getData 실행 후 응답받은 데이터 상태에 저장해서 출력하는 용도
    const callApiData = (nm:string) =>{
        // 필요한 매개변수 전달
        getData({chaNm : nm, serNm : '만돌린', chnNum : 3}) // npcName, serverName, channel 값을 전달
        .then((fetchedData) => {
            setShopData(fetchedData);
            localStorage.setItem(nm, JSON.stringify(fetchedData));
        })
        .catch((error) => console.error('Fetch error:', error));
    }

    const handleGetData = (nm : string) =>{  
        /* JavaScript에서는 null은 "Falsy" 값으로 간주되지만, 
           함수의 매개변수로 전달되면 유효한 값으로 간주됩니다 */
        const localData = localStorage.getItem(nm) ? JSON.parse(localStorage.getItem(nm)!) : null;
        // !는 TypeScript에서 localStorage.getItem(nm)이 null이 아님을 보장.
        if(localData){
            const updateDate = new Date(localData.date_shop_next_update);
            if(new Date() > updateDate){
                callApiData(nm)
                console.log('데이터 신규 업데이트')
            }else{
                setShopData(localData);
                console.log('로컬 데이터')
            }
        }else{
            callApiData(nm)            
            console.log('로컬 데이터 없음으로 신규데이터 내려받기')
        }
    }

    const getItemData = (item : itemData) =>{
        setGetBuyItemData(item)
    }

    useEffect(()=>{
        handleGetData('델');
    }, [])

    return(
        <div className="shop-wrap">
            <div className="shop-header">
                <strong>상점</strong>
            </div>
            <div className="inner">
                <div className="tab-header">
                    {shopData?.shop.map((tab, idx) => (
                        <button type="button" key={idx} className="tab-btn">{tab.tab_name}</button>
                    ))}
                </div>
                <div className="tab-body">
                    <div className="plaid-wrap">
                        <div className="plaid-col">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="plaid-row">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    {shopData?.shop.map((tab, idx) => (
                        <div className="tab" key={idx}>
                            {tab.item.map((item, key) => (
                                <div key={`item-${key}`}>
                                    <Item item={item} sendItem={getItemData} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}