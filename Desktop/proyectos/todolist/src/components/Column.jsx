import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';

const Column = ({ droppableId, column, onDelete, onEdit }) => {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-header text-center fw-semibold bg-primary text-white">
                {column.name}
            </div>
            <Droppable droppableId={droppableId}  >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{ minHeight: '300px', backgroundColor: '#f9fafb' }}
                    >
                        {column.items.map((item, index) => (
                            <Task
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={(id) => onDelete(droppableId, id)}
                                onEdit={(id, newText) => onEdit(droppableId, id, newText)}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
