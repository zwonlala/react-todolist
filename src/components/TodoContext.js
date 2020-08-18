import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 빨리 마무리 하기",
    done: true,
  },
  {
    id: 2,
    text: "손풍기 알아보기",
    done: false,
  },
  {
    id: 3,
    text: "키보드 알아보기",
    done: false,
  },
  {
    id: 4,
    text: "할거 많다ㅠㅜ",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`unhandled action.type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {/* 위 두 Provider의 위치는 상관이 없음! */}
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

//다른 파일에서
//const state = useContext(TodoStateContext);
//위와 같이 사용할 수 있지만 그냥 커스텀 훅을 만들어 줄 것임.
export function useTodoState() {
  //   return useContext(TodoStateContext);
  //위가 기존 코드인데, 에러 처리를 해줄거임!!
  //필수는 아니지만 습관화 해놓으면 실수를 했을때 빨리 알아차릴 수 있다!

  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  //   return useContext(TodoDispatchContext);
  //위가 기존 코드인데, 에러 처리를 해줄거임!!
  //필수는 아니지만 습관화 해놓으면 실수를 했을때 빨리 알아차릴 수 있다!

  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

//위와 같이 커스텀 훅을 만들었으니 다른 파일에서 사용할 때
//const state = useTodoState();
//위와 같이 사용하면 됨!

export function useTodoNextId() {
  //   return useContext(TodoNextIdContext);
  //위가 기존 코드인데, 에러 처리를 해줄거임!!
  //필수는 아니지만 습관화 해놓으면 실수를 했을때 빨리 알아차릴 수 있다!

  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
//nextId를 위한 커스텀 훅
//const nextId = useTodoNextId();
//nextId.current += 1;
//위와 같이 사용하면 됨!
