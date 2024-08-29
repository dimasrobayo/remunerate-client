// TabProfileInfo.js
import React from 'react';
import useViewModel from '../ViewModel';
import { formatCurrency, parseCurrency } from '../../../../../utils/global';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabProfileInfo({ formik }) {
    const {
        profile,
        getAgrupacionSeguridad,
        getArea,
        getCargo,
        getSede,
        getCentroCosto,
        getSindicato,
        getSupervisorDirecto,
        getCategoriasINE,
        getOcupacion
    } = useViewModel();

    const agrupacionSeguridadOptions = Object.values(getAgrupacionSeguridad).map((option, index) => ({ key: option.value || index, ...option }));
    const areaOptions = Object.values(getArea).map((option, index) => ({ key: option.value || index, ...option }));
    const cargoOptions = Object.values(getCargo).map((option, index) => ({ key: option.value || index, ...option }));
    const sedeOptions = Object.values(getSede).map((option, index) => ({ key: option.value || index, ...option }));
    const centroCostoOptions = Object.values(getCentroCosto).map((option, index) => ({ key: option.value || index, ...option }));
    const sindicatoOptions = Object.values(getSindicato).map((option, index) => ({ key: option.value || index, ...option }));
    const supervisorOptions = Object.values(getSupervisorDirecto).map((option, index) => ({ key: option.value || index, ...option }));
    const categoriasINEOptions = Object.values(getCategoriasINE).map((option, index) => ({ key: option.value || index, ...option }));
    const ocupacionOptions = Object.values(getOcupacion).map((option, index) => ({ key: option.value || index, ...option }));
    
    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DEL CONTRATO
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="status" 
                                    name="status" 
                                    label="ESTADO DEL CONTRATO*" 
                                    placeholder="SELECCIONAR EL ESTADO" 
                                    options={[
                                        { key: 'A', value: 1, text: 'ACTIVO' },
                                        { key: 'I', value: 2, text: 'INACTIVO' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.status}
                                    error={formik.errors.status}
                                />

                                <Form.Input  
                                    id="nombre_contrato"
                                    name="nombre_contrato" 
                                    label="NOMBRES DEL CONTRATO*"
                                    type="input" 
                                    placeholder="INGRESAR NOMBRES" 
                                    value={formik.values.nombre_contrato}
                                    onChange={formik.handleChange}
                                    error={formik.errors.nombre_contrato}
                                />

                                <Form.Select 
                                    id="tipo_contrato" 
                                    name="tipo_contrato" 
                                    label="TIPO DE CONTRATO*" 
                                    placeholder="SELECCIONAR TIPO DE CONTRATO" 
                                    options={[
                                        { key: 'plazo_fijo', value: 'plazo_fijo', text: 'Plazo Fijo' },
                                        { key: 'indefinido', value: 'indefinido', text: 'Indefinido' },
                                        { key: 'obra_faena', value: 'obra_faena', text: 'Por Obra o Faena' },
                                        { key: 'aprendizaje', value: 'aprendizaje', text: 'De Aprendizaje' },
                                        { key: 'honorarios', value: 'honorarios', text: 'Honorarios' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.tipo_contrato}
                                    error={formik.errors.tipo_contrato}
                                />

                                <Form.Select 
                                    id="afecto_trato" 
                                    name="afecto_trato" 
                                    label="AFECTO A TRATO*" 
                                    placeholder="SELECCIONAR AFECTO A TRATO" 
                                    options={[
                                        { key: 2, value: 'no', text: 'NO' },
                                        { key: 1, value: 'si', text: 'SI' },
                                        { key: 3, value: 'si_sbg_habiles', text: 'Si, SBG Habiles' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.afecto_trato}
                                    error={formik.errors.afecto_trato}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="fecha_inicio"
                                    name="fecha_inicio" 
                                    label="FECHA DE INICIO*"
                                    type="date" 
                                    placeholder="INGRESAR FECHA DE INICIO" 
                                    value={formik.values.fecha_inicio}
                                    onChange={formik.handleChange}
                                    error={formik.errors.fecha_inicio}
                                />

                                <Form.Input  
                                    id="cambio_indefinido"
                                    name="cambio_indefinido" 
                                    label="CAMBIO A INDEFINIDO*"
                                    type="date" 
                                    placeholder="INGRESAR FECHA DE CAMBIO A INDEFINIDO" 
                                    value={formik.values.cambio_indefinido}
                                    onChange={formik.handleChange}
                                    error={formik.errors.cambio_indefinido}
                                />

                                <Form.Select 
                                    id="agrupacion_seguridad" 
                                    name="agrupacion_seguridad" 
                                    label="AGRUPACION DE SEGURIDAD*" 
                                    placeholder="SELECCIONAR ESTADO CIVIL" 
                                    options={agrupacionSeguridadOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.agrupacion_seguridad}
                                    error={formik.errors.agrupacion_seguridad}
                                />

                                <Form.Input
                                    id="sueldo_base"
                                    name="sueldo_base"
                                    label="SUELDO BASE*"
                                    type="text"
                                    placeholder="INGRESAR SUELDO BASE"
                                    value={formatCurrency(formik.values.sueldo_base)}
                                    onChange={(e) => {
                                        // Convierte el valor ingresado en un float
                                        const rawValue = parseCurrency(e.target.value);
                                        formik.setFieldValue('sueldo_base', rawValue);
                                    }}
                                    error={formik.errors.sueldo_base}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS ORGANIZACIONALES Y DE EMPRESA
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="area" 
                                    name="area" 
                                    label="AREA*" 
                                    placeholder="SELECCIONAR EL AREA" 
                                    options={areaOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.area}
                                    error={formik.errors.area}
                                />

                                <Form.Select 
                                    id="cargo" 
                                    name="cargo" 
                                    label="CARGO*" 
                                    placeholder="SELECCIONAR EL CARGO" 
                                    options={cargoOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.cargo}
                                    error={formik.errors.cargo}
                                />

                                <Form.Select 
                                    id="sede" 
                                    name="sede" 
                                    label="SEDE*" 
                                    placeholder="SELECCIONAR EL SEDE" 
                                    options={sedeOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.sede}
                                    error={formik.errors.sede}
                                />

                                <Form.Select 
                                    id="centro_costo" 
                                    name="centro_costo" 
                                    label="CENTRO DE COSTO*" 
                                    placeholder="SELECCIONAR CENTRO DE COSTO" 
                                    options={centroCostoOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.centro_costo}
                                    error={formik.errors.centro_costo}
                                />

                                <Form.Select 
                                    id="sindicato" 
                                    name="sindicato" 
                                    label="SINDICATO*" 
                                    placeholder="SELECCIONAR EL SINDICATO" 
                                    options={sindicatoOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.sindicato}
                                    error={formik.errors.sindicato}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>  

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS LABORALES
                            </Label> 

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.TextArea 
                                    id="direccion_laboral" 
                                    name="direccion_laboral" 
                                    label="DIRECCIÓN LABORAL" 
                                    type="input" 
                                    placeholder="INGRESAR DIRECCIÓN LABORAL" 
                                    value={formik.values.direccion_laboral}
                                    onChange={formik.handleChange}
                                    error={formik.errors.direccion_laboral}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="supervisor_directo" 
                                    name="supervisor_directo" 
                                    label="SUPERVISOR DIRECTO*" 
                                    placeholder="SELECCIONAR VINCULO" 
                                    options={supervisorOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.supervisor_directo}
                                    error={formik.errors.supervisor_directo}
                                />

                                <Form.Select 
                                    id="categoria_ine" 
                                    name="categoria_ine" 
                                    label="CATEGORIA INE*" 
                                    placeholder="SELECCIONAR CATEGORIA INE" 
                                    options={categoriasINEOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.categoria_ine}
                                    error={formik.errors.categoria_ine}
                                />

                                <Form.Select 
                                    id="ocupacion" 
                                    name="ocupacion" 
                                    label="OCUPACION*" 
                                    placeholder="SELECCIONAR OCUPACIÓN" 
                                    options={ocupacionOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.ocupacion}
                                    error={formik.errors.ocupacion}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
