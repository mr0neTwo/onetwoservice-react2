
import React from 'react'
import { connect } from 'react-redux'

const ClientPayments = (props) => {
   return (
      <div className = 'tempPage'>
         <div className = 'tempContainer'>
            <h1 className = 'tempTitle'>Платежи</h1>
            <p className = 'tempDescription'>Страница на стадии разработки</p>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({

   })

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(ClientPayments)