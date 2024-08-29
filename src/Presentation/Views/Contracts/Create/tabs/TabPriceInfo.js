import React from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabHeartInfo({ formik }) {
    const {
        profile,
        getZonaExtrema
    } = useViewModel();
    
    const zonaExtremaOptions = Object.values(getZonaExtrema).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body row">
            <div className="col-md-12">
            <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE COTIZACIONES
                            </Label>

                            <Divider hidden />

                            <Form.Group>
                                <Form.Checkbox
                                    id="cotiza_trabajo_pesado"
                                    name="cotiza_trabajo_pesado"
                                    label="COTIZA TRABAJO PESADO"
                                    checked={formik.values.cotiza_trabajo_pesado === "true"}
                                    onChange={(e, { checked }) => formik.setFieldValue('cotiza_trabajo_pesado', checked ? "true" : "false")}
                                    error={formik.errors.cotiza_trabajo_pesado ? { content: formik.errors.cotiza_trabajo_pesado, pointing: 'above' } : null}
                                />

                                <Form.Checkbox
                                    id="seguro_cesantia"
                                    name="seguro_cesantia"
                                    label="SEGURO CESANTIA"
                                    checked={formik.values.seguro_cesantia === "true"}
                                    onChange={(e, { checked }) => formik.setFieldValue('seguro_cesantia', checked ? "true" : "false")}
                                    error={formik.errors.seguro_cesantia ? { content: formik.errors.seguro_cesantia, pointing: 'above' } : null}
                                />

                                <Form.Checkbox
                                    id="sueldo_patronal"
                                    name="sueldo_patronal"
                                    label="SUELDO PATRONAL"
                                    checked={formik.values.sueldo_patronal === "true"}
                                    onChange={(e, { checked }) => formik.setFieldValue('sueldo_patronal', checked ? "true" : "false")}
                                    error={formik.errors.sueldo_patronal ? { content: formik.errors.sueldo_patronal, pointing: 'above' } : null}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="fecha_incorperacion_cotiza"
                                    name="fecha_incorperacion_cotiza" 
                                    label="FECHA DE INCORPORACION"
                                    type="date" 
                                    placeholder="INGRESAR FECHA DE INCORPORACION" 
                                    value={formik.values.fecha_incorperacion_cotiza ? new Date(formik.values.fecha_incorperacion_cotiza).toISOString().split('T')[0] : ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.fecha_incorperacion_cotiza}
                                />

                                <Form.Input  
                                    id="cotizacion"
                                    name="cotizacion" 
                                    label="COTIZACION"
                                    type="number" 
                                    placeholder="0.0"
                                    value={formik.values.cotizacion}
                                    onChange={formik.handleChange}
                                    error={formik.errors.cotizacion}
                                />

                                <Form.Select
                                    id="nivel_sence"
                                    name="nivel_sence"
                                    label="NIVEL SENCE"
                                    options={[
                                        { key: 1, value: 1, text: 'Sin Definir' },
                                        { key: 2, value: 2, text: 'Ejecutivo' },
                                        { key: 3, value: 3, text: 'Profesional' },
                                        { key: 4, value: 4, text: 'Mando Medio' },
                                        { key: 5, value: 5, text: 'Administrativo' },
                                        { key: 6, value: 6, text: 'Trabajador Calificado' },
                                        { key: 7, value: 7, text: 'Trabajador Semi Calificado' },
                                        { key: 8, value: 8, text: 'Trabajador No Calificado' }
                                    ]}
                                    placeholder="SELECCIONAR NIVEL SENCE"
                                    value={formik.values.nivel_sence}
                                    onChange={(e, { value }) => formik.setFieldValue('nivel_sence', value)}
                                    error={formik.errors.nivel_sence}
                                />

                                <Form.Select 
                                    id="zona_extrema" 
                                    name="zona_extrema" 
                                    label="ZONA EXTRAMA" 
                                    placeholder="SELECCIONAR ZONA EXTREMA" 
                                    options={zonaExtremaOptions} 
                                    onChange={(e, { value }) => formik.setFieldValue('zona_extrema', value)}
                                    value={formik.values.zona_extrema}
                                    error={formik.errors.zona_extrema}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
