import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL || "https://traitn-workplace.hopto.org:5005";

export default axios.create();
