export const actionCreators = {
    newItem: data => ({ type: "NEW_ITEM", payload: data }),
    addNewItem: data => ({ type: "ADD_NEW_ITEM", payload: data }),
    deleteItem : item => ({
      type:"DELETE_ITEM",
      paylod: item
    }),

    setInitList: data => ({ type: "SET_INIT_LIST", payload: data }),
    addToList: data => ({ type: "ADD_TO_LIST", payload: data }),
    removeItem: data => ({ type: "REMOVE_ITEM", payload: data }),
    clearItems: () => ({ type: "CLEAR_ITEMS" })
  };


  
