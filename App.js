import Navigator from './src/navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store/index.js';

export default function App() {
  return (
      <Provider store={store}>
        <Navigator />
      </Provider>
  );
}

