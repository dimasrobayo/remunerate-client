import React from 'react';
import { Form, Button, Grid, GridColumn, Segment, Label } from 'semantic-ui-react';
import useViewModel from './ViewModel';
import './createStyles.scss';

export default function FormRegister() {
    const {
        formik,
        profile,
        listsOptions,
        handleListChange
    } = useViewModel(); 

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <Grid columns={2}>
                            <GridColumn>
                                <Segment raised>
                                    <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                        Información de la Lista
                                    </Label>

                                    <div className="form-group">
                                        <label>LISTAS</label>
                                        <Form.Select
                                            id="sys_lists_id"
                                            name="sys_lists_id"
                                            placeholder="Seleccione una LISTA"
                                            options={listsOptions}
                                            onChange={handleListChange}
                                            value={formik.values.sys_lists_id}
                                            error={formik.errors.sys_lists_id ? { content: formik.errors.sys_lists_id, pointing: 'above' } : null}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>ITEM</label>
                                        <Form.Input  
                                            id="item"
                                            name="item" 
                                            type="input" 
                                            placeholder="INGRESAR ITEM DE LA LISTA" 
                                            value={formik.values.item}
                                            onChange={formik.handleChange}
                                            error={formik.errors.item}
                                        />
                                    </div>

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
                                </Segment>
                            </GridColumn>

                            <GridColumn>
                                <Segment raised>
                                    <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                        Valores de la Lista
                                    </Label>

                                    <div className="form-group">
                                        <label>VALOR A</label>
                                        <Form.Input  
                                            id="value_a"
                                            name="value_a" 
                                            type="number" 
                                            step="0.01"
                                            placeholder="INGRESAR VALOR A DE LA LISTA" 
                                            value={formik.values.value_a}
                                            onChange={e => formik.setFieldValue('value_a', parseFloat(e.target.value))}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.value_a && formik.errors.value_a ? {
                                                content: formik.errors.value_a,
                                                pointing: 'above',
                                            } : null}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>VALOR B</label>
                                        <Form.Input  
                                            id="value_b"
                                            name="value_b" 
                                            type="number"
                                            step="0.01"
                                            placeholder="INGRESAR VALOR B DE LA LISTA" 
                                            value={formik.values.value_b}
                                            onChange={e => formik.setFieldValue('value_b', e.target.value)}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.value_b && formik.errors.value_b ? {
                                                content: formik.errors.value_b,
                                                pointing: 'above',
                                            } : null}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>VALOR C</label>
                                        <Form.Input  
                                            id="value_c"
                                            name="value_c" 
                                            type="number"
                                            step="0.01"
                                            placeholder="INGRESAR VALOR C DE LA LISTA" 
                                            value={formik.values.value_c}
                                            onChange={e => formik.setFieldValue('value_c', e.target.value)}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.value_c && formik.errors.value_c ? {
                                                content: formik.errors.value_c,
                                                pointing: 'above',
                                            } : null}
                                        />
                                    </div>
                                </Segment>
                            </GridColumn>
                        </Grid>
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