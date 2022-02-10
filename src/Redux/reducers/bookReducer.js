
const initialState = {
   tabs: 0,

   equipment_type: {},
   equipment_brand: {},
   equipment_subtype: {},
   equipment_model: {},

   title: '',
   icon: '',
   url: '',
   parent_id: 0,
   branches: [],
   deleted: false,

   direction: 0,

   
   type: 0,
   edit: 0,
   choose_list: [],
   
   page_malfunction: 0,
   selected_malfunction: [],
   page_packagelist: 0,
   selected_packagelist: [],
   page_item_payments: 0,
   selected_item_payments: [],

   filter_type: '',
   filter_brand: '',
   filter_subtype: '',
   filter_model: '',

   page_type: 1,
   page_brand: 1,
   page_subtype: 1,
   page_model: 1
}

export const bookReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_BOOK_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }


      case 'CHOOSE_EQUIPMENT_BRANCHES': {
         if (action.id.every(id => state.branches.includes(id))) {
            return {
               ...state, 
               branches: state.branches.filter(id => !action.id.includes(id)),
            }
         } else {
            return {
               ...state, 
               branches: state.branches.concat(action.id.filter(id => !state.branches.includes(id))),
            }
         }
      }

      
      case 'EDIT_EQUIPMENT': {
         return {
            ...state, 
            title: action.equipment.title,
            icon: action.equipment.icon,
            url: action.equipment.url,
            parent_id: action.equipment.parent_id,
            branches: action.equipment.branches ? action.equipment.branches : [],
            edit: action.equipment.id,
            deleted: action.equipment.deleted
         }
      }

      case 'RESET_BOOK_EQUIPMENT': {
         return {
            ...state, 
            title: '',
            icon: '',
            url: '',
            parent_id: 0,
            branches: [],
            deleted: false,
            edit: 0,
            page_malfunction: 0,
            selected_malfunction: [],
            page_packagelist: 0,
            selected_packagelist: [],
            page_item_payments: 0,
            selected_item_payments: [],
         }
      }

      case 'CHOOSE_BOOK_SELECTED': {
         if (action.id.every(id => state[action.field].includes(id))) {
            return {
               ...state, 
               [action.field]: state[action.field].filter(id => !action.id.includes(id)),
            }
         } else {
            return {
               ...state, 
               [action.field]: state[action.field].concat(action.id.filter(id => !state[action.field].includes(id))),
            }
         }
      }

      
      
      default: return state
   }
   
}