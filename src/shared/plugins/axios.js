import * as instance from 'axios';

const AxiosClient = instance.create({
    baseURL:'http://localhost:8080/api-firstapp'
});

const requestHandler = (request) => {// ¡metodo pedicion
    request.headers['Accept'] = "application/json";
    request.headers['Content-Type'] = 'application/json';
    const session = JSON.parse(
        localStorage.getItem('user'))|| null;

    if (session?.isLogged) //si hay sesion mete la autorizacion de la peticion
        request.headers['Authorization'] = `Bearer ${session.token}`;
        return request;
    
}

const errorResponseHandler = (error) =>{
    return Promise.reject(error);
};


//simplificado
const successResponseHandler = (response) =>Promise.resolve(response.data);

//para cada peticion
AxiosClient.interceptors.request.use(
    requestHandler,
    (error) => Promise.reject(error)
);

//para cada respuesta
AxiosClient.interceptors.response.use(
    successResponseHandler,
    (error) => errorResponseHandler(error)
);

export default AxiosClient;