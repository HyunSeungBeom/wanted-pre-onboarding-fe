import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { TodoApi } from "../api/callApi";
import { useTodoState } from "../TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todo_query = useQuery(["todo_list"], () => TodoApi.getTodoApi(), {
    onSuccess: (data) => {
      console.log("success", data);
    },
  });
  if (todo_query.data) {
    console.log(todo_query.data.data);
  }

  return (
    <TodoListBlock>
      {todo_query.isSuccess &&
        todo_query.data.data.map(
          (todo: { id: number; todo: string; isCompleted: boolean }) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              todo={todo.todo}
              done={todo.isCompleted}
            />
          )
        )}
    </TodoListBlock>
  );
}

export default TodoList;
