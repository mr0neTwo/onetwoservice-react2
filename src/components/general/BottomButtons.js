import React from 'react'

import { icon_trush, icon_spinner } from '../../data/icons'

/**
* Кнопки сниза панели редактора
*
 * edit={props.edit} // Новый заказ или редактируем существующий
 *
 * deleted={props.deleted} // Удален ли заказ
 *
 * create={() => console.log('create')} // Функция создания нового
 *
 * save={() => console.log('save')} // Функция сохранения уже существующего
 *
 * delete={() => console.log('delete')} // Функция удаления
 *
 * recover={() => console.log('recover')} // Фунция восстановления
 *
 * close={() => console.log('close')} // Функция закрытия редактора
 *
 */
const BottomButtons = (props) => {
  const buttomCreate = props.create ? (
    <div className="blueButton mr-lf-0 " onClick={props.create}>
      Создать
    </div>
  ) : null

  const buttomSave = props.save ? (
    <div className="blueButton mr-lf-0" onClick={props.save}>
      Сохранить
    </div>
  ) : null

  const buttomClose = props.close ? (
    <div className="whiteBlueBotton" onClick={props.close}>
      Закрыть
    </div>
  ) : null

  const buttomDelete = props.delete ? (
    <div className="whiteButton simbolBotton" onClick={props.delete}>
      <svg className="icon-table-red-basket" viewBox="0 0 32 32">
        <path d={icon_trush} />
      </svg>
    </div>
  ) : null

  const buttomRecover = props.recover ? (
    <div 
      className={`${props.recover ? 'blueButton' : 'greyDisbledButton'} mr-lf-0`} 
      onClick={props.recover}
    >
      <svg className="icon-recover" viewBox="0 0 32 32">
        <path d={icon_spinner} />
      </svg>
      Восстановить
    </div>
  ) : null

  return (
    <div className="buttons_ mt15">
      <div className="buttons">
        {props.edit ? (props.deleted ? buttomRecover : buttomSave): buttomCreate}
        {buttomClose}
      </div>
      {props.edit && !props.deleted ? buttomDelete : null}
    </div>
  )
}

export default BottomButtons

// edit={props.edit}
// deleted={props.deleted}
// create={() => console.log('create')}
// save={() => console.log('save')}
// delete={() => console.log('delete')}
// recover={() => console.log('recover')}
// close={() => console.log('close')}
