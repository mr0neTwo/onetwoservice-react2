import React from 'react'
import {connect} from 'react-redux'

const Brand = props => {
    return (
        <td>
            <span className="tableText">
                {props.order.brand.title}
            </span>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Brand)