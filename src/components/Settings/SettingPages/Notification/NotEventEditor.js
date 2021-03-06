import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { changeNotEventForm, createNotEvent, deleteNotEvent} from '../../../../Redux/actions/notEventAction'
import { resetNotEvent, saveNotEvent, selectedNotEvent} from '../../../../Redux/actions/notEventAction'

import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseButton from '../../../general/ChooseBotton'
import ChooseStatuses from './ChooseStatuses'
import {eventsClients} from '../../../../data/events'


const NotEventEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusNotEventEditor', false)
        props.setVisibleFlag('inputNotEventEventChecked', true)
        props.setVisibleFlag('inputNotEventTemplateChecked', true)
        props.resetNotEvent()
    }

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('NotTempEditorWindow') &&
            !event.path.map((el) => el.id).includes('gb1') &&
            !event.path.map((el) => el.id).includes('gb2') &&
            !event.path.map((el) => el.id).includes('gb3')
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

    const handleCreate = () => {
        if (props.notEvent.event && props.notEvent.notification_template_id ) {
            props.createNotEvent()
        } else {
            if(!props.notEvent.event ) props.setVisibleFlag('inputNotEventEventChecked', false)
            if(!props.notEvent.notification_template_id) props.setVisibleFlag('inputNotEventTemplateChecked', false)
        }
    }

    const handleSave = () => {
        if (props.notEvent.event && props.notEvent.notification_template_id) {
            props.saveNotEvent()
        } else {
            if(!props.notEvent.event ) props.setVisibleFlag('inputNotEventEventChecked', false)
            if(!props.notEvent.notification_template_id) props.setVisibleFlag('inputNotEventTemplateChecked', false)
        }
    }

    const can_deleted = props.permissions.includes('setting_delete_not_event')
    const can_recover = props.permissions.includes('setting_recover_not_event')


    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="NotTempEditorWindow">
                <div className="createNewTitle w515">{props.notEvent.edit ? props.notEvent.title : '?????????? ????????????????????'}</div>

                <div className="contentEditor">
                    <div className='row al-itm-bl'>
                        <ChooseOfList
                            id='chooseNotEventType'
                            title='?????? ??????????????'
                            className='mt15'
                            list={eventsClients}
                            field='event'
                            setElement={props.changeNotEventForm}
                            current_id={props.notEvent.event}
                            width={'250px'}
                            checkedFlag='inputNotEventEventChecked'
                            checked={props.inputNotEventEventChecked}
                            noChoosed='???? ????????????'
                            disabled={props.notEvent.deleted}
                        />
                        <ChooseStatuses
                            className='mt15 ml15 h27'
                            func={value => props.selectedNotEvent(value, 'statuses')}
                            current_list={props.notEvent.statuses}
                            invisible={props.notEvent.event !== 'ORDER_STATUS_CHANGED_TO'}
                        />
                    </div>
                    <ChooseButton
                        className='mt15'
                        title='??????????????????'
                        name={['SMS', 'Email']}
                        func1 = {() => props.changeNotEventForm(1, 'notification_type')}
                        func2 = {() => props.changeNotEventForm(2, 'notification_type')}
                        checked = { true }
                        disabled={false}
                        invisible={false}
                    />
                    <ChooseOfList
                        id='idChooseNotTemplate'
                        title='????????????'
                        className='mt15'
                        list={props.templates}
                        field='notification_template_id'
                        setElement={props.changeNotEventForm}
                        current_id={props.notEvent.notification_template_id}
                        width={'250px'}
                        checkedFlag='inputNotEventTemplateChecked'
                        checked={props.inputNotEventTemplateChecked}
                        noChoosed='???? ????????????'
                        disabled={props.notEvent.deleted}
                    />

                </div>


                <BottomButtons
                    edit={props.notEvent.edit}
                    deleted={props.notEvent.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={can_deleted ? () => props.deleteNotEvent(true) : null}
                    recover={can_recover ? () => props.deleteNotEvent(false) : null}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    notEvent: state.notEvent,
    inputNotEventEventChecked: state.view.inputNotEventEventChecked,
    inputNotEventTemplateChecked: state.view.inputNotEventTemplateChecked,
    permissions: state.data.user.role.permissions,
    templates: state.notTemplate.templates
})

const mapDispatchToProps = {
    setVisibleFlag,
    resetNotEvent,
    createNotEvent,
    saveNotEvent,
    deleteNotEvent,
    changeNotEventForm,
    selectedNotEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(NotEventEditor)
