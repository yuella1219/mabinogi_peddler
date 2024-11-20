const API_KEY = String(process.env.REACT_APP_API_KEY);
const API_URL = String(process.env.REACT_APP_API_URL);

export type ParamProps  = {
    chaNm : string;
    serNm : string;
    chnNum : number;
}

export const getData = async ({chaNm, serNm, chnNum}:ParamProps) => {
    const url = new URL(API_URL);
    url.searchParams.append('npc_name', chaNm);
    url.searchParams.append('server_name', serNm);
    url.searchParams.append('channel', String(chnNum));

    try{
        const response = await fetch(url, {
            method : 'GET',
            headers : {
                'accept' : 'application/json',
                'x-nxopen-api-key' : API_KEY,
            }            
        });
        if (!response.ok) { // ok가 되지 않은 경우 > responce code가 200이 아닌 경우 +> HTTP 상태 코드가 200~299(성공 상태) 범위가 아닌 경우 ex) response.code : 200 = true / response.code : 400 = false
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;

    }catch(error){
        console.error('error');
        throw error;
    }
}