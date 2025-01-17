import React from 'react';
import {URL_KEY} from 'core';
import {useState, useEffect} from 'react';


interface NpcPortraitProps {
    buyState : boolean;
}

export const NpcPortrait = ({buyState} : NpcPortraitProps) =>{
    const [portraitCondition, setPortraitCondition] = useState(false);

    useEffect(()=>{
        setPortraitCondition(buyState)
    }, [buyState])

    return(
        <div className="npc-portrait-wrap">
            {/* <img src={URL_KEY + '/img/portrait-npc-dell.png'} /> */}
            {portraitCondition ? (
                // <img src={URL_KEY + '/img/buy-complete-bbam.png'} alt=""/>
                <img src={URL_KEY + '/img/happy-mooljjange-removebg-preview.png'} alt=""/>
            ) : (
                // <img src={URL_KEY + '/img/sample-namolppaem-fococlipping-standard.png'} alt=""/>
                <img src={URL_KEY + '/img/floating-mooljjange.png'} alt=""/>
            )}
        </div>
    )
}