import React from 'react'
import { useWallet } from 'core';

export const Wallet = () =>{
    const {wallet, setWallet} = useWallet();

    return(
        <div className="wallet">
            <div className="wrap">
                <div className="gold">
                    <span>{wallet?.gold ?? 0}</span>
                </div>
                <div className="ducat">
                    <span>{wallet?.ducat ?? 0}</span>
                </div>
                <div className="pinecon">
                    <span>{wallet?.pinecone ?? 0}</span>
                </div>
                <div className="adv-seal">
                    <span>{wallet?.seal ?? 0}</span>
                </div>
            </div>
        </div>
    )
}