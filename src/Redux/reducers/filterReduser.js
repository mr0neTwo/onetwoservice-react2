const initialState = {

    clientFilter: {
        page: 0,
        name: '',
        phone: '7'
    },

    search_word: '',


    // ========================
    badges: [],
    customFilters: [],

    title: '',
    general: false,

    sort: JSON.parse(localStorage.getItem('sort')) || 'desc',
    field_sort:  JSON.parse(localStorage.getItem('field_sort')) || 'id',
    page: JSON.parse(localStorage.getItem('page')) || 0,

    engineer_id: JSON.parse(localStorage.getItem('engineer_id')) || null,
    overdue: JSON.parse(localStorage.getItem('overdue')) || null,
    status_id: JSON.parse(localStorage.getItem('status_id')) || null,
    status_overdue: JSON.parse(localStorage.getItem('status_overdue')) || null,
    urgent: JSON.parse(localStorage.getItem('urgent')) || null,
    order_type_id: JSON.parse(localStorage.getItem('order_type_id')) || null,
    manager_id: JSON.parse(localStorage.getItem('manager_id')) || null,
    created_at: JSON.parse(localStorage.getItem('created_at')) || null,
    kindof_good: JSON.parse(localStorage.getItem('kindof_good')) || null,
    brand: JSON.parse(localStorage.getItem('brand')) || null,
    subtype: JSON.parse(localStorage.getItem('subtype')) || null,
    client_id: JSON.parse(localStorage.getItem('client_id')) || null,

    search: '',

    temp_statuses: [],
    temp_order_types: [],
    temp_managers: [],
    temp_engineers: [],
    temp_created_at: [0, 0],
    temp_kindof_good_id: null,
    temp_brand: null,
    temp_subtype: null,
    temp_client: {},

    active_badge: JSON.parse(localStorage.getItem('active_badge')) || 0,
    active_filter: JSON.parse(localStorage.getItem('active_filter')) || 0
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_FILTER_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'CHANGE_FILTER_STATE': {
            const local_save = ['sort', 'field_sort', 'page', 'engineer_id', 'overdue', 'status_id', 'status_overdue',
                'urgent', 'order_type_id', 'manager_id', 'created_at', 'kindof_good', 'brand', 'subtype', 'client_id',
                'active_badge', 'active_filter']
            Object.keys(action.data).forEach(field => {
                if (local_save.includes(field)) localStorage.setItem(field, JSON.stringify(action.data[field]))
            })
            return {...Object.assign(state, action.data)}
        }

        case 'SELECTED_FILTER': {
            // ???????????? ???????????????????? ?????? ???????????????? ????????????
            let new_data
            // ???????????????? ???????? ???????????????? value ?? ???????????? ?????? ????????????????????????
            if (action.value.every(val => state[action.field].includes(val))) {
                // ???????? ???????? ???????????? ?????? ????????????????
                new_data = state[action.field].filter(val => !action.value.includes(val))
            } else {
                // ???????? ?????? ?????????????? ?????? ????????????????
                new_data = state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
            }
            // ???????? ???????? saveToApp ???????????????????? ???????????????? ???????????? ???? ?????????????????? ??????????????????
            if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
            // ???????????? ???????????????????? ??????????
            return {
                ...state,
                [action.field]: new_data,
            }
        }

        case 'RESET_FILTER':
            return {
                ...state,
                page: 0,

                engineer_id: null,
                overdue: null,
                status_id: null,
                status_overdue: null,
                urgent: null,

                order_type_id: null,
                manager_id: null,
                created_at: null,
                kindof_good: null,
                brand: null,
                subtype: null,
                client_id: null,

                active_badge: 0,
                active_filter: 0
            }

        case 'RESET_TEMP_FILTER':
            return {
                ...state,
                temp_statuses: [],
                temp_order_types: [],
                temp_managers: [],
                temp_engineers: [],
                temp_created_at: [0, 0],
                temp_kindof_good_id: null,
                temp_brand: null,
                temp_subtype: null,
                temp_client: {},
            }

        case 'RESET_DATA_FILTER':
            return {
                ...state,
                title: '',
                general: false,
            }

        // ========================
        // case 'ADD_STATUS': {
        //     return {
        //         ...state,
        //         status: action.status.map(status => status.id),
        //     }
        // }
        //
        // case 'ADD_DATA': {
        //     if (action.field === 'order_type') {
        //         return {
        //             ...state,
        //             order_type_id: action.data.map(type => type.id)
        //         }
        //     } else {
        //         return state
        //     }
        // }
        //
        // case 'ADD_EMPLOYEES': {
        //     return {
        //         ...state,
        //         employees: action.employees.map(employee => employee.id),
        //     }
        // }







        case 'CHANGE_NAME_CLIENTFILTER': {
            return {
                ...state,
                clientFilter: {
                    ...state.clientFilter,
                    name: action.word,
                    phone: ''
                }
            }
        }


        case 'CHANGE_PHONE_CLIENTFILTER': {
            return {
                ...state,
                clientFilter: {
                    ...state.clientFilter,
                    phone: action.word.replace(/[^0-9]/g, ''),
                    name: ''
                }
            }
        }





        default:
            return state
    }

}
