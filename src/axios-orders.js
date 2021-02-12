import axios from "axios";

//create a new instance of axios with a custom config/ custom axios-:
const instance = axios.create({
  baseURL: "https://react-my-burger-3132.firebaseio.com/",
});

export default instance;
