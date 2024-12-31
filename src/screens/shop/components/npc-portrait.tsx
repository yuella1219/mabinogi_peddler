import React from 'react';
import {useState, useEffect} from 'react';


interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

const URL_KEY = process.env.PUBLIC_URL;

export const NpcPortrait = () =>{
    return(
        <div className="npc-portrait-wrap">
            {/* <img src={URL_KEY + '/img/portrait-npc-dell.png'} /> */}
            <img src={URL_KEY + '/img/sample-namolppaem-fococlipping-standard.png'} />
        </div>
    )
}