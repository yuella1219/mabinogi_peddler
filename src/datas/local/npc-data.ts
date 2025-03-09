import {scriptDell, scriptMerchantImp, scriptPionart} from './script'

export type NpcDataProps = {
    name : string; 
    id : string;
    cont : string;
    pos : {x:number, y:number};
    img : string;
    txtScript: Record<string, string>;
}

const REPLACE_URL = (nm:string) => {
    return `portrait-npc-${nm}.png`
}

export const NpcData : NpcDataProps[] = [
    {   name : '델',
        id:'dell',
        cont : 'uladh',
        pos : {x:44, y:63},
        img : `${REPLACE_URL('dell')}`,
        txtScript : scriptDell,
    },
    {
        name : '델렌',
        id : 'dellen',
        cont : 'uladh',
        pos : {x:49, y:63},
        img : `${REPLACE_URL('dellen')}`,
        txtScript:scriptDell,
    },
    {
        name : '상인 라누',
        id : 'merchant-lanoo',
        cont : 'uladh',
        pos : {x:78, y:76},
        img : 'buy-complete-bbam.png',
        txtScript:scriptMerchantImp,
    },
    {   name : '상인 피루',
        id: 'merchant-peeroo',
        cont : 'belfast',
        pos : {x:68, y:78},
        img : 'mooljjange-01.png',
        txtScript:scriptMerchantImp,
    },
    {
        name : '모락',
        id : 'morack',
        cont : 'iria', // 칼리다
        pos : {x:48, y:14},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '상인 아루',
        id : 'merchant-aroo',
        cont : 'uladh',
        pos : {x:82, y:49},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '리나',
        id : 'lina',
        cont : 'iria', // 코르
        pos : {x:58, y:54},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 누누',
        id : 'merchant-nooonoo',
        cont : 'uladh',
        pos : {x:74, y:47},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 메루',
        id : 'merchant-meroo',
        cont : 'uladh',
        pos : {x:48, y:56},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '켄',
        id : 'ken',
        cont : 'iria', // 필리아
        pos : {x:86, y:59},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '귀넥',
        id : 'gweeneck',
        cont : 'iria', // 카루 
        pos : {x:48, y:90},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '얼리',
        id : 'early',
        cont : 'iria', // 오아시스 
        pos : {x:78, y:64},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '데위',
        id : 'dewi',
        cont : 'iria', //자르딘 
        pos : {x:38, y:7},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '테일로',
        id : 'tailo',
        cont : 'iria', // 켈라 
        pos : {x:27, y:82},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '상인 세누',
        id : 'merchant-senoo',
        cont : 'belfast', // 스카하 
        pos : {x:68, y:48},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 베루',
        id : 'merchant-berro',
        cont : 'uladh',
        pos : {x:48, y:24},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 에루',
        id : 'merchant-eroo',
        cont : 'uladh',
        pos : {x:16, y:48},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 네루',
        id : 'merchant-neroo',
        cont : 'uladh',
        pos : {x:77, y:20},
        img : `${REPLACE_URL('imp-neroo')}`,
        txtScript:scriptMerchantImp,
    },
    {
        name : '카디',
        id : 'cardi',
        cont : 'iria', // 발레스
        pos : {x:38, y:24},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '인장 상인',
        id : 'seal-merchant',
        cont : 'uladh',
        pos : {x:72, y:53},
        img : `${REPLACE_URL('sealBuyer')}`,
        txtScript:scriptMerchantImp,
    },
    {
        name : '피오나트',
        id : 'pionart',
        cont : 'uladh',
        pos : {x:73, y:60},
        img : `${REPLACE_URL('pionat')}`,
        txtScript:scriptPionart,
    },
]