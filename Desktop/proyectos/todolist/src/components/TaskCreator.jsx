import React, { useState } from 'react';

const TaskCreator = ({ onAdd }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        onAdd(input.trim());
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2 align-items-center">
            <input
                type="text"
                className="form-control shadow-sm"
                placeholder="New task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-success">
                Add
            </button>
        </form>
    );
};

export default TaskCreator;
