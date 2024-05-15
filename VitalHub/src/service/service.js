import axios from "axios";

//declarar a porta
const portaApi = '4466';

//declarar ip da maquina:

//Pedro ip 172.16.39.81
//Julia ip 172.16.39.82

const ip = '192.168.56.1';

//definir a base de url de acesso da api
const apiUrlLocal = `http://${ip}:${portaApi}/api`;

 ////http://172.16.39.82:4466/api`;

//configuracao do axios
const api = axios.create({
    baseURL : apiUrlLocal
});

export default api