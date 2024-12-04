const API_KEY = process.env.REACT_APP_API_KEY || 'test_7b7212e431fec3f52116b14619810636201e32488e76c577955ca1d9f1a5e3acefe8d04e6d233bd35cf2fabdeb93fb0d';
const API_URL = process.env.REACT_APP_API_URL || 'https://open.api.nexon.com/mabinogi/v1/npcshop/list';

export type ParamProps  = {
    chaNm : string;
    serNm : string;
    chnNum : number;
}

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

export const getData = async ({chaNm, serNm, chnNum}:ParamProps) => {
    const url = new URL(String(API_URL));
    url.searchParams.append('npc_name', chaNm);
    url.searchParams.append('server_name', serNm);
    url.searchParams.append('channel', String(chnNum));
    try{
        const response = await fetch(url, {
            method : 'GET',
            headers : {
                'accept' : 'application/json',
                'x-nxopen-api-key' : String(API_KEY),
            }            
        });
        if (!response.ok) { // ok가 되지 않은 경우 > responce code가 200이 아닌 경우 +> HTTP 상태 코드가 200~299(성공 상태) 범위가 아닌 경우 ex) response.code : 200 = true / response.code : 400 = false
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    }catch(error){
        console.error('error');
        throw error;
    }
}