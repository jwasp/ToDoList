import {TaskStateType, TaskType} from "./AppWithRedux";
import {v1} from "uuid";
import {AddTodoListsAT, RemoveTodoListAT, todolistsReducer} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todoListId: string
}


export type ChangeStatusTaskActionType = {
    type: 'CHANGE_STATUS_TASK'
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTitleTaskActionType = {
    type: 'CHANGE_TITLE_TASK'
    taskId: string
    title: string
    todoListId: string
}

let initialState: TaskStateType = {
    '22': []
}

type initialStateType = typeof initialState

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | ChangeTitleTaskActionType
    | AddTodoListsAT
    | RemoveTodoListAT



export const tasksReducer = (state= initialState, action: ActionsType):initialStateType  => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
            ...state,
            [action.todoListId]: state[action.todoListId].filter(t=> t.id != action.taskID)
    }
        case 'ADD_TASK':
            let task: TaskType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todoListId]: [task, ...state[action.todoListId]]
            }
        case "CHANGE_STATUS_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id === action.taskId)
                            return {...task, isDone: action.isDone}
                        else return task
                    })
            }
        case "CHANGE_TITLE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id === action.taskId) return {...task, title: action.title}
                        else return task
                    })
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        taskID: taskID,
        todoListId: todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return { type: 'ADD_TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId:string): ChangeStatusTaskActionType => {
    return { type: 'CHANGE_STATUS_TASK', taskId, isDone, todoListId}
}

export const changeTitleAC = (taskId: string, title: string, todoListId:string): ChangeTitleTaskActionType => {
    return { type: 'CHANGE_TITLE_TASK', taskId, title, todoListId}
}



