import axios from "axios";

//declarar a porta
const portaApi = '4466';

//declarar ip da maquina:

//meu ip 172.16.39.81
//Julia`s ip 172.16.39.82

const ip = '172.16.39.81';

//definir a base de url de acesso da api
const apiUrlLocal = `//http://${ip}:${portaApi}/api`;

//configuracao do axios
const api = axios.create({
    baseURL : apiUrlLocal
});

export default api