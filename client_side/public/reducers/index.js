import {combineReducers} from 'redux';

import nodes from './nodes_reducer';
import lines from './lines_reducer';
import checkedElements from './checked_elements';

export default combineReducers({
        nodes,
        lines,
        checkedElements
});
