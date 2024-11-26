import React from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, getData} from '../../datas'
import {Item, Baggage, NpcValue, itemData, Todo, Wallet} from 'screens';

interface GetNameProps {
    nm : string;
    cnt? : number;
    color? : string;
}

export const ShopPage = () =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null); // 요청받은 데이터 or 로컬 데이터
    const [getName, setGetName] = useState<GetNameProps | null>(null); // 탭에서 선택한 아이템
    const [getNpc, setGetNpc] = useState<string | null>(null); // 엔피씨 선택
    const [baggage, setBaggage] = useState<itemData[] | []>([]); // 짐 목록 업데이트
    
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
    
    const getAddItemName = (nm:string, cnt?:number, color?:string) =>{
        setGetName({nm:nm, cnt:cnt, color:color});
    }

    // useEffect(()=>{
    //     console.log(shopData)
    // }, [shopData])

    // npc 이름 받아오기
    const getNpcName = (nm : string) =>{
        setGetNpc(nm);
    }
    //npc 탭
    useEffect(()=>{
        console.log(getNpc)
        if(getNpc){
            handleGetData(getNpc!)
        }
    }, [getNpc])

    // 아이템 담기
    const getItemInBaggage = ({nm, cnt, color} : GetNameProps) =>{
        let _pushItem:any = null;
        
        if(getName?.cnt){
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => 
                item.item_display_name === getName?.nm && 
                item.item_count === getName?.cnt);
        }else if(getName?.color){
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => 
                item.item_display_name === getName?.nm && 
                item.item_option.flatMap((val) => val.option_value).find((col) =>
                    col === getName?.color
                ));
        }else{
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => 
                item.item_display_name === getName?.nm);
        }
        if (_pushItem) {
          setBaggage((state) => [...state, _pushItem]); // 기존 상태 배열에 _pushItem 추가
        }
    }
    useEffect(()=>{
        // useEffect는 초기 렌더링 때 실행되기 때문.
        // getNpc가 null이라도 useEffect는 무조건 한 번 실행됩니다.
        if(getName){
            getItemInBaggage(getName!)      
        }
    }, [getName])

    return(
        <div className="sample">
            <NpcValue getNpc={getNpcName}/>
            <Wallet />
            <Todo />
            {shopData ? (
                <div>
                    <Baggage data={baggage}/>
                    <h1>NPC 상점 정보</h1>
                    <p>탭 개수: {shopData.shop_tab_count}</p>
                    <div className="inner">
                        {shopData.shop.map((tab, index) => (
                            <div key={index} className="tabs">
                                <h2 className="tab-title">{tab.tab_name} 탭</h2>
                                <div className="wrap">
                                    {tab.item.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <Item item={item} sendItemNm={getAddItemName}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}