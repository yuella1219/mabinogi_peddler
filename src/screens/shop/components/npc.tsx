import React from 'react';
import {useState, useEffect} from 'react';
import {NpcPortrait, NpcDialog} from 'screens'
import {NpcProps} from 'type'

export const Npc = ({buyState, name} : NpcProps) =>{
    return(
        <div>
            <NpcPortrait buyState={buyState} name={name}/>
            <NpcDialog name={name} buyState={false}/>
        </div>
    )
}