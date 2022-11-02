import {createStore} from './createStore';

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count + 1}
    }
    return state
}

describe('createStore:', () => {
    let store = createStore(reducer);
    beforeEach(()=>{
        store = createStore(reducer, initialState);
    })
    
    test('return store', () => { 
        expect(store).toBeDefined();
        expect(store.dispatch).toBeDefined();
        expect(store.subscribe).toBeDefined();
        expect(store.getState).toBeDefined();
    })
    
    test('return object state', () => {
        expect(store.getState()).toBeInstanceOf(Object);
    })
    
    test('return default state', () => {
        expect(store.getState()).toEqual(initialState)
    })
    
    test('change state', () => {
        store.dispatch({type:'ADD'});
        expect(store.getState().count).toBe(1)
    })
});