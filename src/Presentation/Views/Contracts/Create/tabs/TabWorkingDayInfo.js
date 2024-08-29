import React from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabWorkingDayInfo({ formik }) {
    const {
        profile
    } = useViewModel();

    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                JORNADA DE TRABAJO
                            </Label>

                            <Divider hidden />

                            <Form.Group>
                                <Form.Checkbox
                                    id="jornada_parcial"
                                    name="jornada_parcial"
                                    label="JORNADA PARCIAL"
                                    checked={formik.values.jornada_parcial === "true"} // Para que se considere como un string
                                    onChange={(e, { checked }) => formik.setFieldValue('jornada_parcial', checked ? "true" : "false")}
                                    error={formik.errors.jornada_parcial ? { content: formik.errors.jornada_parcial, pointing: 'above' } : null}
                                />

                                <Form.Checkbox
                                    id="teletrabajo"
                                    name="teletrabajo"
                                    label="TELETRABAJO"
                                    checked={formik.values.teletrabajo === "true"}
                                    onChange={(e, { checked }) => formik.setFieldValue('teletrabajo', checked ? "true" : "false")}
                                    error={formik.errors.teletrabajo ? { content: formik.errors.teletrabajo, pointing: 'above' } : null}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="modalidad_contrato" 
                                    name="modalidad_contrato" 
                                    label="MODALIDAD DE CONTRATO" 
                                    placeholder="SELECCIONAR MODALIDAD" 
                                    options={[
                                        { key: 1, value: '1', text: 'Con hora' },
                                        { key: 2, value: '2', text: 'Sin horario art 22' },
                                        { key: 3, value: '3', text: 'Especial Art.38 (LRE401)' },
                                        { key: 4, value: '4', text: 'Especial Art.36 (LRE411)' },
                                        { key: 5, value: '5', text: 'Jornada especial Art.25 (LRE406)' },
                                        { key: 6, value: '6', text: 'Jornada especial Art.25 (LRE407)' },
                                        { key: 7, value: '7', text: 'Jornada bisemanal Art.39 (LRE501)' },
                                        { key: 8, value: '8', text: 'Jornada excepcional Art.38 (LRE601)' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.modalidad_contrato}
                                    error={formik.errors.modalidad_contrato}
                                />

                                <Form.Input  
                                    id="horas_semanales"
                                    name="horas_semanales"
                                    label="HORAS SEMANALES*" 
                                    type="input" 
                                    placeholder="INGRESAR LAS HORAS SEMANALES" 
                                    value={formik.values.horas_semanales}
                                    onChange={formik.handleChange}
                                    error={formik.errors.horas_semanales}
                                />

                                <Form.Select 
                                    id="distribucion_jornada" 
                                    name="distribucion_jornada" 
                                    label="DISTRIBUCION DE LA JORNADA*" 
                                    placeholder="SELECCIONAR DISTRIBUCION DE LA JORNADA" 
                                    options={[
                                        { key: 1, value: '1', text: '4 días x Semana' },
                                        { key: 2, value: '2', text: '5 días x Semana' },
                                        { key: 3, value: '3', text: '6 días x Semana' },
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.distribucion_jornada}
                                    error={formik.errors.distribucion_jornada}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>
            </div>
        </div>
    )
}
