import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md"; //TodoItem에 사용할 아이콘 불러옴
import { useTodoDispatch } from "./TodoContext";

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px; //테두리를 둥글게 하기 위해서는 "16px"나 "50%" 이렇게 설정해 주면 됨.
  border: 1px solid #ced4da; //border는 기본적으로 회색
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center; //체크 아이콘이 동그라미의 중앙에 나타나도록
  margin-right: 20px;
  cursor: pointer;

  //나중에 CheckCircle에게 done 이라는 props를 보내줄 것 임!
  //done이라는 값이 온다면 여러 줄의 CSS를 작성해줘야 하므로 위에서 CSS import
  //done 값이 있으면, 테두리의 색과 색상을 바꿔준다!
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1; //자신이 차지할 수 있는 공간 모두 차지하도록
  font-size: 21px;
  color: #495057;

  //만약 done 이라는 props가 들어온다면 글자색을 아주 연하게 설정
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const Remove = styled.div`
  opacity: 0; //처음엔 안보임. TodoItemBlock에 커서를 올렸을 때만 보이게 할거임(이 설정은 TodoItemBlock "& hover"에 있음!)
  display: flex;
  align-items: center;
  justify-content: center; //중앙에 정렬
  color: #dee2e6; //칼라는 기본적으로 회색
  font-size: 24px;
  cusor: pointer; //커서가 바뀌게 해줄 거고
  &:hover {
    //커서가 올라가면 빨간색으로 바꿔줄꺼임!
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center; //세로로 정렬
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover { //TodoItemBlock 위에 커서가 올라오면
    ${Remove} { //위에 있는 Remove를 불러와("${Remove}" 이게 실제 가리키는 값은 해당 Remove 컴포넌트의 styled-components의 만들어진 class 이름이 여길루 옴)
      opacity: 1; //opacity를 1로 설정해준다!!! 즉 보여진다
    }
  }
`;

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();

  const onToggle = () => {
    dispatch({ type: "TOGGLE", id });
  };

  const onRemove = () => {
    dispatch({ type: "REMOVE", id });
  };
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete onClick={onRemove} />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
// export default TodoItem;
//기존의 위 문장을 최적화함.
//기존의 문장은 하나의 TodoItem 바뀌어도 전체 TodoItem 리렌더링 되는데
//React.memo()를 사용하면, 변화가 된 TodoItem만 리렌더링
