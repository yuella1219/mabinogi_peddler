import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {URL_KEY, useLoading} from 'core'
import {NpcData} from 'datas'

interface MapProps {
    sendNpcName : (nm:string) => void;
}

const BASE_WIDTH = 711;
const BASE_HEIGHT = 604;

export const MapPage = ({sendNpcName} : MapProps) =>{
    const imgRef = useRef<HTMLImageElement | null>(null);
    const {setLoading} = useLoading();

    const handleMoveMap = (nm:string) =>{
        sendNpcName(nm)
        setLoading(false)     
    }

    // 로딩상태 컨트롤
    useEffect(()=>{
        setLoading(true)     
    }, [])

    return(
        <div className="map">
            <div className="wrap">
                <img src={URL_KEY + '/img/map.png'} alt="" ref={imgRef}/>
                {NpcData.map((nm)=>(
                    <div className="map-btn-wrap" key={nm.id} 
                    style={{top:`${nm.pos.y}%`, left:`${nm.pos.x}%`}}>
                        <Link to="/mabinogi_peddler" className="map-btn" onClick={()=>{
                            handleMoveMap(nm.name)
                        }}>{nm.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}