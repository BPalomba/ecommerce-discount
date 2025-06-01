import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Task = ({ item, index, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(item.content);

    const handleEdit = () => {
        if (isEditing && newContent.trim()) {
            onEdit(item.id, newContent.trim());
        }
        setIsEditing(!isEditing);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    };

    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    className="card mb-2 shadow-sm"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="card-body p-2 d-flex justify-content-between align-items-center">
                        {isEditing ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <p className="mb-0">{item.content}</p>
                        )}
                        <div className="btn-group btn-group-sm">
                            <button
                                className="btn btn-warning"
                                onClick={handleEdit}
                                title={isEditing ? "Save" : "Edit"}
                            >
                                <i className={`bi ${isEditing ? "bi-check" : "bi-pencil"}`}></i>
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(item.id)}
                                title="Delete"
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
