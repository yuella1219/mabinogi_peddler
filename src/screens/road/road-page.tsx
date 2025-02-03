import React from 'react';
import {useState, useEffect} from 'react';
import {useLoading} from 'core';

interface Sample {
    aa : string;
    bb : number;
    cc : boolean;
    dd : () => void;
}

export const RoadPage = () =>{
    const {setLoading} = useLoading();

    useEffect(()=>{
        setLoading(true);
    }, [])
    // animation-duration 받을 준비
    return(
        <div className="road-wrap">
            <div className="player"></div>
        </div>
    )
}