import React from 'react'
import {connect} from 'react-redux'

import {changeFilterState} from '../../Redux/actions/filterAction'
import {addClientToTempFilter} from '../../Redux/actions/clientAction'

const CustomFilter = props => {

    async function  handleChoose()  {
        if (props.filter.active_filter !== props.data.id) {
            if (props.data.filters.client_id) props.addClientToTempFilter(props.data.filters.client_id[0])
            props.changeFilterState({
                ...props.data.filters,
                active_filter: props.data.id,
                active_badge: 0,
                search: '',
                temp_statuses: props.data.filters.status_id || [],
                temp_order_types: props.data.filters.order_type_id || [],
                temp_managers: props.data.filters.manager_id || [],
                temp_engineers: props.data.filters.engineer_id || [],
                temp_created_at: props.data.filters.created_at || [0, 0],
                temp_kindof_good_id: props.data.filters.kindof_good,
                temp_brand: props.data.filters.brand,
                temp_subtype: props.data.filters.subtype,
                temp_client: {}
            })
        } else {
            props.changeFilterState({
                active_filter: 0,
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
            })
        }
    }

    return (
        <div
            className='customFilter'
            onClick={handleChoose}
            style={{
                backgroundColor: props.data.id === props.filter.active_filter ? '#eeeeef' : 'white',
                opacity: props.data.id === props.filter.active_filter || props.filter.active_filter === 0 ? 1 : 0.5
            }}
        >
            {props.data.title}
        </div>
    )
}

const mapStateToProps = state => ({
    filter: state.filter
})

const mapDispatchToProps = {
    changeFilterState,
    addClientToTempFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomFilter)