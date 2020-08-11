//TodoTemplate 컴포넌트는 회색 배경에 흰색 박스를 보여주는 역할
import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; //나중에 초록색 + 버튼을 TodoTemplate 내부의 최하단에 렌더링 해야 하는데 그때 필요한 속성
  background: white; //배경색 흰색
  border-radius: 16px; //테두리 둥글게
  box-shadow: 0 0 8px rbga(0, 0, 0, 0.04); //그림자 투명도 설정

  margin: 0 auto; //페이지 중앙에 나타나도록 설정
  margin-top: 96px; //상단 여백 96px
  margin-bottom: 32px; //하단 여백 32px

  display: flex;
  flex-direction: column; //flex 방향은 위에서 아래로: column
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
