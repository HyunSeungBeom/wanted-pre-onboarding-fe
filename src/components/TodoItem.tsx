import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdCreate } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { TodoApi } from "../api/callApi";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const ReviseInput = styled.input`
  width: 276px;
  height: 35px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 17px;
`;

const InsertForm = styled.form``;
function TodoItem({
  id,
  done,
  todo,
}: {
  id: number;
  done: boolean;
  todo: string;
}) {
  const [edited, setEdited] = useState<boolean>(false);
  const [newText, setNewTest] = useState<string>(todo);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newText) {
      updateTododata.mutate(newText);
    }
    setEdited(false);
  };
  const onChange = (e: { target: { value: React.SetStateAction<string> } }) =>
    setNewTest(e.target.value);

  const onRemove = () => {
    deleteTododata.mutate(id);
  };
  const onRevise = () => {
    setEdited(true);
  };

  const onDone = () => {
    doneTododata.mutate(!done);
  };

  const queryClient = useQueryClient();

  const deleteTododata = useMutation(
    (id: number) => TodoApi.deleteTodoApi(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todo_list");
      },
    }
  );

  const updateTododata = useMutation(
    (todo: string) => TodoApi.updataTodoApi(id, todo, done),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todo_list");
      },
    }
  );

  const doneTododata = useMutation(
    (done: boolean) => TodoApi.updataTodoApi(id, todo, done),
    {
      onSuccess: () => {
        console.log("done", done);
        queryClient.invalidateQueries("todo_list");
      },
    }
  );

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onDone}>
        {done && <MdDone />}
      </CheckCircle>
      {done === false ? (
        edited ? (
          <InsertForm onSubmit={onSubmit}>
            <Text done={done}>
              <ReviseInput
                autoFocus
                placeholder="할 일을 수정 후, Enter 를 누르세요"
                onChange={onChange}
                value={newText}
              />
            </Text>
          </InsertForm>
        ) : (
          <>
            <Text done={done}>{todo}</Text>
            <Remove onClick={onRevise}>
              <MdCreate />
            </Remove>
            <Remove onClick={onRemove}>
              <MdDelete />
            </Remove>
          </>
        )
      ) : (
        <>
          {" "}
          <Text done={done}>{todo}</Text>
          <Remove onClick={onRemove}>
            <MdDelete />
          </Remove>
        </>
      )}
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
