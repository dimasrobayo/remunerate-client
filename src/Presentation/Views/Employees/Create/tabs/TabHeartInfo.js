import React from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabHeartInfo({ formik }) {
    const {
        profile,
        getAFP,
        getISAPRE,
        getCountries
    } = useViewModel();

    const countriesOptions = Object.values(getCountries).map((option, index) => ({ key: option.value || index, ...option }));
    const afpOptions = Object.values(getAFP).map((option, index) => ({ key: option.value || index, ...option }));
    const isapreOptions = Object.values(getISAPRE).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body row">
            <div className="col-md-12">
            <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS PREVISIONALES
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Select
                                    id="sys_countries_id"
                                    name="healthPension.sys_countries_id"
                                    label="PAIS*"
                                    options={countriesOptions}
                                    placeholder="SELECCIONAR PAIS"
                                    value={formik.values.healthPension.sys_countries_id}
                                    onChange={(e, { value }) => formik.setFieldValue('healthPension.sys_countries_id', value)}
                                    error={formik.errors.healthPension?.sys_countries_id}
                                />
                            
                                <Form.Input  
                                    id="family_allowance_section"
                                    name="healthPension.family_allowance_section" 
                                    label="TRAMO ASIG. FAMILIAR*"
                                    type="input" 
                                    placeholder="INGRESAR TRAMO ASIG. FAMILIAR" 
                                    value={formik.values.healthPension.family_allowance_section}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.family_allowance_section}
                                />
                            
                                <Form.Input  
                                    id="retired"
                                    name="healthPension.retired" 
                                    label="JUBILADO*"
                                    type="input" 
                                    placeholder="INGRESAR JUBILADO" 
                                    value={formik.values.healthPension.retired}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.retired}
                                />

                                <Form.Input  
                                    id="fun"
                                    name="healthPension.fun" 
                                    label="FUN"
                                    type="input" 
                                    placeholder="INGRESAR" 
                                    value={formik.values.healthPension.fun}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.fun}
                                />
                            </Form.Group>
                        
                            <Form.Group widths='equal'>
                                <Form.Select
                                    id="pension_system	"
                                    name="healthPension.pension_system	"
                                    label="SISTEMA DE PENSION"
                                    options={[
                                        { key: 'n', value: 'nuevo', text: 'Nuevo' },
                                        { key: 'ai', value: 'antiguo con isapre', text: 'Antiguo con Isapre' },
                                        { key: 'af', value: 'antiguo con fonasa', text: 'Antiguo con Fonasa' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.healthPension.pension_system	}
                                    onChange={(e, { value }) => formik.setFieldValue('healthPension.pension_system', value)}
                                    error={formik.errors.healthPension?.pension_system	}
                                />

                                <Form.Select
                                    id="afp_box"
                                    name="healthPension.afp_box"
                                    label="AFP CAJA"
                                    options={afpOptions}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.healthPension.afp_box}
                                    onChange={(e, { value }) => formik.setFieldValue('healthPension.afp_box', value)}
                                    error={formik.errors.healthPension?.afp_box}
                                />

                                <Form.Input  
                                    id="afp_date"
                                    name="healthPension.afp_date" 
                                    label="FECHA INGRESO AFP"
                                    type="date" 
                                    placeholder="INGRESAR SISTEMA DE PENSIONES" 
                                    value={formik.values.healthPension.afp_date}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.afp_date}
                                />
                            </Form.Group>
                            
                            <Form.Group widths='equal'>
                                <Form.Select
                                    id="isapre_health"
                                    name="healthPension.isapre_health"
                                    label="ISAPRE - Salud"
                                    options={isapreOptions}
                                    placeholder="SELECCIONAR SISTEMA DE SALUD"
                                    value={formik.values.healthPension.isapre_health}
                                    onChange={(e, { value }) => formik.setFieldValue('healthPension.isapre_health', value)}
                                    error={formik.errors.healthPension?.isapre_health}
                                />

                                <Form.Select
                                    id="money"
                                    name="healthPension.money"
                                    label="MONEDA"
                                    options={[
                                        { key: 'n', value: '7', text: '7%' },
                                        { key: 'ai', value: 'uf', text: 'U.F.' },
                                        { key: 'ai', value: 'pesos', text: 'Pesos' },
                                        { key: 'af', value: '7+uf', text: '7% + U.F.' },
                                        { key: 'af', value: '7+pesos', text: '7% + Pesos' },
                                        { key: 'af', value: 'uf+pesos', text: 'U.F. + Pesos' },
                                        { key: 'af', value: '7+uf+pesos', text: '7% + U.F. + Pesos' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.healthPension.money}
                                    onChange={(e, { value }) => formik.setFieldValue('healthPension.money', value)}
                                    error={formik.errors.healthPension?.money}
                                />

                                <Form.Input  
                                    id="uf"
                                    name="healthPension.uf" 
                                    label="U.F."
                                    type="number" 
                                    placeholder="0.0" 
                                    value={formik.values.healthPension.uf}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.uf}
                                />

                                <Form.Input  
                                    id="pesos"
                                    name="healthPension.pesos" 
                                    label="PESOS"
                                    type="number" 
                                    placeholder="0" 
                                    value={formik.values.healthPension.pesos}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthPension?.pesos}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
