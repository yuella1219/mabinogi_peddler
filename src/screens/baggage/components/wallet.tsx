import React from 'react'
const dummy = {
    gold:'1000',
    ducat:'1001',
    pinecone:'1002',
    seal:'1003'
}
export const Wallet = () =>{
    return(
        <div className="wallet">
            <div className="wrap">
                <div className="gold">
                    <span>{dummy.gold}</span>
                </div>
                <div className="ducat">
                    <span>{dummy.ducat}</span>
                </div>
                <div className="pinecon">
                    <span>{dummy.pinecone}</span>
                </div>
                <div className="adv-seal">
                    <span>{dummy.seal}</span>
                </div>
            </div>
        </div>
    )
}