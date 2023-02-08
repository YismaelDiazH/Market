import { useContext, useEffect } from "react";
import AxiosClient from './authContext'
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Alert from "../../shared/plugins/alerts";
import * as yup from "yup";
import { Col, Container, Figure, Row } from 'react-bootstrap';

import { AuthContext } from "./authContext";
export const LoginScreen = () => {
  const navigation = useNavigate();
  const { user, dipatch } = useContext(AuthContext);
  const formik = useFormik({
    initialValue: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("ingresar usuario")
        .min(3, "Ingresar mínimo tres caracteres"),
      password: yup
        .string()
        .required("Ingresar su contraseña")
        .min(3, "Ingresa mínimo tres caracteres"),
    }),
    onSubmit: async (values) => {
      try {
        const URI = "/auth/login";
        const response = await AxiosClient({
          url: URI,
          method: "POST",
          data: JSON.stringify(values),
        });
        if (!response.error) {
          const action = {
            type: "LOGIN",
            payload: response.data,
          };
          dispatch(action);
          navigation("/products", { replace: true });
        }
      } catch (err) {
        Alert.fire({
          title: "Verificar datos ingresados",
          text: "Usuario y/o contraseña incorrectos",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });
  const handleReturn = () => {
    navigation("/");
  };
  useEffect(() => {
    document.title = "MT | Login";
  }, []);
  if (user.isLogged) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "eee" }}
      >
        <Container className="py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col>
              <div className="card rounded-3 text-black">
                <Row className="g-0">
                  <Col className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                        <div className='text-center'>
                            <Figure>
                                <Figure.Image />
                            </Figure>
                            <h4 className="mt-1 mb-5 pb-1">

                            </h4>
                        </div>
                        <Form onSubmit={ formik.handleSubmit}>
                            <Form.Group className="form-outline mb-4"> 
                            <Form.Label htmlFor="username">
                                Usuario o correo electrónico

                                </Form.Label> 
                                <Form.Control placeholder="mikemoreno"
                                id="username"
                                autoComplete="off"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}/>
                                
                            
                            </Form.Group>

                        </Form>

                    </div>

                  </Col>

                  <Col className="col-lg-6 d-flex align-items-center gradient-custom-2">

                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
