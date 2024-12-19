import React from 'react';

interface BtnPressProps {
    btnTxt? : string;
    func?: (el?:any) => void;
}

export const BtnPress = ({btnTxt = "확인", func} : BtnPressProps) =>{
    
    return(
        <button className="btn btn-press" onClick={func}>
            <span>{btnTxt}</span>
        </button>
    )
}