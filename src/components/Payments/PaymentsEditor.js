import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {addItemPayments, refreshDataOrder, changeStatusMenuVisible, changeVisibleState} from '../../Redux/actions'
import { addPaymentTag, deletePaymentTag, changePaymentState} from '../../Redux/actions/paymentAction'
import {createPayment, resetPayments} from '../../Redux/actions/paymentAction'
import {changeStatus} from '../../Redux/actions/orderActions'
import {addClients} from '../../Redux/actions/clientAction'

import BottomButtons from '../general/BottomButtons'
import ChooseBotton from '../general/ChooseBotton'
import SetClientByName from './SetClientByName'
import ClientCard from '../Clients/ClientCard'
import Receipt from './Receipt'
import ChooseOfList from '../general/ChooseOfList'
import LableArea from '../general/LableArea'
import AddTags from '../general/AddTags'
import ChooseDate from '../general/calandar/ChooseDate'


const PaymentsEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            'inputPaymentSumChecked': true,
            'inputPaymentCashboxChecked': true,
            'inputPaymentDescChecked': true,
            'inputPaymentCashflowChecked': true,
            'inputPaymentEmployeeChecked': true,
            'statusPaymentsEditor': false,
        })
        props.resetPayments()
    }

    const clickHandel = (event) => {

        if (!event.path.map((el) => el.id).includes('paymentsEditorWiondow') &&
            !event.path.map((el) => el.id).includes('createNewOrder') &&
            !event.path.map((el) => el.id).includes('344')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name, props.client.filter_phone])


    const hangleCreate = () => {
        if (
            // Проверим внесена ли сумма
            (props.payment.income || props.payment.outcome) &&
            // Проверим выбрана ли касса при direction (приход или расход) или выбрана ли целевая касса при перемещение дененг в дргую касса
            ((props.payment.cashbox_id && props.payment.direction) || (props.payment.target_cashbox_id && !props.payment.direction)) &&
            // Преовеним введен ли коментарий
            props.payment.description &&
            // Проверим выбрана ли категория если это приход или расход
            (props.payment.cashflow_category || !props.payment.direction) &&
            // Проверим выбран ли сотрудник
            props.payment.employee_id
        ) {
            props.createPayment(props.payment.context)
        } else {
            if (!(props.payment.income || props.payment.outcome))
                props.changeVisibleState({'inputPaymentSumChecked': false})
            if (!(props.payment.cashbox_id && props.payment.direction || props.payment.target_cashbox_id && !props.payment.direction))
                props.changeVisibleState({'inputPaymentCashboxChecked': false})
            if (!props.payment.description)
                props.changeVisibleState({'inputPaymentDescChecked': false})
            if (!props.payment.cashflow_category)
                props.changeVisibleState({'inputPaymentCashflowChecked': false})
            if (!props.payment.employee_id)
                props.changeVisibleState({'inputPaymentEmployeeChecked': false})
        }
    }


    const [chooseData, setChooseData] = useState(false)

    const title = ['Перемещение денег', 'Расход денег', 'Приход денег']

    const cashboxes = props.cashboxes.filter(cashbox =>
        cashbox.type === props.payment.current_type &&
        (props.payment.direction || cashbox.id !== props.payment.cashbox_id)
        // (cashbox.isGlobal || cashbox.branch_id === props.current_branch_id)
    )

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow wmn500" id="paymentsEditorWiondow">
                <div className="createNewTitle">
                    {title[props.payment.direction]}
                </div>

                <div className='contentEditor'>

                    <div className='row al-itm-fe'>
                        <ChooseBotton
                            className='mt15 mr-rg-20'
                            title='Дата и время'
                            name={['Текущее', 'Заданное']}
                            func1={() => {
                                setChooseData(false)
                                props.changePaymentState({custom_created_at: null})
                            }}
                            func2={() => {
                                setChooseData(true)
                                props.changePaymentState({custom_created_at: parseInt(new Date() / 1000)})
                            }}
                            checked={true}
                            disabled={!props.permissions.includes('backdating')}
                        />
                        <ChooseDate
                            className='h31'
                            width='250px'
                            func={date => props.changePaymentState({custom_created_at: parseInt(date / 1000)})}
                            current_date={props.payment.custom_created_at * 1000}
                            invisible={!chooseData}
                        />
                    </div>

                    {props.payment.direction ? (props.payment.client_id ?
                        <ClientCard
                            edit={() => props.changeVisibleState({'statusCreateNewClient': true})}
                            close={() => props.changeVisibleState({client_id: 0})}
                        /> : <SetClientByName/>) : null}
                    <Receipt/>

                    <div className='row mt15 al-itm-fs'>
                        <ChooseBotton
                            className=''
                            title='Форма оплаты'
                            name={['Нал.', 'Безнал.']}
                            func1={() => {
                                props.changePaymentState({
                                    [props.payment.direction ? 'cashbox_id' : 'target_cashbox_id']: 0,
                                    current_type: 0
                                })
                            }}
                            func2={() => {
                                props.changePaymentState({
                                    [props.payment.direction ? 'cashbox_id' : 'target_cashbox_id']: 0,
                                    current_type: 1
                                })
                            }}
                            checked={!props.current_cashbox.type}
                        />
                        <ChooseOfList
                            id={20}
                            title='Касса'
                            className='ml10 h52'
                            list={cashboxes}
                            setElement={cashbox => props.changePaymentState({[props.payment.direction ? 'cashbox_id' : 'target_cashbox_id'] : cashbox})}
                            current_id={props.payment.direction ? props.payment.cashbox_id : props.payment.target_cashbox_id}
                            width={'250px'}
                            checkedFlag='inputPaymentCashboxChecked'
                            checked={props.view.inputPaymentCashboxChecked}
                            disabled={props.payment.deleted}
                        />
                    </div>
                    <LableArea
                        className='mt15'
                        title='Коментарий'
                        onChange={event => props.changePaymentState({description: event.target.value})}
                        value={props.payment.description}
                        checkedFlag='inputPaymentDescChecked'
                        checked={props.view.inputPaymentDescChecked}
                        redStar={true}
                        disabled={props.payment.deleted}
                    />
                    <ChooseOfList
                        id={41}
                        title='Статья'
                        className='mt15 h52'
                        list={props.item_payments.filter(item => item.direction === props.payment.direction)}
                        field='cashflow_category'
                        setElement={category => props.changePaymentState({cashflow_category: category})}
                        current_id={props.payment.cashflow_category}
                        width={'250px'}
                        checkedFlag='inputPaymentCashflowChecked'
                        checked={props.view.inputPaymentCashflowChecked}
                        disabled={props.payment.deleted}
                        invisible={!props.payment.direction}
                    />
                    <ChooseOfList
                        id={22}
                        title='Кассир'
                        className='mt15 h52'
                        list={props.employees.filter(employee => !employee.deleted)}
                        field='employee_id'
                        setElement={employee => props.changePaymentState({employee_id: employee})}
                        current_id={props.payment.employee_id}
                        width={'250px'}
                        employee={true}
                        checkedFlag='inputPaymentEmployeeChecked'
                        checked={props.view.inputPaymentEmployeeChecked}
                        disabled={!props.permissions.includes('choose_emploees')}
                    />
                    <AddTags
                        className='mt15'
                        tags={props.payment.tags}
                        addTag={props.addPaymentTag}
                        daleteTag={props.deletePaymentTag}
                    />

                </div>


                <BottomButtons
                    edit={props.payment.edit}
                    create={hangleCreate}
                    // save={hangleSave}
                    delete={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(true) : null}
                    recover={props.permissions.includes('edit_cash') ? () => props.deleteCashbox(false) : null}
                    close={handleClose}
                    deleted={props.payment.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    view: state.view,
    payment: state.payment,
    permissions: state.data.user.role.permissions,
    filter: state.filter,
    client: state.client,
    cashboxes: state.cashbox.cashboxes,
    current_branch_id: state.branch.current_branch.id,
    item_payments: state.data.item_payments,
    employees: state.employee.employees,
    user_id: state.data.user.id,
    current_cashbox: state.cashbox.current_cashbox,
    order_edit: state.order.edit
})

const mapDispatchToProps = {
    changePaymentState,
    changeVisibleState,
    addClients,
    addItemPayments,
    addPaymentTag,
    deletePaymentTag,
    createPayment,
    resetPayments,
    changeStatus,
    refreshDataOrder,
    changeStatusMenuVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsEditor)
