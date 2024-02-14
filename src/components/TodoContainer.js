import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import Loading from './Loading';
import style from '../styles/Application.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Home } from '../icons/homeIcon.svg';

const BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.REACT_APP_TABLE_NAME;
const GRID_VIEW = 'view=Grid%20view';

const apiUrl = `${BASE_URL}/${BASE_ID}/${TABLE_NAME}`;

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState('asc');

  useEffect(() => {
    if (todoList.length > 0) {
      const sortedTodo = sortTodos(currentSort, todoList);
      setTodoList(sortedTodo);
    }
  }, [currentSort]);

  const sortTodos = (sortType, todoItems) => {
    todoItems.sort((objectA, objectB) => {
      const titleA = objectA.title.toLowerCase();
      const titleB = objectB.title.toLowerCase();

      if (sortType === 'asc') {
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
      } else if (sortType === 'dsc') {
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }
      }
      return 0;
    });
    return todoItems;
  };

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

      const todos = todoFromAPI.records.map((todo) => {
        const todoItem = {
          id: todo.id,
          title: todo.fields.title,
        };
        return todoItem;
      });
      const sortedTodo = sortTodos(currentSort, todos);
      setTodoList(sortedTodo);
      setIsLoading(false);
    } catch (error) {
      alert('Error Message:', error.message);
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
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: addedTodo.id, title: addedTodo.fields.title },
      ]);
    } catch (error) {
      alert('Error Message:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (todoList.length > 0) {
      setTodoList((prevTodoList) => sortTodos(currentSort, [...prevTodoList]));
    }
  }, [currentSort]);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

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
      alert('Error Message:', error.message);
    }
  };

  const setUpdate = async (updatedTitle, id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: updatedTitle,
        },
      }),
    };

    try {
      const response = await fetch(`${apiUrl}/${id}`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const changedTitle = await response.json();
      setTodoList((prevTodoList) =>
        prevTodoList.map((item) =>
          item.id === id ? { ...item, title: changedTitle.fields.title } : item
        )
      );
    } catch (error) {
      alert('Error Message:', error.message);
    }
  };

  const handleSortChange = (e) => {
    setCurrentSort(e.target.value);
  };

  return (
    <>
      <button className={style.homeButton}>
        <Link to="/home">
          <Home />
        </Link>
      </button>
      <div className={style.appContainer}>
        <h1 className={style.ToDoListTitle}>Todo List</h1>
        <div className={style.Content}>
          <AddTodoForm onAddTodo={addTodo} onSortTodo={handleSortChange} />
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
      </div>
    </>
  );
};

export default TodoContainer;
