import React, {ReactNode, useState, useEffect, useRef, createContext, useContext} from 'react';
import { LoadingTipText } from 'datas';

interface LoadingContextType{
    loading : boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setNetworkCheck : React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({children} : {children : ReactNode}) =>{
    const _window = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [networkCheck, setNetworkCheck] = useState(false);
    const [loadChildren, setLoadChildren] = useState(false);
    const [tipNum, setTipNum] = useState(0);

    // loading중
    // useEffect(()=>{
    //     setTipNum(Math.floor(Math.random() * LoadingTipText.length));
    // }, [])

    // loading 성공
    useEffect(()=>{
        if(loading){
            setTipNum(Math.floor(Math.random() * LoadingTipText.length));
            if(_window){
                setTimeout(()=>{
                    _window.current?.classList.add('hide');
                }, 1000)
            }
            setTimeout(()=>{
                setLoadChildren(true);
            }, 2000)
        }else{
            _window.current?.classList.remove('hide');
            setLoadChildren(false);
        }
    }, [loading])

    return(
        <LoadingContext.Provider value={{ loading, setLoading, setNetworkCheck }}>
            {!loadChildren ? (
                <div className="loading-wrap" ref={_window}>
                    <div className="inner">
                        <p>{LoadingTipText[tipNum].txt}</p>
                    </div>
                </div> // 로딩 상태에서 보여줄 내용
            ) : null}
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () =>{
    const context = useContext(LoadingContext);
    if(!context){
        throw new Error('Loading Error');
    }
    return context;
}