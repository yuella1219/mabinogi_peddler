import React from 'react';
import {useRef} from 'react';
import {NpcButton} from './npc-button'
import {NpcData} from './npc-data';

interface Props {
    getNpc : (props:string) => void;
}

export const NpcValue = ({getNpc} : Props) => {
    const npc = useRef<HTMLDivElement>(null);

    return(
        <div className="npc-wrap">
            {NpcData.map((nm, idx) => (
                <div key={idx} ref={npc}>
                    <NpcButton name={nm.name} getNpc={getNpc} />
                </div>
            ))}
        </div>
    )
}