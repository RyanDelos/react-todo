import React from 'react';

const todoList = [
  {
    objectID: 0,
    title: 'complete lesson 1',
  },
  {
    objectID: 1,
    title: 'workout',
  },
  {
    objectID: 2,
    title: 'laundry',
  },
];

function App() {
  return (
    <div>
      <h1 className="heading">Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.objectID}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
