const initialState = {
    items: [] 
  };

  const updateObjectInArray = (array, action) => {
    return array.map((item, index) => {
      if (index !== action.payload) {
        return item;
      }
  
      return {
        ...item,
        inBasket: true
      };
    });
  };
  
 
  const removeItem = (array, action) => {
    return array.filter((item, index) => index !== action.payload);
  };
  
  
  export default (state = initialState, action) => {
  
   switch (action.type) {
    case 'NEW_NOTE':
        return [...state, action.data]
      case "SET_INIT_LIST":
        return { 
          ...state, 
          items: [
            action.data
          ]
        };
      case "ADD_TO_LIST":
        return {
          ...state,
          items: [
            ...state.items,
            {            
              value: action.payload,
              inBasket: false
            }
          ]
        };
      case "ADD_TO_BASKET":
        return {
          ...state,
          items: updateObjectInArray(state.items, action)
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          items: removeItem(state.items, action)
        };
      case "CLEAR_ITEMS": {
        return {
          items: []
        };
      }
      default:
        return state;
    }
  };


  export const initializeUsers = (items) => {
    return {
      type: 'SET_INIT_LIST',
      data: items
    }
  }