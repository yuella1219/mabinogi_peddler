import React from 'react';
import {useState, useEffect} from 'react';
import {useNpcName} from 'core';
import {NpcProps} from 'type';
import {scriptDell} from 'datas'

export const NpcDialog = ({buyState} : NpcProps) =>{
    const {npcName} = useNpcName();

    // const npcName = '물짱이'
    // const npcName = '나몰빼미'
    // const npcText = '나무르르르르ㄹㄹㄹㄹㄹㄹ!'
    
    // const npcName = '델'
    const npcText = scriptDell.visit;

    return(
        <div className="npc-dialog-wrap">
            <strong className="npc-name">{npcName}</strong>
            <div className="dialog-box">
                <p className="npc-txt">{npcText}</p>
            </div>
        </div>
    )
}