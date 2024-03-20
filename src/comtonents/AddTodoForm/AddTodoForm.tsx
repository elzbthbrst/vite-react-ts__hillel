import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import style from './AddTodoForm.module.css'
import { updateTodo,clearEditTodo, postTodo } from "../../store/todoSlice";

const AddTodoForm = () => {
  const [value, setValue] = useState<string>("");
  const editTodo = useAppSelector((state) => state.todo.editTodo);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editTodo) {
      dispatch(updateTodo({ ...editTodo, title: value }));
      dispatch(clearEditTodo());
      setValue("");
      return;
    }
    const todo = { title: value };
    dispatch(postTodo(todo));
    setValue("");
  };

  useEffect(() => {
    if (editTodo) {
      setValue(editTodo.title);
    }
  }, [editTodo]);

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label> Add todo</label>
      <input
        value={value}
        type="text"
        placeholder="title"
        onChange={handleChange}
      />
    </form>
  );
};

export default AddTodoForm;
