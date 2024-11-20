import React from 'react';
import {useState} from 'react';
import {getData} from '../../api/api'

export type NpcShopProps = {
    shop_tab_count: number; // NPC 상점의 탭 개수
    shop: Array<{
      tab_name: string; // 상점 탭 이름
      item: Array<{
        item_display_name: string; // 아이템 이름
        item_count: number; // 아이템 수량
        item_option: Array<{
          option_type: string; // 아이템 옵션 유형
          option_sub_type: string; // 아이템 옵션 하위 유형
          option_value: string; // 아이템 옵션 값
          option_value2: string; // 아이템 옵션 값 2
          option_desc: string; // 아이템 옵션 부가 정보
        }>;
        price: Array<{
          price_type: string; // 화폐 종류
          price_value: number; // 화폐 수량
        }>;
        limit_type: string; // 판매 제한 종류 (주간/월간/이벤트 등)
        limit_value: number; // 판매 제한 수량
        image_url: string; // 아이템 이미지 URL
      }>;
    }>;
    date_inquire: string; // 데이터 조회 일시 (ISO 8601 형식: UTC)
    date_shop_next_update: string; // 다음 상점 데이터 갱신 일시 (ISO 8601 형식: UTC)
  };
  


export const Sample = () =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null);
    
    // 실제 통신은 api.ts 파일에서 진행, 
    // 여기서는 getData 실행 후 응답받은 데이터 상태에 저장해서 출력하는 용도
    const handleGetData = () =>{        
        // 필요한 매개변수 전달
        getData({chaNm:'인장 상인', serNm : '만돌린', chnNum : 3}) // npcName, serverName, channel 값을 전달
          .then((fetchedData) => {
            setShopData(fetchedData);
            console.log('Fetched data:', fetchedData);
          })
          .catch((error) => console.error('Fetch error:', error));
    }

    return(
        <div>
            <button type="button" onClick={handleGetData}>데이터 호출하기</button>
            {shopData ? (
            <div>
                <h1>NPC 상점 정보</h1>
                <p>탭 개수: {shopData.shop_tab_count}</p>
                {shopData.shop.map((tab, index) => (
                    <div key={index}>
                    <h2>탭 이름: {tab.tab_name}</h2>
                    {tab.item.map((item, itemIndex) => (
                        <div key={itemIndex}>
                            <img src={item.image_url} alt="" />
                            <p>아이템 이름: {item.item_display_name}</p>
                            <p>가격: {item.price[0].price_value} {item.price[0].price_type}</p>
                            {item.item_option.map((val, idx) => (
                                <div key={idx}>
                                    <p>{val.option_type}</p>
                                    <p>{val.option_sub_type}</p>
                                    <p>{val.option_value}</p>
                                    <p>{val.option_value2}</p>
                                    <p>{val.option_desc}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                    </div>
                ))}
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}