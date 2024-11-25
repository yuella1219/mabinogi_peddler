import React from 'react';
import {useRef} from 'react';

interface Props {
    name:string;
    getNpc : (props:string) => void;
}

export const NpcButton = ({name, getNpc} : Props) => {
    const npcBtn = useRef<HTMLButtonElement>(null);
    
    const sendNpcName = () => {
        if(npcBtn.current){
            const nm = npcBtn.current.querySelector('span') as HTMLSpanElement;
            getNpc(nm.innerText);
        }
    }

    return(
        <button className="btn-press" type="button" onClick={sendNpcName} ref={npcBtn}>
            <span>{name}</span>
        </button>
    )
}