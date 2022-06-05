import ModalContainer from 'components/shared/ModalContainer';
import { useEffect, useState } from 'react';
import generateString from 'utils/generateString';
import axios from 'axios';

function createToDo(obj) {
    return axios('https://jsonplaceholder.typicode.com/todos', {
        method: 'post',
        data: obj,
    });
}

function modifyToDo(obj) {
    return axios('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'put',
        data: obj,
    });
}

const ToDoFormModal = ({ isShowed, todoId, toggleFormModal, users, todos }) => {
    const [toDoFrom, setToDoFrom] = useState(users[0]?.id);
    const [titleInput, setTitleInput] = useState('');
    const [toDoState, setToDoState] = useState(false);

    useEffect(() => {
        if (todoId) {
            const modifiedToDo = todos.find((todo) => todo.id === todoId);
            setTitleInput(modifiedToDo.title);
            setToDoState(modifiedToDo.completed);
            setToDoFrom(modifiedToDo.from.id);
        } else {
            setTitleInput('');
            setToDoState(false);
            setToDoFrom(users[0]?.id);
        }
    }, [todoId]);

    return (
        isShowed && (
            <ModalContainer>
                <div className='bg-white delete-modal flex flex-col items-center justify-center w-[600px] fixed top-[10vh] left-[50%] translate-x-[-50%]'>
                    <div className='w-full h-[150px]'>
                        <img
                            alt={`${todoId ? 'Modify' : 'Create'}`}
                            className='h-full w-full object-cover'
                            src='https://cdn.dribbble.com/users/6606113/screenshots/18303403/media/6856c5bde313ece616a632d4a2a4acb6.jpg'
                        />
                        <span
                            className='close-modal absolute top-0 right-0 text-[20px] cursor-pointer p-[12px_20px]'
                            onClick={() => toggleFormModal()}
                        >
                            &times;
                        </span>
                    </div>
                    <div className='p-[30px_50px] flex gap-y-[15px] flex-col '>
                        <div className='text-[24px] text-center'>
                            {`${todoId ? 'Modify' : 'Create'}`}
                        </div>
                        <div>
                            <label className='flex flex-col gap-y-[5px]'>
                                Title:
                                <input
                                    type='text'
                                    className='p-[8px_12px] border-[1px] border-black outline-none'
                                    value={titleInput}
                                    onChange={(event) => {
                                        setTitleInput(event.target.value);
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <label className='flex flex-col gap-y-[5px]'>
                                From:
                                <select
                                    type='text'
                                    className='p-[10px_14px] border-[1px] border-black outline-none'
                                    value={toDoFrom}
                                    onChange={(event) => {
                                        setToDoFrom(event.target.value);
                                    }}
                                >
                                    {users.map((user) => {
                                        return (
                                            <option key={generateString(5)} value={user.id}>
                                                {user.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </label>
                        </div>
                        {todoId && (
                            <div>
                                <label className='flex flex-col gap-y-[5px]'>
                                    State:
                                    <select
                                        type='text'
                                        className='p-[10px_14px] border-[1px] border-black outline-none'
                                        value={toDoState}
                                        onChange={(event) => setToDoState(event.target.value)}
                                    >
                                        <option value={false}>Ongoing</option>
                                        <option value={true}>Completed</option>
                                    </select>
                                </label>
                            </div>
                        )}
                        <div className='flex gap-x-[40px] mt-[15px]'>
                            <button
                                className='button-delete min-w-[100px] border-black border-[1px] hover:border-blue-400 hover:bg-blue-400 hover:text-white p-[4px_12px]'
                                onClick={() => {
                                    if (todoId === null) {
                                        const newToDoPost = {
                                            id: generateString(5),
                                            title: titleInput,
                                            userId: +toDoFrom,
                                            completed: false,
                                        };
                                        const { userId, ...rest } = newToDoPost;
                                        rest.from = users.data.find(
                                            (user) => user.id === +toDoFrom
                                        );
                                        createToDo(newToDoPost)
                                            .then(() => {
                                                todos.unshift(rest);
                                                toggleFormModal();
                                            })
                                            .catch((error) => console.log(error));
                                    } else {
                                        const modifiedToDoPut = {
                                            id: todoId,
                                            title: titleInput,
                                            userId: +toDoFrom,
                                            completed: toDoState === 'true' ? true : false,
                                        };
                                        const { userId, ...rest } = modifiedToDoPut;
                                        rest.from = users.find((user) => user.id === userId);
                                        modifyToDo(modifiedToDoPut)
                                            .then(() => {
                                                todos.splice(
                                                    todos.indexOf(
                                                        todos.find((todo) => todoId === todo.id)
                                                    ),
                                                    1,
                                                    rest
                                                );

                                                toggleFormModal();
                                            })
                                            .catch((error) => console.log(error));
                                    }
                                }}
                            >
                                {todoId ? 'Modify' : 'Create'}
                            </button>
                            <button
                                className='button-delete min-w-[100px] border-black border-[1px] hover:border-gray-400 hover:bg-gray-400 hover:text-white p-[4px_12px] flex-wrap'
                                onClick={() => toggleFormModal()}
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

export default ToDoFormModal;
