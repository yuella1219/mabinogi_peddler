import React from 'react';
import {useState, useEffect} from 'react';
import {NpcShopProps, getData} from '../../../datas'
import {Item, itemData, ItemDetail} from 'screens'
import {useLoading} from 'core';

interface ShopProps {
    shopNm : string;
    sendBuyItemName : (item:itemData) => void;
}

const SHOP_KEY = '피오나트'

export const Shop = ({shopNm, sendBuyItemName}:ShopProps) => {
    const {setLoading} = useLoading();
    const [shopData, setShopData] = useState<NpcShopProps | null>(null); // 요청받은 데이터 or 로컬 데이터
    const [showShop, setShowShop] = useState(false);
    const [getBuyItemData, setGetBuyItemData] = useState<itemData | null>(null);
    const [getShowDetailData, setGetShowDetailData] = useState<itemData | null>(null);
    const [getDetailPosition, setGetDetailPosition] = useState({getX:0, getY:0});

    // 실제 통신은 api.ts 파일에서 진행, 
    // 여기서는 getData 실행 후 응답받은 데이터 상태에 저장해서 출력하는 용도
    const callApiData = (nm:string) =>{
        // 필요한 매개변수 전달
        getData({chaNm : nm, serNm : '만돌린', chnNum : 3}) // npcName, serverName, channel 값을 전달
        .then((fetchedData) => {
            setShopData(fetchedData);
            localStorage.setItem(nm, JSON.stringify(fetchedData));
            setShowShop(true);
            setLoading(true);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            setLoading(false);
        });
    }
    // 상점 데이터 출력
    const handleGetData = (nm : string) =>{  
        /* JavaScript에서는 null은 "Falsy" 값으로 간주되지만, 
           함수의 매개변수로 전달되면 유효한 값으로 간주됩니다 */
        const localData = localStorage.getItem(nm) ? JSON.parse(localStorage.getItem(nm)!) : null;
        // !는 TypeScript에서 localStorage.getItem(nm)이 null이 아님을 보장.
        if(localData){
            const updateDate = new Date(localData.date_shop_next_update);
            if(new Date() > updateDate){
                callApiData(nm)
                console.log('데이터 신규 업데이트')
            }else{
                setShopData(localData);
                setShowShop(true)
                setLoading(true);
                console.log('로컬 데이터')
            }
        }else{
            callApiData(nm)            
            setShowShop(true)
            setLoading(true);
            console.log('로컬 데이터 없음으로 신규데이터 내려받기')
        }
    }

    // 구매할 아이템 데이터 받아오기
    const getItemData = (item : itemData) =>{
        setGetBuyItemData(item)
        sendBuyItemName(item);
    }

    // 샵 데이터 호출
    useEffect(()=>{
        handleGetData(shopNm);
    }, [])

    // 첫번째 탭 활성화
    useEffect(()=>{
        if(shopData){
            // 탭 노출
            const firstTab = document.querySelectorAll('.shop-wrap .tab');
            firstTab[0].classList.add('show');
        }
    }, [shopData])

    // 탭버튼
    const handleShowTabs = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn')) as HTMLElement[];
        const tabBodies = Array.from(document.querySelectorAll('.tab-body .tab')) as HTMLElement[];
    
        const currentButton = event.currentTarget as HTMLElement;
    
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        currentButton.classList.add('active');
    
        const index = tabButtons.findIndex((btn) => btn === currentButton);
    
        tabBodies.forEach((tab) => tab.classList.remove('show'));
        if (tabBodies[index]) {
            tabBodies[index].classList.add('show');
        }
    };
    
    // 디테일 데이터
    const handleDetailData = (data: itemData | null) => {
        setGetShowDetailData(data);
    };
    // 디테일 포지션값
    const handleDetailPosition = (getX: number, getY:number) =>{
        setGetDetailPosition({getX:getX, getY:getY});
    }
    return(
        <>
            {showShop ? (
                <>
                    <div className="shop-wrap">
                        <div className="shop-header">
                            <strong>상점</strong>
                        </div>
                        <div className="inner">
                            <div className="tab-header">
                                {shopData?.shop.map((tab, idx) => (
                                    <button type="button" key={idx} className="tab-btn" onClick={handleShowTabs}>{tab.tab_name}</button>
                                ))}
                            </div>
                            <div className="tab-body">
                                {/* 배경용 격자 */}
                                <div className="plaid-wrap">
                                    <div className="plaid-row">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="plaid-col">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                {/* // 배경용 격자 */}
                                {shopData?.shop.map((tab, idx) => (
                                    <div className="tab" key={idx}>
                                        {tab.item.map((item, key) => (
                                            <React.Fragment key={key}>
                                                <Item item={item} key={`item-${key}`} sendItem={getItemData} detailData={handleDetailData} sendItemPosition={handleDetailPosition}/>
                                                {/* 고유 코드값 있는게 관리 측면에서 좋다. 추가 필요 */}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {getShowDetailData && getDetailPosition && (<ItemDetail item={getShowDetailData} getX={getDetailPosition.getX} getY={getDetailPosition.getY}/>)}
                </>
            ) 
            : null}
        </>
    )
}