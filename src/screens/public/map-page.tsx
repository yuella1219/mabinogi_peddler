import React from 'react';
import {useState, useEffect} from 'react';
import {URL_KEY, useLoading} from 'core'

interface MapProps {
    sendNpcName : (nm:string) => void;
}

export const MapPage = ({sendNpcName} : MapProps) =>{
    const {setLoading} = useLoading();
    useEffect(()=>{
        setLoading(true)
    }, [])
    return(
        <div className="map">
            <img src={URL_KEY + '/img/map.png'} alt="" />
        </div>
    )
}