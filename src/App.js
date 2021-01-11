import { useReducer } from 'react';
import './App.css';

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_CHECK': {
        return {
          checks: state.checks.map((check, i) => {
            if (action.id === check.id) {
              check.selected = !check.selected;
            }
            return check;
          }),
          allChecked: state.checks.reduce((acc, check) => {
            if (!acc) return false;
            return check.selected;
          }, true),
        };
      }
      case 'SELECT_ALL': {
        return {
          checks: state.checks.map((check) => {
            check.selected = !state.allChecked;
            return check;
          }),
          allChecked: !state.allChecked,
        };
      }
      default: {
        return state;
      }
    }
  };

  const init = {
    checks: [
      { id: 1, selected: false },
      { id: 2, selected: false },
      { id: 3, selected: false },
    ],
    allChecked: false,
  };

  const [state, dispatch] = useReducer(reducer, init);
  return (
    <div className='App'>
      <label htmlFor='selectAll'>
        Select All:
        <input
          type='checkbox'
          checked={state.allChecked}
          onChange={(e) => {
            dispatch({ type: 'SELECT_ALL' });
          }}
        />
      </label>
      <h1>CHECKBOXES</h1>
      {state.checks.map((check) => {
        return (
          <label htmlFor={check.id}>
            {check.id}:
            <input
              type='checkbox'
              checked={check.selected}
              onChange={(e) => {
                dispatch({ type: 'SELECT_CHECK', id: check.id });
              }}
            />
          </label>
        );
      })}
      <pre>{JSON.stringify(state)}</pre>
    </div>
  );
}

export default App;
