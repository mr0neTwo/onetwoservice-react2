const initialState = {

   edit: 0,
   ability1: 0,
   ability2: 0
}
 
export const templeReducer = (state = initialState, action) => {
   switch (action.type){
 
      case 'CHANGE_TEMPLE_FORM': {
         return {
            ...state, 
            [action.field]: action.value
         }
      }

      case 'CHANGE_TEMPLE_STATE': {
         return Object.assign(state, action.data)
      }


      case 'EDIT_TEMPLE': {
         return {
            ...state, 
            ability1: action.temple.ability1,
            ability2: action.temple.ability2,
         }
      }
 
      case 'RESET_TEMPLE': {
         return {
            ...state, 
            edit: 0,
            ability1: 0,
            ability2: 0
         }
      }

      case 'SELECTED_TEMPLE': {
         // Обявим переменную для изменных данных
         let new_data
         // Проверим если значения value в списке уже существующих
         if (action.value.every(val => state[action.field].includes(val))) {
            // Если есть удалим эти значения
            new_data = state[action.field].filter(val => !action.value.includes(val))
         } else {
            // Если нет добавим эти значения
            new_data = state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
         }
         // Если флаг saveToApp установлен сохраним данные на локальном хранилище
         if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
         // Вернем изменненый стейт
         return {
            ...state,
            [action.field]: new_data,
         }
      }
 
       
      default: return state
   }
    
}