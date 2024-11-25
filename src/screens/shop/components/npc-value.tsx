import React from 'react';
import {useRef} from 'react';
import {NpcButton} from 'screens'
import {NpcData} from '../../../datas';

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