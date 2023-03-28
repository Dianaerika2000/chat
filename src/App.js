import './assets/scss/stylesheet.scss';
import Boot from './redux/boot';
// eslint-disable-next-line no-unused-vars
import axiosInterceptor from './utility/axios-token-interceptor';
import ChatGPT from './components/ChatGPT/ChatGPT';

/**
 * Main App component
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  return (
    <div className='my-5'>
      <h1 className='text-center fw-light'>ChatGPT</h1>
      <ChatGPT/>
    </div>

  );
};
Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
