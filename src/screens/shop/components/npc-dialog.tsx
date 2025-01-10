import React from 'react';
import {useState, useEffect} from 'react';

export const NpcDialog = () =>{
    const npcName = '물짱이'
    // const npcName = '나몰빼미'
    // const npcText = '나무르르르르ㄹㄹㄹㄹㄹㄹ!'
    
    // const npcName = '델'
    const npcText = '임시 텍스트'

    return(
        <div className="npc-dialog-wrap">
            <strong className="npc-name">{npcName}</strong>
            <div className="dialog-box">
                <p className="npc-txt">{npcText}</p>
            </div>
        </div>
    )
}