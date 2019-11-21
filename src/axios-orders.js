import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-react-9a2de.firebaseio.com/'
});



export default instance;