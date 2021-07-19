export const actionCreators = {
    newNote: data => ({ type: "NEW_NOTE", payload: data }),
  
    setInitList: data => ({ type: "SET_INIT_LIST", payload: data }),
    addToList: data => ({ type: "ADD_TO_LIST", payload: data }),
    addToBasket: data => ({ type: "ADD_TO_BASKET", payload: data }),
    removeItem: data => ({ type: "REMOVE_ITEM", payload: data }),
    clearItems: () => ({ type: "CLEAR_ITEMS" })
  };