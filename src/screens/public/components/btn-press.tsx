import React from 'react';

interface BtnPressProps {
    btnTxt? : string;
    func?: (el?:any) => void;
    size?:'s' | 'm' | 'l';
}

export const BtnPress = ({btnTxt = "확인", func, size="m"} : BtnPressProps) =>{
    
    return(
        <button className={size === 's' ? "btn btn-press small" 
        : size === 'l' ? "btn btn-press large" 
        : "btn btn-press"} onClick={func}>
            <span>{btnTxt}</span>
        </button>
    )
}