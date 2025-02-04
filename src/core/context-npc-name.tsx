import React, { ReactNode, useState, createContext, useContext } from 'react';

export type NpcNameContextType = {
    npcName: string;
    setNpcName: React.Dispatch<React.SetStateAction<string>>;
    prevNpcName: string;
    setPrevNpcName: React.Dispatch<React.SetStateAction<string>>;
  };

const NpcNameContext = createContext<NpcNameContextType | undefined>(undefined);

export const NpcNameProvider = ({children} : {children : ReactNode}) =>{    
    const [npcName, setNpcName] = useState<string>("");
    const [prevNpcName, setPrevNpcName] = useState<string>("");
    
    return(
      <NpcNameContext.Provider value={{npcName, setNpcName, prevNpcName, setPrevNpcName}}>
          {children}
      </NpcNameContext.Provider>
    )
}

export const useNpcName = () =>{
    const context = useContext(NpcNameContext);
    if(!context){
        throw new Error('npc name error');
    }
    return context;
}