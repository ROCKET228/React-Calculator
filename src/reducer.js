import {evaluate} from "./evaluate";

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
};

export function reducer(state, { type, payload }) {
    const hasData = state.currentOperand !== null;

    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.override) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    override: false,
                };
            }
            else if (payload.digit === '0' && state.currentOperand === '0') return state;
            else if(state.currentOperand != null) {
                if (payload.digit === '.' && (state.currentOperand === null || state.currentOperand.includes('.')))
                    return state;
            }

            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`,
            };

        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand === null && state.previousOperand === null) return state;
            else if (state.currentOperand === null) {
                return {
                    ...state,
                    operation: payload.operation,
                };
            } else if (state.previousOperand === null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            };

        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.EVALUATE:
            if (!hasData || state.operation == null || state.previousOperand == null) {
                return state;
            }
            return {
                ...state,
                override: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            };

        case ACTIONS.DELETE_DIGIT:
            if (state.override) {
                return {
                    ...state,
                    override: false,
                    currentOperand: null,
                };
            } else if (!hasData) {
                return state;
            } else if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null,
                };
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };

        default:
            console.log('Some Error');
    }
}
