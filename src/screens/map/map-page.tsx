import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {URL_KEY, useLoading, useNpcName} from 'core'
import {NpcData} from 'datas'

export const MapPage = () =>{
    const {npcName, setNpcName, setPrevNpcName} = useNpcName();
    const {setLoading} = useLoading();
    const [mapName, setMapName] = useState('');
    const [mapChoice, setMapChoice] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const prevButtonRef = useRef<HTMLButtonElement | null>(null);
    const nextButtonRef = useRef<HTMLButtonElement | null>(null);

    const ULADH_MAP = `/img/bg/map-uladh.png`;
    const IRIA_MAP = `/img/bg/map-iria.png`;
    const BELFAST_MAP = `/img/bg/map-belfast.png`;
  
    const uladhData = NpcData.filter((item) => item.cont === "uladh");
    const iriaData = NpcData.filter((item) => item.cont === "iria");
    const belfastData = NpcData.filter((item) => item.cont === "belfast");  

    const handleMoveMap = (nm:string) =>{
        setNpcName(nm)
        setLoading(false)
    }

    // 로딩상태 컨트롤
    useEffect(()=>{
        setLoading(true)   
        
        // 현재 npc 위치에 따라 지도 보여주기
        const _nowCont = NpcData.find((el) => el.name === npcName);

        if(_nowCont){
            if(_nowCont.cont === 'uladh'){
                setMapName(ULADH_MAP)
            }else if(_nowCont.cont === 'iria'){
                setMapName(IRIA_MAP)
            }else if(_nowCont.cont === 'belfast'){
                setMapName(BELFAST_MAP)
            }
        }else{
            setMapName(ULADH_MAP)
        }        
    }, [])

    // 지도 변경 핸들러
    const changeMap = (direction: "prev" | "next") => {
        if (direction === "prev") {
            if (mapName === IRIA_MAP) setMapName(BELFAST_MAP);
            else if (mapName === BELFAST_MAP) setMapName(ULADH_MAP);
        } else {
            if (mapName === ULADH_MAP) setMapName(BELFAST_MAP);
            else if (mapName === BELFAST_MAP) setMapName(IRIA_MAP);
        }
    };

    return(
        <div className="map">
            <div className="wrap">
                {mapName === ULADH_MAP ?
                    (<>
                        <img src={URL_KEY + '/img/bg/map-uladh.png'} alt="" ref={imgRef}/>
                        {uladhData.map((nm)=>(
                            <div className="map-btn-wrap" key={nm.id} 
                            style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                                <Link to="/road-page" className="map-btn" 
                                onClick={()=>{
                                    setPrevNpcName(npcName)
                                    handleMoveMap(nm.name)
                                }}>
                                    <span className="txt">{nm.name}</span>
                                </Link>
                            </div>
                        ))}
                    </>)
                : mapName === BELFAST_MAP ? 
                (<>
                    <img src={URL_KEY + '/img/bg/map-belfast.png'} alt="" ref={imgRef}/>
                    {belfastData.map((nm)=>(
                        <div className="map-btn-wrap" key={nm.id} 
                        style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                            <Link to="/road-page" className="map-btn" 
                            onClick={()=>{
                                setPrevNpcName(npcName)
                                handleMoveMap(nm.name)
                            }}>
                                <span className="txt">{nm.name}</span>
                            </Link>
                        </div>
                    ))}
                </>)
                : mapName === IRIA_MAP ? 
                (<>
                    <img src={URL_KEY + '/img/bg/map-iria.png'} alt="" ref={imgRef}/>
                    {iriaData.map((nm)=>(
                        <div className="map-btn-wrap" key={nm.id} 
                        style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                            <Link to="/road-page" className="map-btn" 
                            onClick={()=>{
                                setPrevNpcName(npcName)
                                handleMoveMap(nm.name)
                            }}>
                                <span className="txt">{nm.name}</span>
                            </Link>
                        </div>
                    ))}
                </>)
                : 
                (<>
                    <img src={URL_KEY + '/img/bg/map-uladh.png'} alt="" ref={imgRef}/>
                    {uladhData.map((nm)=>(
                        <div className="map-btn-wrap" key={nm.id} 
                        style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                            <Link to="/road-page" className="map-btn" 
                            onClick={()=>{
                                setPrevNpcName(npcName)
                                handleMoveMap(nm.name)
                            }}>
                                <span className="txt">{nm.name}</span>
                            </Link>
                        </div>
                    ))}
                </>)}
            </div>
            <div className="map-pagenation">
                {mapName !== ULADH_MAP ? (
                    <button ref={prevButtonRef} className="prev-cont" onClick={() => changeMap("prev")}></button>
                ) : <div></div>}
                {mapName !== IRIA_MAP && (
                    <button ref={nextButtonRef} className="next-cont" onClick={() => changeMap("next")}></button>
                )}
            </div>
        </div>
    )
}