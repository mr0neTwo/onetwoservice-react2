import React from 'react'
import {connect} from 'react-redux'

const Malfunction = props => {
    return (
        <td>
            <div className="tableText tableOne">
                {props.order.malfunction}
            </div>
        </td>
    )
}

const mapStateToProps = state => ({
    //   dataSidebarRows: 'dataSidebarRows',
})

export default connect(mapStateToProps)(Malfunction)