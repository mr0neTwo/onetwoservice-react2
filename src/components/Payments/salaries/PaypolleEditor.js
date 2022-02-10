
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'


import { setVisibleFlag } from '../../../Redux/actions'
import { resetPayroll, changePayrollForm, createPayroll, deletePayroll } from '../../../Redux/actions/payrollActions'
import BottomButtons from '../../general/BottomButtons'

import PayrollForm from './PayrollForm';
import PayrollReceipt from './PayrollReceipt'



const PaypolleEditor = (props) => {

   const handleClose = () => {
      props.setVisibleFlag('statusPayrollEditor', false)
      props.setVisibleFlag('inputPayrollDescChecked', true )
      props.setVisibleFlag('inputPayrollEmployeeChecked', true )
      props.resetPayroll()
   }

   const clickHandel = (event) => {
      if (!event.path.map((el) => el.id).includes('payrollEditorWiondow')) {
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
      props.changePayrollForm(props.payroll.setted_employee, 'employee_id')
   }, [])

 

   const hangleCreate = () => {
      if (
         (props.payroll.income || props.payroll.outcome) &&
         props.payroll.employee_id  && 
         props.payroll.description
         ) {
         props.createPayroll()
      } else {
         if (!(props.payroll.income || props.payroll.outcome)) { props.setVisibleFlag('inputPayrollSumChecked', false)}
         if (!props.payroll.employee_id) {props.setVisibleFlag('inputPayrollEmployeeChecked', false) }
         if (!props.payroll.description) {props.setVisibleFlag('inputPayrollDescChecked', false) }
      }
   }

  const hangleSave = () => {
   if (
      (props.payrolle.income || props.payrolle.outcome) &&
      props.payroll.employee_id  && 
      props.payroll.description
      ) {
      // props.createPayment()
   } else {
      if (!(props.payrolle.income || props.payrolle.outcome)) { props.setVisibleFlag('inputPayrollSumChecked', false)}
      if (!props.payroll.employee_id) {props.setVisibleFlag('inputPayrollEmployeeChecked', false) }
      if (!props.payroll.description) {props.setVisibleFlag('inputPayrollDescChecked', false) }
   }
  }

  

  const title = ['', 'Взыскание', 'Премия']

  const type_payrolls = ['', 'Cоздания заказа', 'Закрытие заказа', 'Ведение заказа', 'Работа', 'Работа', 'Продажа', 'Оклад', '', 'Премия', 'Взыскания', 'Возврат']

  return (
      <div className="rightBlock">
         <div className="rightBlockWindow w500" id="payrollEditorWiondow">
         <div className="createNewTitle">
            {props.payroll.edit ? type_payrolls[props.payroll.relation_type] :(title[props.payroll.direction])}
         </div>

         <div className='contentEditor'>
           
           {props.payroll.edit ? <PayrollReceipt/> : <PayrollForm/>}

         </div>
       
        <BottomButtons
            edit={props.payroll.edit}
            create={ hangleCreate }
            // save={ hangleSave }
            delete={ props.permissions.includes('delete_payrolls') ? () => props.deletePayroll(true) : null }
            recover={ props.permissions.includes('recover_payrolls') ? () => props.deletePayroll(false) : null }
            close={ handleClose }
            deleted={props.payroll.deleted}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  view: state.view, 
  payroll: state.payroll,
  permissions: state.data.user.role.permissions,
  employees: state.data.employees.filter(employee => !employee.deleted)
})

const mapDispatchToProps = {
   changePayrollForm,
   setVisibleFlag,
   resetPayroll,
   createPayroll,
   deletePayroll
}

export default connect(mapStateToProps, mapDispatchToProps)(PaypolleEditor)