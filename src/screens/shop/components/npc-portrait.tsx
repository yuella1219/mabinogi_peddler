import React from 'react';
import {URL_KEY} from 'core';
import {NpcProps} from 'type';
import {NpcData, type NpcDataProps} from 'datas'
import {useState, useEffect} from 'react';

export const NpcPortrait = ({buyState, name} : NpcProps) =>{
    const [portraitCondition, setPortraitCondition] = useState(false);
    const [getNpcData, setGetNpcData] = useState<NpcDataProps>(NpcData[0]);

    // npc 데이터 받기
    useEffect(() => {
        if (name) {
            const foundNpc = NpcData.find((data) => data.name === name) || NpcData[0];
            setGetNpcData(foundNpc);
        }
    }, [name]);

    // 구매완료 이미지 출력용
    useEffect(()=>{
        setPortraitCondition(buyState)
    }, [buyState])

    return(
        <div className="npc-portrait-wrap">
            <img src={URL_KEY + `/img/${getNpcData.img}`} alt="" />            
        </div>
    )
}