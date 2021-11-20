import React from 'react'
import { connect } from 'react-redux'

import {
  changeClientEditorForm,
  setClietnCheckbox,
  changeStatusAdCampaignClient,
  setAdCampaignClient,
  setVisibleFlag,
} from '../../../Redux/actions'
import AddPhones from './AddPhones'
import ChooseOfList from '../../general/ChooseOfList'
import ClientJuridicalInfo from './ClientJuridicalInfo'
import LableInput from '../../general/LableInput'

const ClientGenerallyInfo = (props) => {
  return (
    <div className="clientGenerally">
      <div className="orderFormTitle">Общая информация</div>
      <LableInput
        className="w250 mt15"
        title={props.client.juridical ? 'Название компании' : 'Имя клиета'}
        redStar={true}
        onChange={(event) =>
          props.changeClientEditorForm('name', event.target.value)
        }
        value={props.client.name}
        checkedFlag="inputClientNameChecked"
        checked={props.inputClientNameChecked}
      />
      <LableInput
        className="w250 mt15"
        title="Обращение"
        name="name_doc"
        onChange={(event) =>
          props.changeClientEditorForm(event.target.name, event.target.value)
        }
        value={props.client.name_doc}
      />
      <AddPhones />
      <LableInput
        className="w250 mt15"
        title="Email"
        name="email"
        onChange={(event) =>
          props.changeClientEditorForm(event.target.name, event.target.value)
        }
        value={props.client.email}
      />
      <div className="checkbox mt5">
        <input
          type="checkbox"
          name="should_send_email"
          onChange={(event) =>
            props.setClietnCheckbox(event.target.name, 'change')
          }
          checked={props.client.should_send_email}
        />
        <label>Согласен получать Email</label>
      </div>
      <LableInput
        className="w250 mt15"
        title="Адрес"
        name="address"
        onChange={(event) =>
          props.changeClientEditorForm(event.target.name, event.target.value)
        }
        value={props.client.address}
      />

      <ChooseOfList
        id={13}
        className="mt15 h52"
        title="Откуда клиент о нас узнал"
        list={props.ad_campaign}
        setElement={props.setAdCampaignClient}
        current_id={props.client.ad_campaign_id}
        width="250px"
      />

      {props.client.juridical ? <ClientJuridicalInfo /> : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  client: state.client,
  statusPhoneList: state.view.statusPhoneList,
  ad_campaign: state.data.ad_campaign,
  statusAdCampaignClient: state.view.statusAdCampaignClient,
  inputClientNameChecked: state.view.inputClientNameChecked,
})

const mapDispatchToProps = {
  changeClientEditorForm,
  setClietnCheckbox,
  changeStatusAdCampaignClient,
  setAdCampaignClient,
  setVisibleFlag,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientGenerallyInfo)
