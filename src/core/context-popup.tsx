import React, { ReactNode, useState, createContext, useContext } from 'react';
import {Popup} from 'screens';
import {PopupProps} from 'type';

interface PopupContextProps {
    popupData : PopupProps | null;
    setPopupData : React.Dispatch<React.SetStateAction<PopupProps | null>>;
    callPopup: ({ mainTxt, subTxt, handleFunc, btnTxt }: PopupProps) => void;
}

const PopupContext = createContext<PopupContextProps | null>(null);

export const PopUpProvider = ({children} : {children : ReactNode}) =>{
    const [popupData, setPopupData] = useState<PopupProps | null>(null);

    const callPopup = ({ popType, mainTxt, subTxt, handleFunc, btnTxt }: PopupProps) => {
        setPopupData({
          popType,
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