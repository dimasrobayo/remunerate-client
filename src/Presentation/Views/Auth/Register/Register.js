import React from 'react';
import './Register.scss';
import useViewModel from './ViewModel';
import logo from '../../../../assets/png/remunerate.png';
import { Form, Button, Checkbox, Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Register() {
    const { formik, typeOptions, genderOptions } = useViewModel();

    return (
        <Container fluid className="auth">
            <Image src={logo} />

            <div className="container-form">
                <div className='container-login'>
                    <h2 className="register-form-title">
                        El mejor software de remuneraciones
                    </h2>

                    <Form onSubmit={formik.handleSubmit}>
                        <div className='container-register'>
                            <Form.Field className='option-rol'>
                                <Checkbox
                                    radio
                                    label='ADMINISTRADOR'
                                    name='docente'
                                    value='1'
                                    checked={formik.values.rol === '1'}
                                    onChange={() => formik.setFieldValue('rol', '1')}
                                />
                            </Form.Field>

                            <Form.Field className='option-rol'>
                                <Checkbox
                                    radio
                                    label='COLABORADOR'
                                    name='apoderado'
                                    value='2'
                                    checked={formik.values.rol === '2'}
                                    onChange={() => formik.setFieldValue('rol', '2')}
                                />
                            </Form.Field>
                        </div>

                        <Form.Select 
                            id="type_document"
                            name="type_document"
                            value={formik.values.type_document}
                            placeholder='Tipo de Documento' 
                            onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
                            options={typeOptions} 
                            error={formik.errors.type_document}
                        />

                        <Form.Input 
                            id="document_number"
                            name="document_number" 
                            type="text" 
                            placeholder="Numero de Documento" 
                            value={formik.values.document_number}
                            onChange={formik.handleChange}
                            error={formik.errors.document_number}
                        />

                        <Form.Input 
                            id="name"
                            name="name" 
                            type="text" 
                            placeholder="Nombre" 
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.errors.name}
                        />

                        <Form.Input 
                            id="lastname"
                            name="lastname" 
                            type="text" 
                            placeholder="Apellido Paterno" 
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.errors.lastname}
                        />
                        
                        <Form.Input 
                            id="mother_lastname"
                            name="mother_lastname" 
                            type="text" 
                            placeholder="Apellido Materno" 
                            value={formik.values.mother_lastname}
                            onChange={formik.handleChange}
                            error={formik.errors.mother_lastname}
                        />
                        
                        <Form.Select 
                            id="gender"
                            name="gender"
                            placeholder='Género' 
                            value={formik.values.gender}
                            onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
                            options={genderOptions} 
                            error={formik.errors.gender}
                        />

                        <Form.Input 
                            id="email"
                            name="email" 
                            type="text" 
                            placeholder="Correo electronico" 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email}
                        />

                        <Form.Input 
                            id="phone"
                            name="phone" 
                            type="text" 
                            placeholder="Numero Telefónico" 
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.errors.phone}
                            autoComplete="phone"
                        />

                        <Form.Input 
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="Contraseña" 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password}
                            autoComplete="current-password"
                        />
                        <Form.Input 
                            id="repeatPassword"
                            name="repeatPassword" 
                            type="password" 
                            placeholder="Repetir contraseña" 
                            value={formik.values.repeatPassword}
                            onChange={formik.handleChange}
                            error={formik.errors.repeatPassword}
                            autoComplete="current-password"
                        />
            
                        <Button type="submit" className="ui primary btn-submit">Registrarse</Button>
                    </Form>
                </div>
            </div>

            <div className="change-form">
                <p>
                    Ya estoy registrado,{' '}
                    <Link to="/">Iniciar sesión aquí</Link>.
                </p>
            </div>
        </Container>
    )
}