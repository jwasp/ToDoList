import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string //дополнительные данные для выполнения этой функции
}

export type AddTodoListsAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string

}

export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

export type ActionUnionType = RemoveTodoListAT | AddTodoListsAT | ChangeTodolistTitleAT |ChangeTodolistFilterAT

let initialState: Array<TodoListType> = [];
export const todolistsReducer = (todoLists: Array<TodoListType> = initialState, action: ActionUnionType):Array<TodoListType>  => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl=> tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}
export const AddTodoListsAC = (title: string): AddTodoListsAT => {
    return {type: "ADD-TODOLIST", title: title, todoListID: v1()}
}

export const ChangeTodolistTitleAC = (todoListID: string, title: string): ChangeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, todoListID}
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListID: todoListID}
}