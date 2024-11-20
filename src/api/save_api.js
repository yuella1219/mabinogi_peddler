// src/api.js

const BASE_URL = String(process.env.REACT_APP_API_URL) //env 파일에서 url string 타입으로 변환해서 담기
const API_KEY = process.env.REACT_APP_API_KEY; // env파일에서 key 가져와 담기
// GET 요청 예시
export async function saveGetData(npcName, serverName, channel) {// 파라미터 (npc명, 서버명, 채널명)
    const url = new URL(BASE_URL); // 통신 할 url
    url.searchParams.append('npc_name', npcName); // 쿼리 파라미터 추가 - key값 : npc_name, value값 : 인자 npcName
    url.searchParams.append('server_name', serverName); // 쿼리 파라미터 추가 - key값 : server_name, value값 : 인자 serverName
    url.searchParams.append('channel', channel); // 쿼리 파라미터 추가 - key값 : channel, value값 : 인자 channel

    try { //통신 시도
      const response = await fetch(url, { // 비동기적 통신, url로 데이터 전달 요청 +> 비동기 GET 요청
        method: 'GET', // Curl ? +> 요청 방식: GET (데이터 조회 요청)
        headers: {
          'x-nxopen-api-key': API_KEY, // APi key 전송 +> // API 키를 헤더에 포함
          'Accept': 'application/json', // 필수 파라미터는 어디에 포함되어 전송되는가? +> [url뒤에 파라미터로 붙어서 서버로 전송된다. ex)open.api.nexon.com/npc_name=...&server_name=...&channel=...]
        },                              // +> 응답을 JSON 형식으로 기대
      });
      if (!response.ok) { // ok가 되지 않은 경우 > responce code가 200이 아닌 경우 +> HTTP 상태 코드가 200~299(성공 상태) 범위가 아닌 경우 ex) response.code : 200 = true / response.code : 400 = false
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); // JSON 형식으로 응답 데이터 파싱
      return data; // 파싱된 데이터 반환

    } catch (error) { // error 코드일 경우 ? +> 네트워크 오류 또는 응답 실패 시
      console.error('Fetch error:', error);
      throw error; // +> 오류를 다시 던져서 호출한 곳에서 처리 가능하도록 함
    }
  }
  
//   주석을 아주 잘 달아주셨습니다! 남겨주신 주석의 내용이 대부분 정확한데요, 질문하신 부분과 약간 더 설명이 필요한 부분에 대해 설명드리겠습니다.

//   1. method: 'GET'의 의미 (Curl?)
//   **method: 'GET'**은 HTTP 요청의 HTTP 메서드를 지정하는 부분입니다.
//   GET 요청은 서버에서 데이터를 조회할 때 사용하는 요청 방식입니다. 여기서는 서버에서 데이터를 읽어오는 요청이므로 GET을 사용합니다.
//   Curl과의 관계: curl은 명령줄에서 HTTP 요청을 보내기 위한 도구입니다. fetch에서 method: 'GET'으로 지정하는 것은, curl -X GET과 유사하다고 볼 수 있습니다. 이 옵션이 없으면 fetch 기본값이 GET이기 때문에 GET은 생략해도 무방합니다.
//   2. 'Accept': 'application/json'의 역할과 필수 파라미터 위치
//   **'Accept': 'application/json'**은 서버에게 응답 형식으로 JSON을 기대한다는 것을 알려주는 헤더입니다. 여기서 Accept 헤더는 클라이언트가 서버에 원하는 응답의 콘텐츠 유형(형식)을 알려주는 역할을 합니다.
//   필수 파라미터의 위치: 필수 파라미터(npc_name, server_name, channel)는 URL의 쿼리 문자열에 포함됩니다. 즉, url.searchParams.append를 통해 URL에 추가한 부분입니다. 이 쿼리 파라미터는 URL 끝에 ?npc_name=...&server_name=...&channel=...와 같은 형식으로 포함됩니다.
//   3. if (!response.ok) 조건의 의미 (responce code가 200이 아닌 경우)
//   response.ok는 HTTP 상태 코드가 200~299 범위(즉, 성공 상태)인지 확인하는 속성입니다.
//   만약 응답 코드가 400이나 500 등 에러 코드라면 response.ok는 false가 됩니다. 이 경우 throw new Error 구문을 통해 에러가 발생하며, catch 블록에서 에러 처리가 이루어집니다.
//   4. catch 블록에서 발생하는 상황 (error 코드일 경우 ?)
//   catch 블록은 네트워크 오류나 throw new Error 구문이 실행될 때 호출됩니다.
//   이 블록에서는 오류 메시지를 콘솔에 출력하고, 에러를 다시 던져서 이 함수(getData)를 호출한 곳에서도 에러 처리를 할 수 있도록 합니다.
//   주석의 수정 및 추가 설명
//   남겨주신 주석을 바탕으로, 이해하기 쉽게 주석을 조금 더 다듬어 보았습니다.
  
//   javascript
//   코드 복사
//   // src/api.js
  
//   // 환경 변수에서 기본 URL과 API 키를 불러옵니다.
//   const BASE_URL = String(process.env.REACT_APP_API_URL); // API URL을 문자열로 변환하여 담기
//   const API_KEY = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기
  
//   // GET 요청 함수: 특정 NPC 상점 데이터를 조회합니다.
//   export async function getData(npcName, serverName, channel) {
//       const url = new URL(BASE_URL); // API URL 생성
//       url.searchParams.append('npc_name', npcName); // 쿼리 파라미터 추가 - key: npc_name, value: npcName
//       url.searchParams.append('server_name', serverName); // 쿼리 파라미터 추가 - key: server_name, value: serverName
//       url.searchParams.append('channel', channel); // 쿼리 파라미터 추가 - key: channel, value: channel
  
//       try { 
//         const response = await fetch(url, { // 비동기 GET 요청
//           method: 'GET', // 요청 방식: GET (데이터 조회 요청)
//           headers: {
//             'x-nxopen-api-key': API_KEY, // API 키를 헤더에 포함
//             'Accept': 'application/json', // 응답을 JSON 형식으로 기대
//           },
//         });
  
//         // 응답이 성공적이지 않은 경우 (상태 코드가 200~299 범위 밖일 때)
//         if (!response.ok) { 
//           throw new Error('Network response was not ok'); // 에러 발생
//         }
  
//         const data = await response.json(); // JSON 형식으로 응답 데이터 파싱
//         return data; // 파싱된 데이터 반환
  
//       } catch (error) { // 네트워크 오류 또는 응답 실패 시
//         console.error('Fetch error:', error); // 오류를 콘솔에 출력
//         throw error; // 오류를 다시 던져서 호출한 곳에서 처리 가능하도록 함
//       }
//     }
//   요약
//   method: 'GET': GET 요청으로 데이터를 조회하기 위한 방식.
//   'Accept': 'application/json': 서버에게 JSON 형식의 응답을 요청하는 헤더.
//   쿼리 파라미터의 위치: url.searchParams.append로 URL에 추가되며, ?npc_name=...&server_name=...&channel=... 형태로 전송됩니다.
//   response.ok: HTTP 상태 코드가 성공(200~299) 범위인지 확인하는 조건문.
//   catch 블록: 네트워크 오류나 응답 실패 시 에러를 처리하는 부분.
//   이렇게 이해하시면 됩니다! 추가로 궁금한 점이 있으면 언제든지 질문해 주세요 😊