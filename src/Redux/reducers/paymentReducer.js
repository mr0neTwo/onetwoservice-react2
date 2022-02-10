
const initialState = {
   edit: 0,
   sum: 0,
   title: '',

   cashflow_category: '',
   description: '',

   deposit: 0,
   income: 0,
   outcome: 0,
   direction: 0,

   can_print_fiscal: false,
   deleted: false,
   is_fiscal: false,

   created_at: 0,
   custom_created_at: 0,

   tags: [],

   relation_id: null,
   cashbox_id: 0,
   client_id: 0,
   employee_id: 0,
   order_id: 0,
   target_cashbox_id: 0,

   cashbox: {},
   client: {},
   employee: {},
   order: {},

   filter_created_at: [Math.round(Date.now()/1000 - Date.now()/1000 % 86400 - 10800), Math.round(Date.now() / 1000)],
   filter_tags: []
}

export const paymentReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_PAYMENT_FORM': {
         return {
            ...state, 
            [action.field]: action.value,
         }
      }

      case 'CHOOSE_PAYMENT_SELECTED': {
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

      case 'ADD_PAYMENT_TAG': {

         return {
            ...state, 
            tags: state.tags.concat([action.tag])
         }
      }
      
      case 'DELETE_PAYMENT_TAG': {

         let tags_list = state.tags
         tags_list.splice(action.idx, 1)

         return {
            ...state, 
            tags: tags_list
         }
      }

      
      case 'RESET_PAYMENTS': {

         return {
            ...state, 
            edit: 0,
            sum: 0,
            title: '',

            cashflow_category: '',
            description: '',

            deposit: 0,
            income: 0,
            outcome: 0,
            direction: 0,

            can_print_fiscal: true,
            deleted: false,
            is_fiscal: false,

            created_at: 0,
            custom_created_at: 0,

            tags: [],

            cashbox_id: 0,
            client_id: 0,
            employee_id: 0,
            order_id: 0,
            target_cashbox_id: 0,
         }
      }
      
      case 'SET_PAYMENT': {

         return {
            ...state, 
            edit: action.payment.id,

            cashflow_category: action.payment.cashflow_category,
            description: action.payment.description,

            deposit: action.payment.deposit,
            income: action.payment.income,
            outcome: action.payment.outcome,
            direction: action.payment.direction,

            can_print_fiscal: action.payment.can_print_fiscal,
            deleted: action.payment.deleted,
            is_fiscal: action.payment.is_fiscal,

            created_at: action.payment.created_at,
            custom_created_at: action.payment.custom_created_at,

            tags: action.payment.tags,

            cashbox: action.payment.cashbox,
            client: action.payment.client,
            employee: action.payment.employee,
            order: action.payment.order,
            target_cashbox_id: action.payment.target_cashbox_id,
         }
      }
      
      

      
      
      default: return state
   }
   
}