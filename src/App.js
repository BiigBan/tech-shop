import './App.css';
import { Provider} from 'react-redux';
import store from './store/store';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import DrawerComponent from './components/Drawer/Drawer';
import { useState } from 'react';

function App() {

  const [openedDrawer, setOpenedDrawer] = useState(false)




  return (
    <Provider store={store}>
      <Header setOpenedDrawer={setOpenedDrawer}/>
      <Main/>
      <DrawerComponent cartOpen={openedDrawer}
                closeCart={() => setOpenedDrawer(false)}/>
    </Provider>
  );
}

export default App;
