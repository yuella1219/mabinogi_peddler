import React from 'react'
import {useState, useRef} from 'react';

export const Todo = () =>{
    const _todo = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    
    const handleTodo = () =>{
        if(_todo.current){
            if(expanded) {
                _todo.current.classList.add('expanded');
            }else{
                _todo.current.classList.remove('expanded');
            }
        }
        setExpanded(!expanded);
    }

    return(
        <div className="todo" ref={_todo} onClick={handleTodo}>
            <h2>To Do List</h2>
            <p className="complete">상점 전체 탭 순회할 수 있도록 코드 수정</p>
            <p className="complete">와인재료 1개 이상의 묶음 선택했을 시 동일한 가격의 아이템 장바구니에 담기</p>
            <p className="complete">아이템 이름 외 선택지 필요 - ex) 델, 델렌 꽃이름 동일하여 첫번째 배열 아이템밖에 담기지 않음<br />컬러코드 등으로 구분 필요</p>
            <p className="complete">스토리지에 데이터 저장 - 타임 데이터 체크 후 갱신 필요 시 갱신하여 스토리지에 재저장</p>
            <p className="complete">
                잔고
                <span className="complete">골드, 금박 솔방울, 두카트, 모험가의 인장</span>
                <span>전역상태로 생성 완료</span>
            </p>
            <p className="complete">아이템 카탈로그에 화폐 종류 구분</p>
            <p>구매한 목록(baggage) 구현</p>
            <p>무게, 슬롯
                <span>이동수단 및 교역 규모 선택</span>
                <span>장바구니가 있고</span>
                <span>이동수단에 이미 실은 짐이 있고</span>
                <span>이걸 구분해야 하고</span>
                <span>장바구니에 아이템을 담을 때 상점 갱신이 필요하고</span>
                <span>구매한 아이템(baggage)는 전역 또는 스토리지로 관리되어야 하지만</span>
                <span>이동수단(transport)는 굳이 전역으로 관리되어야 할 필요가 없다</span>
                <span>단, 현재 내 이동수단의 사용중인 무게/슬롯은 계산되어야 할 필요가 있다.</span>
                <span>이를 위해 구매목록(baggage)가 전역으로 관리되고 스토리지에 저장되어야 할 필요가 있음.</span>
                <span>이 모든 동작들이 수행되는 데 짐 상태가 방해받지 않고 데이터를 온전히 보존할 수 있게 전역상태로 관리하고</span>
                <span>할거 개많네</span>
                <span>이동수단 차등화 - 단순 슬롯과 무게만으로 구분지어 사용하기에 다른 이동수단을 구매 할 필요가 없음</span>
            </p>
            <p>
                판매 시스템<br />
                <span>NPC 비주얼 더미데이터 필요</span>
                <span>판매버튼 필요</span>
                <span>금액 계산할 때 innerHtml로 계산하지 않기</span>
            </p>
            <p>짐 꾸러미 내부에 동일한 이름을 가진 아이템이 있을 경우, 어떤 아이템을 판매할건지 선택</p>
            <p>
                외부 조건에 따른 데이터 업데이트<br/>
                <span>구매수량 제한 아이템 구매갯수 체크 필요</span>
                <span>친밀도에 따른 할인률 적용</span>
                <span>NPC 필수 매입 아이템 업데이트</span>
                <span>파트너 유무</span>
                <span>알파카 펫 보유 여부</span>
                <span>이벤트 상인</span>
                <span>밀수꾼</span>
                <span>약탈단 - 미니게임으로 쫓아내기</span>
                <span>경호원 고용</span>
            </p>
        </div>
    )
}