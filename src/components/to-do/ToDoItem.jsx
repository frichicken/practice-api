import { useContext } from 'react';
import { ToDoContext } from 'App';

const TodoItem = ({ todo }) => {
    const { toggleDeleteModal, toggleFormModal, setTodoId } = useContext(ToDoContext);
    return (
        <div className='todo-item flex flex-col gap-y-[10px] border-[1px] border-black p-[15px_20px]'>
            <div className='flex justify-between items-center flex-wrap gap-y-[10px]'>
                <div>
                    <div>Title: {todo.title}</div>
                    <div>from: {todo.from.name}</div>
                </div>
                <div>State: {todo.completed ? 'Completed' : 'Ongoing'}</div>
            </div>
            <div className='flex gap-x-[10px]'>
                <button
                    className='button-modify min-w-[100px] border-black border-[1px] p-[4px_12px] hover:border-yellow-400 hover:bg-yellow-400 hover:text-white'
                    onClick={() => {
                        toggleFormModal();
                        setTodoId(todo.id);
                    }}
                >
                    Modify
                </button>
                <button
                    className='show-delete-modal min-w-[100px] border-black border-[1px] hover:border-red-400 hover:bg-red-400 hover:text-white p-[4px_12px] '
                    onClick={() => {
                        toggleDeleteModal();
                        setTodoId(todo.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
