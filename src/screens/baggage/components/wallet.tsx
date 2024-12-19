import React from 'react'
import { numberReplace, useWallet } from 'core';

export const Wallet = () =>{
    const {wallet, setWallet} = useWallet();

    return(
        <div className="wallet">
            <div className="wrap">
                <div className="gold">
                    <span>{numberReplace(wallet?.gold ?? 0)}</span>
                </div>
                <div className="ducat">
                    <span>{numberReplace(wallet?.ducat ?? 0)}</span>
                </div>
                <div className="pinecon">
                    <span>{numberReplace(wallet?.pinecone ?? 0)}</span>
                </div>
                <div className="adv-seal">
                    <span>{numberReplace(wallet?.seal ?? 0)}</span>
                </div>
            </div>
        </div>
    )
}