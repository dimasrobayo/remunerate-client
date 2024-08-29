// TabDefinitionInfo.js
import React from 'react';
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabEndContractInfo({ formik }) {
    const {
        profile,
        getCausalFiniquito
    } = useViewModel();

    const causalFiniquitoOptions = Object.values(getCausalFiniquito).map((option, index) => ({ key: option.value || index, ...option }));
    
    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                TERMINO DE CONTRATO
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="fecha_termino"
                                    name="fecha_termino" 
                                    label="FECHA DE TERMINO"
                                    type="date" 
                                    placeholder="INGRESAR FECHA DE TERMINO" 
                                    value={formik.values.fecha_termino ? new Date(formik.values.fecha_termino).toISOString().split('T')[0] : ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.fecha_termino}
                                />

                                <Form.Select 
                                    id="causal_termino" 
                                    name="causal_termino" 
                                    label="CAUSAL FINIQUITO" 
                                    placeholder="SELECCIONAR CAUSAL" 
                                    options={causalFiniquitoOptions} 
                                    onChange={(e, { value }) => formik.setFieldValue('causal_termino', value)}
                                    value={formik.values.causal_termino}
                                    error={formik.errors.causal_termino}
                                />

                                <Form.Input  
                                    id="fecha_primera_renovacion"
                                    name="fecha_primera_renovacion" 
                                    label="FECHA PRIMERA RENOVACION"
                                    type="date" 
                                    placeholder="INGRESAR FECHA" 
                                    value={formik.values.fecha_primera_renovacion ? new Date(formik.values.fecha_primera_renovacion).toISOString().split('T')[0] : ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.fecha_primera_renovacion}
                                />

                                <Form.Input  
                                    id="fecha_segunda_renovacion"
                                    name="fecha_segunda_renovacion" 
                                    label="FECHA SEGUNDA RENOVACION"
                                    type="date" 
                                    placeholder="INGRESAR FECHA" 
                                    value={formik.values.fecha_segunda_renovacion ? new Date(formik.values.fecha_segunda_renovacion).toISOString().split('T')[0] : ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.fecha_segunda_renovacion}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
