import {scriptDell, scriptMerchantImp} from './script'

export type NpcDataProps = {
    name : string; 
    id : string;
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
        pos : {x:44, y:63},
        img : `${REPLACE_URL('dell')}`,
        txtScript : scriptDell,
    },
    {
        name : '델렌',
        id : 'dellen',
        pos : {x:49, y:63},
        img : `${REPLACE_URL('dellen')}`,
        txtScript:scriptDell,
    },
    {
        name : '상인 라누',
        id : 'merchant-lanoo',
        pos : {x:78, y:76},
        img : 'sample-namolppaem-fococlipping-standard.png',
        txtScript:scriptMerchantImp,
    },
    {   name : '상인 피루(벨바스트)',
        id: 'merchant-peeroo',
        pos : {x:0, y:0},
        img : 'mooljjange-01.png',
        txtScript:scriptMerchantImp,
    },
    {
        name : '모락',
        id : 'morack',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '상인 아루',
        id : 'merchant-aroo',
        pos : {x:82, y:49},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '리나',
        id : 'lina',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 누누',
        id : 'merchant-nooonoo',
        pos : {x:74, y:47},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 메루',
        id : 'merchant-meroo',
        pos : {x:48, y:56},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '켄',
        id : 'ken',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '귀넥',
        id : 'gweeneck',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '얼리',
        id : 'early',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '데위',
        id : 'dewi',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '테일로',
        id : 'tailo',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '상인 세누',
        id : 'merchant-senoo',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 베루',
        id : 'merchant-berro',
        pos : {x:48, y:24},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '상인 에루',
        id : 'merchant-eroo',
        pos : {x:16, y:48},
        img : '.',
        txtScript:scriptMerchantImp,
    },
    {
        name : '상인 네루',
        id : 'merchant-neroo',
        pos : {x:77, y:20},
        img : `${REPLACE_URL('imp-neroo')}`,
        txtScript:scriptMerchantImp,
    },
    {
        name : '카디',
        id : 'cardi',
        pos : {x:0, y:0},
        img : '.',
        txtScript:scriptDell,
    },
    {
        name : '인장 상인',
        id : 'seal-merchant',
        pos : {x:72, y:53},
        img : `${REPLACE_URL('sealBuyer')}`,
        txtScript:scriptMerchantImp,
    },
    {
        name : '피오나트',
        id : 'pionart',
        pos : {x:73, y:60},
        img : `${REPLACE_URL('pionat')}`,
        txtScript:scriptDell,
    },
]