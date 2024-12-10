import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import {TransportType} from 'type';

// hook으로 쓸 state 타입 선언
interface TransportContextType {
    transport : TransportType | null;
    setTransport : React.Dispatch<React.SetStateAction<TransportType | null>>;
}

// 컨텍스트 초기화
const TransportContext = createContext<TransportContextType | null>(null);

export const TransportProvider = ({children} : {children : ReactNode}) =>{
    const [transport, setTransport] = useState<TransportType | null>(null);
}
// 일단 세이브는 해 두는데 쓸 일 없을듯