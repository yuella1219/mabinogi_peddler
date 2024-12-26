import React from 'react'
import {useState, useEffect} from 'react';
import { numberReplace, useWallet } from 'core';
import type {WalletProps} from 'type'

export const Wallet = () =>{
    const {wallet, setWallet} = useWallet();
    const [_wallet, _setWallet] = useState<WalletProps>()

    useEffect(()=>{
        _setWallet(wallet!)
    }, [wallet])

    return(
        <div className="wallet">
            <div className="wrap">
                <div className="gold">
                    <span>{numberReplace(_wallet?.gold ?? 0)}</span>
                </div>
                <div className="ducat">
                    <span>{numberReplace(_wallet?.ducat ?? 0)}</span>
                </div>
                <div className="pinecon">
                    <span>{numberReplace(_wallet?.pinecone ?? 0)}</span>
                </div>
                <div className="adv-seal">
                    <span>{numberReplace(_wallet?.seal ?? 0)}</span>
                </div>
            </div>
        </div>
    )
}