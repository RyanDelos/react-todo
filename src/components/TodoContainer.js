import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import Loading from './Loading';
import style from './TodoListItem.module.css';
// import { object } from 'prop-types';

const BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const GRID_VIEW = 'view=Grid%20view';

const apiUrl = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const TodoContainer = () => {
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
      const response = await fetch(`${apiUrl}?${GRID_VIEW}`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const todoFromAPI = await response.json();
      console.log('todoFromAPI: ', todoFromAPI.records);

      const sortedTodos = todoFromAPI.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.title.toLowerCase();
        const titleB = objectB.fields.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });

      // button
      // sort according to the sort state
      // t/f => conditionally sort by asc or dsc
      // optional chaining

      // const reverseSort = todoFromAPI.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();

      //   if (titleA < titleB) {
      //     return 1;
      //   }
      //   if (titleA > titleB) {
      //     return -1;
      //   }
      //   return 0;
      // });

      const todos = sortedTodos.map((todo) => {
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

  const addTodo = async (newTodo) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodo,
        },
      }),
    };

    try {
      const response = await fetch(apiUrl, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const addedTodo = await response.json();
      // console.log('addedTodo: ', addedTodo);
      // return;

      // const todos = todoFromAPI.records.map((todo) => {
      //   const todoItem = {
      //     id: todo.id,
      //     title: todo.fields.title,
      //   };
      //   return todoItem;
      // });
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: addedTodo.id, title: addedTodo.fields.title },
      ]);
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

  // const addTodo = (newTodo) => {
  //   setTodoList([...todoList, newTodo]);
  // };

  const removeTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(`${apiUrl}/${id}`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const removeTodoItem = await response.json();
      setTodoList((prevTodoList) =>
        prevTodoList.filter((item) => item.id !== removeTodoItem.id)
      );
    } catch (error) {
      console.log('Error Message:', error.message);
    }
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
    <>
      <h1 className={style.ToDoListTitle}>Todo List</h1>
      <div className={style.Content}>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            setUpdate={setUpdate}
          />
        )}
      </div>
    </>
  );
};

export default TodoContainer;
