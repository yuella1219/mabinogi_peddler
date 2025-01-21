import React from 'react'
import {usePopup} from 'core';
import {PopupProps} from 'type';
import { BtnPress } from 'screens';

export const Popup = ({popType="default", mainTxt, subTxt, handleFunc, btnTxt = "확인", hideBtn} : PopupProps) =>{
    const {setPopupData} = usePopup();

    // 확인버튼에 심을 함수
    const handlePopupNextAction = () =>{
        handleFunc();
    }

    // 초기화
    const handlePopupInit = () => {
        setPopupData(null)
    }

    // text 줄바꿈
    const replaceSubText = (txt:string) =>{
        const _txt = txt.replace(/<br\s*\/?>/g, "\n");
        return _txt;
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
                            <p className="alert-txt">{replaceSubText(mainTxt)}</p>
                        </div>                   
                    </>
                    ) 
                : (
                    <>
                        <div className="popup-header">
                            <h5 className="main-txt">{mainTxt}</h5>
                        </div>
                        <div className="popup-inner">
                            <p>{replaceSubText(subTxt ?? '')}</p>
                        </div>
                    </>
                )
                }
                {hideBtn ? null : (
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
                )}
            </div>
            <div className="dim" onClick={()=>{
                if(hideBtn){
                    return false;
                }else{
                    handlePopupInit()
                }
            }}></div>
        </div>
    )
}