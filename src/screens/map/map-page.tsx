import React from 'react';
import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {URL_KEY, useLoading, useNpcName} from 'core'
import {NpcData} from 'datas'

export const MapPage = () =>{
    const {npcName, setNpcName, setPrevNpcName} = useNpcName();
    const imgRef = useRef<HTMLImageElement | null>(null);
    const {setLoading} = useLoading();

    const handleMoveMap = (nm:string) =>{
        setNpcName(nm)
        setLoading(false)
    }

    // 로딩상태 컨트롤
    useEffect(()=>{
        setLoading(true)
    }, [])

    return(
        <div className="map">
            <div className="wrap">
                <img src={URL_KEY + '/img/bg/map.png'} alt="" ref={imgRef}/>
                {NpcData.map((nm)=>(
                    <div className="map-btn-wrap" key={nm.id} 
                    style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                        <Link to="/road-page" className="map-btn" 
                        onClick={()=>{
                            setPrevNpcName(npcName)
                            handleMoveMap(nm.name)
                        }}>
                            <span>{nm.name}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}