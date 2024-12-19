import React from 'react'
import {usePopup} from 'core';
import {PopupProps} from 'type';
import { BtnPress } from 'screens';

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
                    <div className="popup-inner">
                        <p>{subTxt}</p>
                    </div>) 
                : null}
                <div className="popup-bot">
                    <div className="btn-wrap">
                        <BtnPress btnTxt={btnTxt} func={handlePopupNextAction} />
                        <BtnPress btnTxt={'취소'} func={handlePopupInit}/>
                    </div>
                </div>
            </div>
            <div className="dim" onClick={handlePopupInit}></div>
        </div>
    )
}