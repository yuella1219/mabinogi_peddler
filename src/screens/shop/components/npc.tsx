import React from 'react';
import {useState, useEffect} from 'react';
import {NpcPortrait, NpcDialog} from 'screens'
import {NpcProps} from 'type'

export const Npc = ({buyState} : NpcProps) =>{
    useEffect(()=>{
        // console.log('Npc 컴포 재랜더링됨')
    }, [])
    return(
        <div>
            <NpcPortrait buyState={buyState}/>
            <NpcDialog buyState={false}/>
        </div>
    )
}