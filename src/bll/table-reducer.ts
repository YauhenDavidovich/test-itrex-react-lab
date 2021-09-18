import { Dispatch } from 'redux'
import getTableData, {TableDataType} from "../dll/getTableData";

const initialState: Array<TableDataType> = []

export const tableReducer = (state: Array<TableDataType> = initialState, action: ActionsType): Array<TableDataType> =>  {
    switch (action.type) {
        case 'SET-TABLE':
            return action.todolists.map(rows => ({...rows}))
    }
}

export const setTableDataAC = (todolists: Array<TableDataType>) => ({type: 'SET-TABLE', todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        getTableData()
            .then((res) => {
                dispatch(setTableDataAC(res.data))
            })
    }
}

// types
export type SetTableDataActionType = ReturnType<typeof setTableDataAC>;
type ActionsType = SetTableDataActionType

type ThunkDispatch = Dispatch<ActionsType>
