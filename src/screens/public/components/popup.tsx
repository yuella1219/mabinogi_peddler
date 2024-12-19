import React from 'react'
import {usePopup} from 'core';
import {PopupProps} from 'type';

export const Popup = ({mainTxt, subTxt, handleFunc, btnTxt = "확인"} : PopupProps) =>{
    const {setPopupData} = usePopup();

    const handlePopupNextAction = () =>{
        handleFunc();
    }

    const handlePopupInit = () => {
        setPopupData(null)
    }

    return(
        <div className="popup">
            <div className="popup-wrap">
                <div className="popup-header">
                    <h5 className="main-txt">{mainTxt}</h5>
                </div>
                {subTxt !== null ? (
                    <div className="popup-innner">
                        <p>{subTxt}</p>
                    </div>) 
                : null}
                <div className="popup-bot">
                    <div className="btn-wrap">
                        <button className="btn" onClick={handlePopupNextAction}>{btnTxt}</button>
                        <button className="btn" onClick={handlePopupInit}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}