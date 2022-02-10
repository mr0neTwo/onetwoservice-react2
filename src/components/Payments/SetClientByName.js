
import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux'

import { changeNameClientFilter, setVisibleFlag, changePaymentForm, editCurrentClient } from '../../Redux/actions'
import { showPhone } from '../general/utils'
import ClientEditor from '../Clients/ClientEditor/ClientEditor'

const SetClientByName = (props) => {

   const [showList, setShowList] = useState(false)

   const clickHandel = (event) => {
      if (
         !event.path.map(el => el.id).includes('listClientsOfOfPayments') &&
         !event.path.map(el => el.id).includes('clientInputBoxOfPayments')
         ) {
            setShowList(false)
      }
    }

   
    useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
        window.removeEventListener('click', clickHandel)
      }
    })

   return (
      <div className='w400 h52'>
         
         <div className='lableImput mt15'>Имя клиента</div>

         <div className='blockImput'>
            <div 
               id='clientInputBoxOfPayments'
               className='orderInputBox'
               onClick={() => setShowList(true)}
            >
               <input
                  className='optionFilterInput'
                  onChange={event => props.changeNameClientFilter(event.target.value)}
               />
               <div 
               className='simbolButton'
               onClick={() => props.setVisibleFlag('statusCreateNewClient', true)}
               >
                  +
               </div>
               <div className='simbolButton'>&#6662;</div> 
            </div>

            {showList ? 
            <div className='listFilter' id='listClientsOfOfPayments'>
            {props.clientShow.map(client => (
               <div 
                  className='rowGropList' 
                  key={client.id}
                  onClick={() => {
                     setShowList(false)
                     props.editCurrentClient(client)
                     props.changePaymentForm(client.id, 'client_id')
                  }}
               >
                  <div>{client.name}</div>
                  <div className='orderDate'>
                     {client.phone[0] ? showPhone(client.phone[0].number) : null}
                  </div>
               </div>
            ))}
            </div> : null}

         </div>
         


      
      {props.view.statusCreateNewClient ? <ClientEditor/> : null }           
      </div>
   )
}

const mapStateToProps = state => ({
   clientShow: state.data.clientShow,
   phone: state.filter.clientFilter.phone,
   view: state.view,
   client: state.order.client
   })

const mapDispatchToProps = {
   changeNameClientFilter,
   setVisibleFlag,
   changePaymentForm,
   editCurrentClient
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(SetClientByName)