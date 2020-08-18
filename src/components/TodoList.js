import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "./TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const state = useTodoState();
  console.log(state);

  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성하기" done={true} />
      <TodoItem text="밥 먹기" done={false} />
      <TodoItem text="커밋하기" done={false} />
      <TodoItem text="이발하기" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
