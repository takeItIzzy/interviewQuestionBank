import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

import NodeListItem from "./NoteListItem";

@withRouter
@inject("store")
@observer
class NoteList extends Component {
	state = {
		list: JSON.parse(JSON.stringify(this.props.store.current_note_list))
	};
    render() { 
        return (
            <div className="noteList">
                {this.state.list.map((item) => {
                    return (
                        <NodeListItem itemName={item.name} key={item.id} />
                    )
                })}
            </div>
        );
    }
}
 
export default NoteList;