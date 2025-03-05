import React, {memo} from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, NpcData} from 'datas'
import {useWallet, useNpcName} from 'core';
import {Shop, Npc, ShopGnb, itemData, BtnPress, Todo, ColorInterface} from 'screens';

// const MemoizedShopGnb = React.memo(ShopGnb);
// const MemoizedShop = React.memo(Shop);
// const MemoizedNpc = React.memo(Npc);

export const ShopPage = () =>{
    const {npcName} = useNpcName();
    const {wallet, setWallet} = useWallet();
    const [shopData, setShopData] = useState<NpcShopProps | null>(null); // 요청받은 데이터 or 로컬 데이터
    const [getItem, setGetItem] = useState<itemData | null>(null); // 탭에서 선택한 아이템
    const [getNpc, setGetNpc] = useState<string | null>(null); // 엔피씨 선택
    const [cart, setCart] = useState<itemData | null>(null); // 짐 목록 업데이트
    const [buyStatus, setBuyStatus] = useState('normal'); // 구매 완료 상태
    const [classNm, setClassNm] = useState<string | null>(null);
    
    // 구매할 아이템 받아오기
    const getAddItemName = (item:itemData) =>{
        setGetItem(item);
    }

    // 구매완료 상태 받아오기
    const getBuyStatus = (status : string) =>{
        console.log(status)
        setBuyStatus(status);
    }

    // 아이템 담기
    const getItemInBaggage = (item:itemData) =>{
        let _pushItem:any = null;
        
        // getItem이 유효할 때
        // 이걸 왜 굳이 getItem으로 받지 -> 올바른 판매 상품인지를 체크하려고... 아...
        if(getItem){
            // 해서 getItem이 유효하면 _pushItem에 담고
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => item === getItem);
        }
        if (_pushItem) {
            // _pushItem에 유효한 값이 담기면 배열에 추가
            setCart(_pushItem); // 기존 상태 배열에 _pushItem 추가
        }
    }

    useEffect(()=>{
        // useEffect는 초기 렌더링 때 실행되기 때문.
        // getNpc가 null이라도 useEffect는 무조건 한 번 실행됩니다.
        if(getItem){
            getItemInBaggage(getItem!);
            setGetItem(null); // 배열에 저장 후 초기화 안 하면 중복 데이터를 담지 못함
        }
    }, [getItem])

    // 전역으로 npc명 관리
    useEffect(()=>{
        setGetNpc(npcName)
        setClassNm(NpcData.find((el) => el.name === npcName)?.id ?? null);
    }, [npcName])

    const giveMeTheMoney = () =>{
        setWallet({
            gold : wallet?.gold! + 100000,
            ducat : wallet?.ducat! + 10000,
            pinecone : wallet?.pinecone! + 50,
            seal : wallet?.seal! + 30,
        })
    }
// <ColorInterface show={true} />
    return(
        <div className={`content ${classNm}`}>
            {/* <Todo /> */}
            <ShopGnb shopNm={getNpc} data={getItem} buySts={getBuyStatus}/>
            <Npc buyState={buyStatus}/>
            <Shop sendBuyItemName={getAddItemName}/>            
            
            <div className="givemethemoney">
                {/* <BtnPress btnTxt={'깁미 더 머니'} func={giveMeTheMoney}/> */}
            </div>
        </div>
    )
}