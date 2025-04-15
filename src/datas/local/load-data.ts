/***************************************** 
아니 설계 어케 해야되지 막막한데
nm : 길 id값
url : 이미지 주소
land : 대륙명
******************************************/

export type LoadDataProps = {
    url:string;
    land:string;
    pos:{x:number, y:number}
}