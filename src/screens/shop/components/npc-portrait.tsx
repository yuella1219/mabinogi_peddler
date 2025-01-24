import React from 'react';
import {URL_KEY, useNpcName} from 'core';
import {NpcProps} from 'type';
import {NpcData, type NpcDataProps} from 'datas'
import {useState, useEffect} from 'react';

export const NpcPortrait = ({buyState} : NpcProps) =>{
    const {npcName} = useNpcName();
    const [portraitCondition, setPortraitCondition] = useState(false);
    const [getNpcData, setGetNpcData] = useState<NpcDataProps>(NpcData[0]);

    useEffect(()=>{
        // npc 데이터 받기
        const foundNpc = NpcData.find((data) => data.name === npcName) || NpcData[0];
        setGetNpcData(foundNpc);
    }, [npcName])

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