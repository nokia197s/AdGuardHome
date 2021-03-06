import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions/install';
import toasts from './toasts';
import { INSTALL_FIRST_STEP } from '../helpers/constants';

const install = handleActions({
    [actions.getDefaultAddressesRequest]: state => ({ ...state, processingDefault: true }),
    [actions.getDefaultAddressesFailure]: state => ({ ...state, processingDefault: false }),
    [actions.getDefaultAddressesSuccess]: (state, { payload }) => {
        const values = payload;
        values.web.ip = state.web.ip;
        values.dns.ip = state.dns.ip;
        const newState = { ...state, ...values, processingDefault: false };
        return newState;
    },

    [actions.nextStep]: state => ({ ...state, step: state.step + 1 }),
    [actions.prevStep]: state => ({ ...state, step: state.step - 1 }),

    [actions.setAllSettingsRequest]: state => ({ ...state, processingSubmit: true }),
    [actions.setAllSettingsFailure]: state => ({ ...state, processingSubmit: false }),
    [actions.setAllSettingsSuccess]: state => ({ ...state, processingSubmit: false }),
}, {
    step: INSTALL_FIRST_STEP,
    processingDefault: true,
    processingSubmit: false,
    web: {
        ip: '0.0.0.0',
        port: 80,
        warning: '',
    },
    dns: {
        ip: '0.0.0.0',
        port: 53,
        warning: '',
    },
    interfaces: {},
});

export default combineReducers({
    install,
    toasts,
    form: formReducer,
});
