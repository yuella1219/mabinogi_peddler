import React, { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import {Popup} from 'screens';
import {PopupProps} from 'type';

interface CallPopupParams {
    mainTxt: string;
    subTxt?: string;
    handleFunc: (el?: any) => void;
    btnTxt?: string;
}

interface PopupContextProps {
    popupData : PopupProps | null;
    setPopupData : React.Dispatch<React.SetStateAction<PopupProps | null>>;
    callPopup: ({ mainTxt, subTxt, handleFunc, btnTxt }: CallPopupParams) => void;
}

const PopupContext = createContext<PopupContextProps | null>(null);

export const PopUpProvider = ({children} : {children : ReactNode}) =>{
    const [popupData, setPopupData] = useState<PopupProps | null>(null);

    const callPopup = ({ mainTxt, subTxt, handleFunc, btnTxt }: CallPopupParams) => {
        setPopupData({
          mainTxt,
          subTxt,
          handleFunc,
          btnTxt,
        });
      };

    return(
        <PopupContext.Provider value={{popupData, setPopupData, callPopup}}>
            {children}
            {popupData && (
                <Popup {...popupData} />
            )}
        </PopupContext.Provider>
    )
}

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
      throw new Error("팝업용 데이터가 없는뎁쇼");
    }
    return context;
  };