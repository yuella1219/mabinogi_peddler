import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';

export type NpcNameContextType = {
    npcName: string;
    setNpcName: React.Dispatch<React.SetStateAction<string>>;
  };

const NpcNameContext = createContext<NpcNameContextType | undefined>(undefined);

export const NpcNameProvider = ({children} : {children : ReactNode}) =>{    
    const [npcName, setNpcName] = useState<string>("");
    
    return(
      <NpcNameContext.Provider value={{npcName, setNpcName}}>
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