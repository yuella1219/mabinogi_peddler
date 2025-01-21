import React from 'react';
import {useState, useEffect} from 'react';
import {NpcPortrait, NpcDialog} from 'screens'
import {NpcProps} from 'type'

export const Npc = ({buyState} : NpcProps) =>{
    return(
        <div>
            <NpcPortrait buyState={buyState}/>
            <NpcDialog buyState={false}/>
        </div>
    )
}