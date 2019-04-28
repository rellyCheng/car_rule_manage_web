import { } from '@/services/api';
import { message } from 'antd';
export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {
    
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    
  },

};
