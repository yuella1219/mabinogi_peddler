/***************************************** 
nm : npc 이름
land : 소재중인 대륙
load : {to... : svg url, }

Record<Key, Value>는 "모든 Key에 대해 특정 Value 타입을 강제하는 타입"입니다.
******************************************/

export type LoadDataProps = {
    nm : string;
    land : string;
    load : Record <string, string>
}
const LOAD_URL_KEY = '/img/load';

const calLoadDistance = (nm:string) => {
    const _find = ''//nm으로 받은 이름으로 svg컴포 검색 - prop 예시 : dellen, marchantMEroo 등
    const _loadDistande = 0;// 계산된 값 number타입 
    return _loadDistande
}

export const LoadData = [
    {
        nm : 'dell',
        land : 'uladh',
        load : {
                dellen : `${calLoadDistance('dellen')}`,
                marchantMeroo : `${LOAD_URL_KEY}/`,             
                marchantEroo : `${LOAD_URL_KEY}/load-dell_EmainMacha_-eroo_Tara.svg`,
            },
    },
    {
        nm : 'dellen',
        land : 'uladh',
        load : 
            {
                dell : `${LOAD_URL_KEY}/load-dell_EmainMacha_-dellen_EmainMacha.svg`,             
                marchantMeroo : `${LOAD_URL_KEY}/load-dell_EmainMacha_-eroo_Tara.svg`,
            }
    },
]


// {
//     nm : 'aaa',
//     land : 'bbb',
//     load : 
//         {
//             ccc : `${LOAD_URL_KEY}/ddd.svg`,
//             eee : `${LOAD_URL_KEY}/fff.svg`,
//         },
// },