import {itemData} from 'screens';

export type CartProps = {
    shopNm : string | null;
    data : itemData | null;
    buyState: (status:boolean) => void; // 새로운 Prop 추가
    showList?: boolean;
}