import { useState, useEffect, Fragment } from 'react';
import React from 'react';
import './css/output.css';
import axios from 'axios';
import DeleteModal from 'components/modals/DeleteModal';
import ToDoFormModal from 'components/modals/ToDoFormModal';
import TodoItem from 'components/to-do/ToDoItem';
import generateString from 'utils/generateString';

export const ToDoContext = React.createContext({});

function App() {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);
    const [todoId, setTodoId] = useState(null);
    const [isDeleteModalShowed, setDeleteModalAppearance] = useState(false);
    const [isFormModalShowed, setFormModalAppearance] = useState(false);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.data)
            .then((todos) => {
                axios('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.data)
                    .then((users) => {
                        const newTodosArray = todos.map((todo) => {
                            const userFound = users.find((user) => todo.userId === user.id);
                            const { userId, ...rest } = todo;
                            return { ...rest, from: userFound };
                        });
                        return { todos: newTodosArray, users };
                    })
                    .then(({ todos, users }) => {
                        setTodos(todos);
                        setUsers(users);
                    });
            })
            .catch((error) => console.log(error));
    }, []);

    const toggleDeleteModal = () => {
        setDeleteModalAppearance(!isDeleteModalShowed);
    };

    const toggleFormModal = () => {
        setFormModalAppearance(!isFormModalShowed);
    };

    const contextValue = {
        todoId,
        todos,
        setTodos,
        setTodoId,
        users,
        isDeleteModalShowed,
        toggleDeleteModal,
        isFormModalShowed,
        toggleFormModal,
    };

    const renderTodosList = () => {
        if (todos.length === 0 || users.length === 0) return null;

        return (
            <Fragment>
                {todos.map((todo) => {
                    return <TodoItem key={generateString(5)} todo={todo} />;
                })}
            </Fragment>
        );
    };

    return (
        <div className='App relative'>
            <ToDoContext.Provider value={contextValue}>
                <div className='todos-container flex flex-col gap-y-[20px]'>
                    <div className='flex justify-between items-center'>
                        <div>Total: {todos.length}</div>
                        <button
                            className='create-button border-black border-[1px] hover:border-blue-400 hover:bg-blue-400 hover:text-white p-[4px_12px] '
                            onClick={() => {
                                setTodoId(null);
                                toggleFormModal();
                            }}
                        >
                            Create a new one
                        </button>
                    </div>
                    {renderTodosList()}
                </div>
                {users.length > 0 && todos.length > 0 && (
                    <Fragment>
                        <DeleteModal
                            isShowed={isDeleteModalShowed}
                            toggleDeleteModal={toggleDeleteModal}
                        />
                        <ToDoFormModal
                            isShowed={isFormModalShowed}
                            todoId={todoId}
                            toggleFormModal={toggleFormModal}
                            users={users}
                            todos={todos}
                        />
                    </Fragment>
                )}
            </ToDoContext.Provider>
        </div>
    );
}

export default App;
