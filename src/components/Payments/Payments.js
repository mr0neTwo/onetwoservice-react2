import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeCashboxState} from '../../Redux/actions/cashboxAction'

import Tabs from '../general/Tabs'
import Cashboxes from './cashboxes/Cashboxes'
import Salaries from './salaries/Salaries'
import Loader from '../Loader/Loader'

const Payments = (props) => {

    return (
        <div className='pageContent'>

            <div className='Header'>
                <span className='headerTitle'>Финансы</span>
            </div>

            <Tabs
                list={['Платежи', 'Взаиморасчеты', 'Счета', 'Зарплаты']}
                func={idx => props.changeCashboxState({tabs: idx})}
                tab={props.tabs}
            />
            {props.tabs === 0 ? <Cashboxes/> : null}
            {props.tabs === 1 ? null : null}
            {props.tabs === 2 ? null : null}
            {props.tabs === 3 ? <Salaries/> : null}

            {props.statusOrderLoader ? <Loader className='orderLoader'/> : null}
        </div>

    )
}

const mapStateToProps = state => ({
    tabs: state.cashbox.tabs,
    statusOrderLoader: state.view.statusOrderLoader

})

const mapDispatchToProps = {
    changeCashboxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)

