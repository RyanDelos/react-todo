import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import style from './TodoListItem.module.css';

const BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;

const apiUrl = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const todoFromAPI = await response.json();

      const todos = todoFromAPI.records.map((todo) => {
        const todoItem = {
          id: todo.id,
          title: todo.fields.title,
        };
        return todoItem;
      });
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log('Error Message:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  };

  const setUpdate = (updatedTitle, id) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <>
              <h1 className={style.ToDoListTitle}>Todo List</h1>
              <div className={style.Content}>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList
                    todoList={todoList}
                    onRemoveTodo={removeTodo}
                    setUpdate={setUpdate}
                  />
                )}
              </div>
            </>
          }
        />
        <Route path={'/new'} element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
