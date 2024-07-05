import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import useViewModel from './ViewModel';

export default function FormRegister() {
    const {
        profile,
        formik
    } = useViewModel();

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Descripción</label>
                            <Form.Input  
                                id="name"
                                name="name" 
                                type="input" 
                                placeholder="INGRESAR NOMBRE DEL TIPO DE CONCEPTO" 
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.errors.name}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button type="submit" style={{backgroundColor: profile.myColor, color: '#ffffff'}}>
                        {formik.initialValues.name ? 'ACTUALIZAR' : 'REGISTRAR'}
                    </Button>
                </div>
            </Form>
        </div>
  )
}