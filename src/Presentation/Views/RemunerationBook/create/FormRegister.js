import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import useViewModel from './ViewModel';

export default function FormRegister() {
    const {
        profile,
        formik,
        getListTypeLRE
    } = useViewModel();

    const typeOptions = Object.values(getListTypeLRE).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <Form.Select 
                                id="type" 
                                name="type" 
                                label="TIPO" 
                                placeholder="SELECCIONAR TIPO DE LRE" 
                                options={typeOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.type}
                                error={formik.errors.type}
                            />
                            <Form.Input  
                                id="code"
                                name="code" 
                                label="CODIGO"
                                type="input" 
                                placeholder="INGRESAR CODIGO DE LA LRE" 
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                error={formik.errors.code}
                            />

                            <Form.Input  
                                id="description"
                                name="description" 
                                label="GLOSA"
                                type="input" 
                                placeholder="INGRESAR GLOSA DEL LRE" 
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.errors.description}
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