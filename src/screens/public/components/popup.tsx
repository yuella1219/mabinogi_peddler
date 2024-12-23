import React from 'react'
import {usePopup} from 'core';
import {PopupProps} from 'type';
import { BtnPress } from 'screens';

export const Popup = ({popType="default", mainTxt, subTxt, handleFunc, btnTxt = "확인"} : PopupProps) =>{
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
                {popType === 'alert' ? (
                    <>
                        <div className="popup-header">
                            <h5 className="main-txt">알림</h5>
                        </div>
                        <div className="popup-alert">
                            <p className="alert-txt">{mainTxt}</p>
                        </div>                   
                    </>
                    ) 
                : (
                    <>
                        <div className="popup-header">
                            <h5 className="main-txt">{mainTxt}</h5>
                        </div>
                        <div className="popup-inner">
                            <p>{subTxt}</p>
                        </div>
                    </>
                )
                }
                <div className="popup-bot">
                    <div className="btn-wrap">
                        {popType === 'alert' ? (
                            <BtnPress btnTxt={'확인'} size='s' func={handlePopupInit}/>
                        ) : (
                            <>
                                <BtnPress btnTxt={btnTxt} func={handlePopupNextAction} />
                                <BtnPress btnTxt={'취소'} func={handlePopupInit}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="dim" onClick={handlePopupInit}></div>
        </div>
    )
}