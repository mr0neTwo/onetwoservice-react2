
import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'

const LableArea = (props) => {

   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}{props.redStar ? <span className='redStar'>*</span> : null}</div>
            <textarea 
               className='textInput'
               name={props.name}
               onChange={props.onChange}
               value={props.value}
               onBlur={props.checkedFlag ? event => props.setVisibleFlag(props.checkedFlag, !!event.target.value) : null}
               style={props.checkedFlag && !props.checked  ? {borderColor: 'red'} : null}
               disabled={props.disabled}
            />
         {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо заполнить'}</div> : null}
      </div>
   )
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
   setVisibleFlag
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(LableArea)

// className=''
// title=''
// onChange={}
// value={}
// disabled={}
// checkedFlag={}
// checked={}
// redStar={}
// errorMassage=''