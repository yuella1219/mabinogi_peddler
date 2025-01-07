import React from 'react';
import {useState, useEffect} from 'react';
import {NpcPortrait, NpcDialog} from 'screens'

interface NpcProps {
    buyState : boolean;
}

export const Npc = ({buyState} : NpcProps) =>{
    return(
        <div>
            <NpcPortrait buyState={buyState}/>
            <NpcDialog />
        </div>
    )
}