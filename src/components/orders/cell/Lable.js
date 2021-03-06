import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const Lable = props => {
   return (
      <td className="orderLabel tableRow">
          <Link
              className='orderLink'
              to={{
                  pathname: `/orders/${props.order.id}`,
                  state: { order_id: props.order.id }
              }}
          >
              <span
                  className={props.order.urgent && props.order.status.group < 4 ? 'fire-text': null}
              >
                  { props.order.id_label }
              </span>
          </Link>
      </td>
   )
}


const mapDispatchToProps ={
}
  
 export default connect(null, mapDispatchToProps)(Lable)