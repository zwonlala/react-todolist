import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "./TodoContext";

const CircleButton = styled.button`
  background: #38d9a9; //기본색상을 초록
  &:hover {
    //hover 했을때는 밝아지고
    background: #63e6be;
  }
  &:active {
    //클릭(active)했을 때는 색상이 어두워지게끔
    background: #20c997;
  }

  z-index: 5; //다른 내용을 가려야하니 z-index 설정
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center; //중앙 정렬

  position: absolute; //버튼의 위치 설정
  left: 50%;
  bottom: 0px; //여기까지 하면 정 가운데에서 조금 우측으로 되고, 맨 밑에 위치하고
  transform: translate(
    -50%,
    50%
  ); //이 문장을 통해 더 정확한 정 가운데를 설정함!

  font-size: 60px; //아이콘 사이즈
  color: white; //아이콘 색상
  border-radius: 40px; //40px 또는 50% 로 설정

  border: none;
  outline: none; //테두리랑 아웃라인 없앨 것

  transition: 0.125s all ease-in; //그리고 이걸 추가해줘야지 애니메이션이 나타남!!!

  //만약 open 이라는 값이 true 다!!
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b; //배경을 빨간색
      &: hover {
        //hover 됐을때도 연한 빨간색으로 설정하고
        background: #ff8787;
      }
      &: active {
        //클릭 됐을때는 진한 빨간색으로 설정
        background: #fa5252;
      }
      //버튼을 45도 돌려줄 것인데, 기존의 translate 하던걸 유지하면서 rotate 해준다!!!!
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

//open 이 true가 돼었을 때, form이 나오게 할 건데, 그때의 위치?를 설정해주는 거
const InsertFormPositioner = styled.div`
  //styled.form 으로 하면 onSubmit 이벤트를 쓸 수 있음!
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

//실제 InsertForm
const InsertForm = styled.form`
  background: #f8f9fa; //배경 회색
  padding: 32px;
  padding-bottom: 72px; //아래는 72px으로 설정(∵ 버튼 공간)
  border-bottom-left-radius: 16px; //이 두 문장은 TodoTemplate에서 모서리를 둥글게 해줬는데, 그 둥근 모서리를 삐져나오지 않게 설정해주는 것
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef; //상단 테두리
`;

//input
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box; //이걸 해야 패딩이 삐져나오지 않음
`;

function TodoCreate() {
  //TodoCreate는 상태관리가 필요함!
  //(∵ 열고 닫는 상태를 관리해줘야 함!)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open); //open값 반전시키는 함수
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault(); //HTML 에서 onSubmit 발생시 새로고침되는 기본 값 실행안되게 하는 코드
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              placeholder="할 일을 입력 후, Enter 키를 눌러주세요."
              autoFocus
              value={value}
              onChange={onChange}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
