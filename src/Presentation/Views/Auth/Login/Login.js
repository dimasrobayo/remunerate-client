import React, { useEffect } from 'react';
import './Login.scss';
import useViewModel from './ViewModel';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/png/remunerate.png';
import { Container, Image, Form, Button } from 'semantic-ui-react';

export default function Login() {
    const navigate = useNavigate();
    const { Login, profile, errorMessage } = useViewModel();

    useEffect(() => {
        if (profile && profile.id) {
            navigate('/home');
        } else {
            navigate('/');
        }
    }, [profile, navigate]);

    return (
        <Container fluid className="auth">
            <Image src={logo} />

            <div className="container-form">
                <div className='container-login'>
                    <h2 className="login-form-title">
                        El mejor software de remuneraciones
                    </h2>
                    
                    <Form className="login-form" onSubmit={Login.handleSubmit}>
                        <Form.Input 
                            id="email"
                            type="text"
                            placeholder="Correo electronico"
                            name="email"
                            value={Login.values.email}
                            onChange={Login.handleChange}
                            error={Login.errors.email && true}
                            autoComplete="current-password"
                        />

                        <Form.Input 
                            type="password"
                            placeholder="Contraseña"
                            id="password"
                            name="password"
                            value={Login.values.password}
                            onChange={Login.handleChange}
                            error={Login.errors.password && true}
                            autoComplete="current-password"
                        />

                        <Button type="submit" className="ui primary btn-submit">Iniciar sessión</Button>

                        <div className="login-form-recover">
                            <span>¿Has olvidado tu contraseña?</span>
                        </div>

                        {errorMessage&&<p className="submit-error">{errorMessage}</p>}
                    </Form>
                </div>
            </div>

            <div className="change-form">
                <p>
                    <>
                        No tienes cuenta?{' '}
                        <Link to="/register">Registrate aquí</Link>.
                    </>

                </p>
            </div>
        </Container>
    )
}
