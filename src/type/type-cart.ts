import {itemData} from 'screens';
import {NpcProps} from 'type';

export type CartProps = {
    shopNm : string | null;
    data : itemData | null;
    showList?: boolean;
    buySts : (status:string) => void; // 새로운 Prop 추가
}