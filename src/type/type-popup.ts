
export type PopupProps = {
    popType?: 'alert' | 'default';
    mainTxt : string;
    subTxt? : string;
    handleFunc : (el?:any) => void | null;
    btnTxt? : string;
    hideBtn? : boolean;
};