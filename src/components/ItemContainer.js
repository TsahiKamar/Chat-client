import React,{Component} from "react";
import { connect } from "react-redux";
import List from "./List";

//Display Users List - redux
class ItemContainer extends Component {
    render() {
        const listItems = this.props.items.map((item,index) => (    
        <List item={item} key={index} />
         ));

return (
 {listItems}   
);

}
}


const mapStateToProps = state => {
return { items : state.items[0] }; 
};

export default connect(mapStateToProps)(ItemContainer);