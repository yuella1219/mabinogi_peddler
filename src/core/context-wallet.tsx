import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import { WalletProps } from 'type';

interface WalletContextType {
    wallet: WalletProps | null;
    setWallet: React.Dispatch<React.SetStateAction<WalletProps | null>>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [wallet, setWallet] = useState<WalletProps | null>(null);

    const _init: WalletProps = {
        gold: 5000000,
        ducat: 100000,
        pinecone: 30,
        seal: 50,
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const _get = localStorage.getItem('myWallet') 
                ? JSON.parse(localStorage.getItem('myWallet') as string) 
                : null;

            if (_get) {
                setWallet(_get);
            } else {
                localStorage.setItem('myWallet', JSON.stringify(_init));
                setWallet(_init);
            }
        }
    }, []);

    useEffect(()=>{
        if(wallet){
            localStorage.setItem('myWallet', JSON.stringify(wallet));
        }
    }, [wallet])

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
