import { ToDoContext } from 'App';
import ModalContainer from 'components/shared/ModalContainer';
import { useContext } from 'react';
import axios from 'axios';

function deleteToDo(todoId) {
    return axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
}

const DeleteModal = ({ isShowed, toggleDeleteModal }) => {
    const { todoId, todos, setTodos } = useContext(ToDoContext);

    return (
        isShowed && (
            <ModalContainer>
                <div className='bg-white delete-modal flex flex-col items-center justify-center w-[600px] fixed top-[10vh] left-[50%] translate-x-[-50%]'>
                    <div className='w-full h-[300px]'>
                        <img
                            alt='delete'
                            className='h-full w-full object-cover'
                            src='https://cdn.dribbble.com/users/2071065/screenshots/11290656/media/708a04154bee862d76c421815318fef7.png'
                        />
                        <span
                            className='close-modal absolute top-0 right-0 text-[20px] cursor-pointer p-[12px_20px]'
                            onClick={() => toggleDeleteModal()}
                        >
                            &times;
                        </span>
                    </div>
                    <div className='p-[30px_50px] flex gap-y-[15px] flex-col items-center'>
                        <p className='text-[24px]'>Are you sure?</p>
                        <p className='px-[100px] text-center'>
                            Do you really want to delete this one? This process can't be undone
                        </p>
                        <div className='flex gap-x-[40px] mt-[15px]'>
                            <button
                                className='button-delete min-w-[100px] border-black border-[1px] hover:border-red-400 hover:bg-red-400 hover:text-white p-[4px_12px]'
                                onClick={() => {
                                    if (todoId != null) {
                                        deleteToDo(todoId)
                                            .then(() => {
                                                setTodos(
                                                    todos.filter((todo) => todo.id !== todoId)
                                                );
                                                toggleDeleteModal();
                                            })
                                            .catch((error) => console.log(error));
                                    }
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className='button-delete min-w-[100px] border-black border-[1px] hover:border-gray-400 hover:bg-gray-400 hover:text-white p-[4px_12px] flex-wrap'
                                onClick={() => toggleDeleteModal()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </ModalContainer>
        )
    );
};

export default DeleteModal;
