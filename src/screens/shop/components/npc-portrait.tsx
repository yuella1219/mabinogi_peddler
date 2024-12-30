import React from 'react';
import {useState, useEffect} from 'react';


interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const NpcPortrait = () =>{
    return(
        <div className="npc-portrait-wrap">
            <img src={process.env.PUBLIC_URL + '/img/portrait-npc-dell.png'} />
            {/* <img src={process.env.PUBLIC_URL + '/img/sample-namolppaem-fococlipping-standard.png'} /> */}
        </div>
    )
}