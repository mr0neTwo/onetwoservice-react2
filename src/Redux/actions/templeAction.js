import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'


export function changeTempleForm( value, field ) {
    return {
        type: 'CHANGE_TEMPLE_FORM',
        field,
        value
    }
}

export function changeTempleState( data ) {
    return {
        type: 'CHANGE_FILTER_STATE',
        data
    }
}

export function editTemple(temple) {
    return {
        type: 'EDIT_TEMPLE',
        temple
    }
}

export function resetTemple() {
    return {
        type: 'RESET_TEMPLE'
    }
}


export function selectedTemple( value, field, saveToApp=false ) {
    return {
        type: 'SELECTED_TEMPLE',
        field,
        value,
        saveToApp
    }
}

export function addTemple() {

    const state = store.getState()

    const request_config = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return dispatch => {

        fetch(state.data.url_server + '/get_temple', request_config)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))

    }
}

export function createTemple() {

    const state = store.getState()

    const request_config1 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(error => bad_request(dispatch, error, 'Запрос на создание temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))

    }
}



export function saveTemple() {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(error => bad_request(dispatch, error, 'Запрос на изменение temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))

    }
}

export function deleteOperation(flag) {

    const state = store.getState()

    let request_config1 = getRequestConfig({
        id: state.temple.edit,
        deleted: flag
    })
    request_config1.method = 'PUT'

    const request_config2 = getRequestConfig({
        ability1: 0,
        ability2: 0
    })

    return async dispatch => {

        await fetch(state.data.url_server + '/temple', request_config1)
            .catch(error => bad_request(dispatch, error, 'Запрос на удаление/восстановление temple не выполнен'))

        await fetch(state.data.url_server + '/get_temple', request_config2)
            .then(response =>  response.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: 'CHANGE_TEMPLE_FORM',
                        field: 'temple',
                        value: data.data
                    })
                    dispatch({
                        type: 'SET_VISIBLE_FLAG',
                        field: 'statusTempleEditor',
                        value: false
                    })
                    dispatch({
                        type: 'RESET_TEMPLE'
                    })
                } else {
                    console.warn(data.message)
                }
            })
            .catch(error => bad_request(dispatch, error, 'Запрос temple не выполнен'))

    }
}