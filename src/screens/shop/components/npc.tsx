import React from 'react';
import {useState, useEffect} from 'react';
import {NpcPortrait, NpcDialog} from 'screens'

interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const Npc = () =>{
    return(
        <div>
            <NpcPortrait />
            <NpcDialog />
        </div>
    )
}