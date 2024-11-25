import React from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, getData} from '../../datas'
import {Item, Baggage, NpcValue, itemData, Todo} from 'screens';

interface GetNameProps {
    nm : string;
    cnt? : number;
}

export const ShopPage = () =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null);
    const [getName, setGetName] = useState<GetNameProps | null>(null);
    const [getNpc, setGetNpc] = useState('');
    const [baggage, setBaggage] = useState<itemData[] | []>([]);
    const [showBaggage, setShowBaggage] = useState(false);
    
    // 실제 통신은 api.ts 파일에서 진행, 
    // 여기서는 getData 실행 후 응답받은 데이터 상태에 저장해서 출력하는 용도
    const handleGetData = (nm : string) =>{        
        // 필요한 매개변수 전달
        getData({chaNm : nm, serNm : '만돌린', chnNum : 3}) // npcName, serverName, channel 값을 전달
          .then((fetchedData) => {
            setShopData(fetchedData);
          })
          .catch((error) => console.error('Fetch error:', error));
    }
    const getAddItemName = (nm:string, cnt?:number) =>{
        setGetName({nm:nm, cnt:cnt});
    }

    const getNpcName = (nm : string) =>{
        setGetNpc(nm);
    }

    // useEffect(()=>{
    //     console.log(shopData)
    // }, [shopData])

    //npc 탭
    useEffect(()=>{
        handleGetData(getNpc)
    }, [getNpc])
    // 아이템 담기
    useEffect(()=>{
        let _pushItem:any = null;
        
        if(getName?.cnt){
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => 
                item.item_display_name === getName?.nm && 
                item.item_count === getName?.cnt);
        }else{
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => 
                item.item_display_name === getName?.nm);
        }
        
        if (_pushItem) {
          setBaggage((state) => [...state, _pushItem]); // 기존 상태 배열에 _pushItem 추가
        }
        // console.log(baggage)
    }, [getName])

    return(
        <div className="sample">
            <NpcValue getNpc={getNpcName}/>
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