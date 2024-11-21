import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {NpcShopProps, getData} from '../../api/api'
import {Item, NpcValue} from '../../components';

export const Sample = () =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null);
    const [getName, setGetName] = useState('');
    const [getNpc, setGetNpc] = useState('');
    
    // 실제 통신은 api.ts 파일에서 진행, 
    // 여기서는 getData 실행 후 응답받은 데이터 상태에 저장해서 출력하는 용도
    const handleGetData = (nm : string) =>{        
        // 필요한 매개변수 전달
        getData({chaNm:nm, serNm : '만돌린', chnNum : 3}) // npcName, serverName, channel 값을 전달
          .then((fetchedData) => {
            setShopData(fetchedData);
          })
          .catch((error) => console.error('Fetch error:', error));
    }
    const getAddItemName = (nm : string) =>{
        setGetName(nm);
    }

    const getNpcName = (nm : string) =>{
        setGetNpc(nm);
    }

    useEffect(()=>{
        handleGetData(getNpc)
        console.log(getNpc)
    }, [getNpc])

    return(
        <div className="sample">
            <NpcValue getNpc={getNpcName}/>
            {shopData ? (
            <div>
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