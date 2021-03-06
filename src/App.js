import { useReducer } from 'react';
import ReactJson from 'react-json-view';
import './App.css';

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_CHECK': {
        let checks = state.checks.map((check, i) =>
          action.id === check.id ? { ...check, selected: !check.selected } : check
        );
        let allChecked = checks.reduce((acc, check) => {
          if (!acc) return false;
          return check.selected;
        }, true);
        return {
          checks,
          allChecked,
        };
      }
      case 'SELECT_ALL': {
        let checks = state.checks.map((check) => ({ ...check, selected: !state.allChecked }));
        return {
          checks,
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
    <>
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
            <label htmlFor={check.id} key={check.id}>
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
      </div>
      <ReactJson src={state} theme='monokai' />
    </>
  );
}

export default App;
