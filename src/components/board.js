import React from 'react';
import {connect} from 'react-redux';

import List from './list';
import AddForm from './add-form';

import {addList} from '../actions';

import './board.css';

export class Board extends React.Component {
    addList(title) {
        this.props.dispatch(addList(title, this.props.match.params.boardId));
    }

    render() {
        const lists = this.props.lists.map((list, index) => (
            <li className="list-wrapper" key={index}>
                <List
                    index={index}
                    boardId={this.props.match.params.boardId}
                    {...list}
                />
            </li>
        ));

        return (
            <div className="board">
                <h2>{this.props.match.params.boardId}</h2>
                <ul className="lists">
                    {lists}
                    <li className="add-list-wrapper">
                        <AddForm
                            type="list"
                            onAdd={title => this.addList(title)}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

Board.defaultProps = {
    title: 'Board'
};

const mapStateToProps = (state, props) => {
    const board = Object.assign(
        {},
        {
            lists: []
        },
        state.boards[props.match.params.boardId]
    );
    return {
        lists: board.lists
    };
};

export default connect(mapStateToProps)(Board);
