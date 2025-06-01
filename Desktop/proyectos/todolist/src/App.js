import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './components/Column';
import TaskCreator from './components/TaskCreator';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


const initialData = {
  columns: {
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'Task 1' },
        { id: '2', content: 'Task 2' }
      ]
    },
    inProgress: {
      name: 'In Progress',
      items: []
    },
    done: {
      name: 'Done',
      items: []
    }
  }
};

function App() {


  const deleteTask = (colId, taskId) => {
    const newItems = columns[colId].items.filter(item => item.id !== taskId);
    setColumns({
      ...columns,
      [colId]: { ...columns[colId], items: newItems }
    });
  };

  // Editar una tarea
  const editTask = (colId, taskId, newText) => {
    const updatedItems = columns[colId].items.map(item =>
      item.id === taskId ? { ...item, content: newText } : item
    );
    setColumns({
      ...columns,
      [colId]: { ...columns[colId], items: updatedItems }
    });
  };

  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem('columns');
    return stored ? JSON.parse(stored) : initialData.columns;
  });

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [moved] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems
        }
      });
    } else {
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems
        }
      });
    }
  };

  return (
    <div className="container mt-4">

      <TaskCreator onAdd={(text) => {
        const newTask = { id: uuidv4(), content: text };
        setColumns(prev => ({
          ...prev,
          todo: {
            ...prev.todo,
            items: [newTask, ...prev.todo.items]
          }
        }));
      }} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row justify-content-center">
          {Object.entries(columns).map(([id, column]) => (
            <div className={`col-md-4 ${id}-column`} key={id}>
              <Column
                droppableId={id}
                column={column}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
