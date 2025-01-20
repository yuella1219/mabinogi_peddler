import React from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, getData} from 'datas'
import {useWallet} from 'core';
import {Shop, Npc, ShopGnb, itemData, BtnPress, Todo, ColorInterface} from 'screens';

interface ShopPageProps {
    npcNm?: string;
}

export const ShopPage = ({npcNm}:ShopPageProps) =>{
    const [shopData, setShopData] = useState<NpcShopProps | null>(null); // 요청받은 데이터 or 로컬 데이터
    const [getName, setGetName] = useState<itemData | null>(null); // 탭에서 선택한 아이템
    const [getNpc, setGetNpc] = useState<string | null>(null); // 엔피씨 선택
    const [cart, setCart] = useState<itemData | null>(null); // 짐 목록 업데이트
    const {wallet, setWallet} = useWallet();
    const [buyStatus, setBuyStatus] = useState(false);
    
    const getAddItemName = (item:itemData) =>{
        setGetName(item);
    }

    // 지도에서 샵 선택할 시
    useEffect(()=>{
        if(npcNm){
            setGetNpc(npcNm);
        }
    }, [npcNm])

    // 구매완료 상태 받아오기
    const getBuyStatus = (status : boolean) =>{
        setBuyStatus(status);
    }

    // 아이템 담기
    const getItemInBaggage = (item:itemData) =>{
        let _pushItem:any = null;
        
        if(getName){
            _pushItem = shopData?.shop?.flatMap((shop) => shop.item)
            .find((item) => item === getName);
        }
        if (_pushItem) {
          setCart(_pushItem); // 기존 상태 배열에 _pushItem 추가
        }
    }

    useEffect(()=>{
        // useEffect는 초기 렌더링 때 실행되기 때문.
        // getNpc가 null이라도 useEffect는 무조건 한 번 실행됩니다.
        if(getName){
            getItemInBaggage(getName!)      
        }
    }, [getName])

    const resetData = () =>{
        localStorage.removeItem('myBaggage');
    }
    const giveMeTheMoney = () =>{
        setWallet({
            gold : wallet?.gold! + 100000,
            ducat : wallet?.ducat! + 10000,
            pinecone : wallet?.pinecone! + 50,
            seal : wallet?.seal! + 30,
        })
    }


    return(
        <div className="content">
            {/* <Todo /> */}
            <ShopGnb shopNm={getNpc} data={getName} buyState={getBuyStatus}/>
            <Npc buyState={buyStatus} name={getNpc ?? '델'}/>
            <Shop sendBuyItemName={getAddItemName} shopNm={getNpc ?? '델'}/>            
            <ColorInterface show={true} />
            <div className="givemethemoney">
                <BtnPress btnTxt={'깁미 더 머니'} func={giveMeTheMoney}/>
            </div>
        </div>
    )
}