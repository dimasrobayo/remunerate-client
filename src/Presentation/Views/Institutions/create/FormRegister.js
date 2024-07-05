import React from 'react';
import { Form, Button, Grid, GridColumn, Segment, Label } from 'semantic-ui-react';
import useViewModel from './ViewModel';
import './createStyles.scss';

export default function FormRegister() {
    const {
        profile,
        formik,
        institutionOptions,
        handleInstitutionChange
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
                                        Información de la Institución
                                    </Label>

                                    <div className="form-group">
                                        <label>RUT</label>
                                        <Form.Input  
                                            id="rut_institution"
                                            name="rut_institution" 
                                            type="input" 
                                            placeholder="INGRESAR RUT DE LA INSTITUCIÓN" 
                                            value={formik.values.rut_institution}
                                            onChange={formik.handleChange}
                                            error={formik.errors.rut_institution}
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

                                    <div className="form-group">
                                        <label>VALOR</label>
                                        <Form.Input  
                                            id="value"
                                            name="value" 
                                            type="input" 
                                            placeholder="INGRESAR VALOR DE LA INSTITUCIÓN" 
                                            value={formik.values.value}
                                            onChange={formik.handleChange}
                                            error={formik.errors.value}
                                        />
                                    </div>
                                </Segment>
                            </GridColumn>

                            <GridColumn>
                            <Segment>
                                <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                    Dato adicional y equivalencia PREVIRED
                                </Label>

                                <div className="form-group">
                                    <label>INSTITUCIÓN</label>
                                    <Form.Select
                                        id="sys_details_institutions_id"
                                        name="sys_details_institutions_id"
                                        placeholder='Seleccione una institución'
                                        options={institutionOptions}
                                        onChange={handleInstitutionChange}
                                        value={formik.values.sys_details_institutions_id}
                                        error={formik.errors.sys_details_institutions_id}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>DATO ADICIONAL</label>
                                    <Form.Input  
                                        id="aditional_data"
                                        name="aditional_data" 
                                        type="input" 
                                        placeholder="INGRESAR DATO ADICIONAL DE LA INSTITUCIÓN" 
                                        value={formik.values.aditional_data}
                                        onChange={formik.handleChange}
                                        error={formik.errors.aditional_data}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>EQUIVALENCIA PREVIRED</label>
                                    <Form.Input  
                                        id="equivalencia_previred"
                                        name="equivalencia_previred" 
                                        type="input" 
                                        placeholder="INGRESAR EQUIVALENCIA PREVIRED DE LA INSTITUCIÓN"
                                        value={formik.values.equivalencia_previred}
                                        onChange={formik.handleChange}
                                        error={formik.errors.equivalencia_previred}
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