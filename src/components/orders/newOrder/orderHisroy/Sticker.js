import React, {forwardRef} from 'react'

const optionsShowDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}

const Sticker = forwardRef((props, ref) => {

    const date = new Date(props.order.created_at * 1000)

    return (
        <div
            className = 'orderSticker'
            ref={ref}
        >
            <div className='row fs16'>
                <div>OneTwoService</div>
                <div className='ml30'>{props.order.id_label}</div>
            </div>
            <div className=' '>{ `${date.toLocaleString('ru', optionsShowDate).replace('г.,', '')}  Гaрантия до: _____` }</div>
            <div>{props.order.client.name}</div>
            <div>{props.order.malfunction}</div>
            <div>Работа/дата:______________</div>
            <div>Комментарий_____________</div>

        </div>
    )
})

export default Sticker