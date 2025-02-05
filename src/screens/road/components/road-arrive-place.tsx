import React from 'react';
import {useState, useEffect} from 'react';
import {useNpcName} from 'core'

export const RoadArrivePlace = () =>{
    const {prevNpcName, npcName} = useNpcName();

    return(
        <div className="road-arrive-wrap">
            <p className="txt-movment">상점 이동중...</p>
            <div className="destination-wrap">
                <span className="txt-depart">{prevNpcName}</span>
                <span className="txt">➡</span>
                <span className="txt-arrive">{npcName}</span>
            </div>
        </div>
    )
}