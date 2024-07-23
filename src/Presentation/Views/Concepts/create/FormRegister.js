import React from 'react';
import { Form, Button, Grid, GridColumn, Segment, Label } from 'semantic-ui-react';
import useViewModel from './ViewModel';

export default function FormRegister() {
    const {
        profile,
        formik,
        getListLRE,
        getListType,
        getInternalCategores,
        getListCategoriesINE
    } = useViewModel();

    const typeOptions = Object.values(getListType).map((option, index) => ({ key: option.value || index, ...option }));
    const internalCategoriesOptions = Object.values(getInternalCategores).map((option, index) => ({ key: option.value || index, ...option }));
    const LREOptions = Object.values(getListLRE).map((option, index) => ({ key: option.value || index, ...option }));
    const CategoriesINE = Object.values(getListCategoriesINE).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <Form.Input  
                                id="name"
                                name="name" 
                                label="NOMBRE"
                                type="input" 
                                placeholder="INGRESAR NOMBRE DEL CONCEPTO" 
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.errors.name}
                            />

                            <Form.Select 
                                id="sys_types_concepts_id" 
                                name="sys_types_concepts_id" 
                                label="TIPO DE CONCEPTO" 
                                placeholder="SELECCIONAR TIPO DE CONCEPTO" 
                                options={typeOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.sys_types_concepts_id}
                                error={formik.errors.sys_types_concepts_id}
                            />

                            <Form.Select 
                                id="sys_internal_categories_id" 
                                name="sys_internal_categories_id" 
                                label="CATEGORIA INTERNA" 
                                placeholder="SELECCIONAR CATEGORIA INTERNA" 
                                options={internalCategoriesOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.sys_internal_categories_id}
                                error={formik.errors.sys_internal_categories_id}
                            />

                            <Form.Select 
                                id="sys_libro_remuneraciones_electrico_id" 
                                name="sys_libro_remuneraciones_electrico_id" 
                                label="CODIGO LIBRO DE REMUNERACCIONES ELECTRONICO" 
                                placeholder="SELECCIONAR LRE" 
                                options={LREOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.sys_libro_remuneraciones_electrico_id}
                                error={formik.errors.sys_libro_remuneraciones_electrico_id}
                            />

                            <Form.Select 
                                id="sys_values_lists_id	" 
                                name="sys_values_lists_id	" 
                                label="CATEGORIA INE" 
                                placeholder="SELECCIONAR CATEGORIA" 
                                options={CategoriesINE} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.sys_values_lists_id	}
                                error={formik.errors.sys_values_lists_id	}
                            />

                            <Form.Input  
                                id="comportamiento"
                                name="comportamiento" 
                                label="COMPORTAMIENTO"
                                type="input"
                                placeholder="INGRESAR COMPORTAMIENTO" 
                                value={formik.values.comportamiento}
                                onChange={formik.handleChange}
                                error={formik.errors.comportamiento}
                            />

                            <Form.Checkbox
                                id="status"
                                name="status"
                                label="HABILITADO"
                                checked={formik.values.status === 1}
                                onChange={(e, { checked }) => formik.setFieldValue('status', checked ? 1 : 0)}
                                error={formik.errors.status ? { content: formik.errors.status, pointing: 'above' } : null}
                            />

                            <Grid columns={2}>
                                <GridColumn>
                                    <Segment raised>
                                        <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                            Configuraciones Base
                                        </Label>

                                        <div className="form-group">
                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="se_rebaja_por_dias_no_trabajados"
                                                    name="attributes.se_rebaja_por_dias_no_trabajados" // Nombre completo del campo
                                                    label="Se rebaja por días no trabajados"
                                                    checked={formik.values.attributes.se_rebaja_por_dias_no_trabajados === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.se_rebaja_por_dias_no_trabajados', checked ? 1 : 0)} // Ajusta el nombre completo aquí también
                                                    error={formik.errors.attributes?.se_rebaja_por_dias_no_trabajados ? { content: formik.errors.attributes.se_rebaja_por_dias_no_trabajados, pointing: 'above' } : null} // Asegúrate de manejar correctamente los errores
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="suma_base_ias"
                                                    name="suma_base_ias"
                                                    label="Suma base para IAS"
                                                    checked={formik.values.attributes.suma_base_ias === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.suma_base_ias', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.suma_base_ias ? { content: formik.errors.attributes.suma_base_ias, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="suma_base_provision_vacaciones"
                                                    name="suma_base_provision_vacaciones"
                                                    label="Suma base provisión de vacaciones"
                                                    checked={formik.values.attributes.suma_base_provision_vacaciones === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.suma_base_provision_vacaciones', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.suma_base_provision_vacaciones ? { content: formik.errors.attributes.suma_base_provision_vacaciones, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="suma_base_vacaciones_proporcionales"
                                                    name="suma_base_vacaciones_proporcionales"
                                                    label="Suma base vacaciones proporcionales"
                                                    checked={formik.values.attributes.suma_base_vacaciones_proporcionales === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.suma_base_vacaciones_proporcionales', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.suma_base_vacaciones_proporcionales ? { content: formik.errors.attributes.suma_base_vacaciones_proporcionales, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="se_debe_contabilizar"
                                                    name="se_debe_contabilizar"
                                                    label="Se debe contabilizar"
                                                    checked={formik.values.attributes.se_debe_contabilizar === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.se_debe_contabilizar', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.se_debe_contabilizar ? { content: formik.errors.attributes.se_debe_contabilizar, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="se_puede_pagar_directo"
                                                    name="se_puede_pagar_directo"
                                                    label="Se puede pagar directo"
                                                    checked={formik.values.attributes.se_puede_pagar_directo === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.se_puede_pagar_directo', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.se_puede_pagar_directo ? { content: formik.errors.attributes.se_puede_pagar_directo, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="se_debe_agregar_institucion"
                                                    name="se_debe_agregar_institucion"
                                                    label="Se debe agregar una Institución"
                                                    checked={formik.values.attributes.se_debe_agregar_institucion === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.se_debe_agregar_institucion', checked) ? 1 : 0}
                                                    error={formik.errors.attributes?.se_debe_agregar_institucion ? { content: formik.errors.attributes.se_debe_agregar_institucion, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="es_imprimibles"
                                                    name="es_imprimibles"
                                                    label="Es imprimible"
                                                    checked={formik.values.attributes.es_imprimibles === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.es_imprimibles', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.es_imprimibles ? { content: formik.errors.attributes.es_imprimibles, pointing: 'above' } : null}
                                                />
                                            </Form.Field>
                                        </div>
                                    </Segment>
                                </GridColumn>

                                <GridColumn>
                                    <Segment raised>
                                        <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                            Configuraciones Avanzados
                                        </Label>

                                        <div className="form-group">
                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="es_preconcepto"
                                                    name="es_preconcepto"
                                                    label="Es preconcepto"
                                                    checked={formik.values.attributes.es_preconcepto === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.es_preconcepto', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.es_preconcepto ? { content: formik.errors.attributes.es_preconcepto, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="suma_base_exenta_ias"
                                                    name="suma_base_exenta_ias"
                                                    label="Suma base exenta IAS"
                                                    checked={formik.values.attributes.suma_base_exenta_ias === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.suma_base_exenta_ias', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.suma_base_exenta_ias ? { content: formik.errors.attributes.suma_base_exenta_ias, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="suma_base_calculo_sil"
                                                    name="suma_base_calculo_sil"
                                                    label="Suma base cálculo SIL"
                                                    checked={formik.values.attributes.suma_base_calculo_sil === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.suma_base_calculo_sil', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.suma_base_calculo_sil ? { content: formik.errors.attributes.suma_base_calculo_sil, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="constituye_renta_no_gravada"
                                                    name="constituye_renta_no_gravada"
                                                    label="Constituye renta no gravada"
                                                    checked={formik.values.attributes.constituye_renta_no_gravada === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.constituye_renta_no_gravada', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.constituye_renta_no_gravada ? { content: formik.errors.attributes.constituye_renta_no_gravada, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="prorratea_compensacion_bruto"
                                                    name="prorratea_compensacion_bruto"
                                                    label="Prorratea compensación bruto"
                                                    checked={formik.values.attributes.prorratea_compensacion_bruto === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.prorratea_compensacion_bruto', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.prorratea_compensacion_bruto ? { content: formik.errors.attributes.prorratea_compensacion_bruto, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="permite_ajustar_nombre"
                                                    name="permite_ajustar_nombre"
                                                    label="Permite ajustar el nombre"
                                                    checked={formik.values.attributes.permite_ajustar_nombre === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.permite_ajustar_nombre', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.permite_ajustar_nombre ? { content: formik.errors.attributes.permite_ajustar_nombre, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="excluye_liquido_garantizado"
                                                    name="excluye_liquido_garantizado"
                                                    label="Excluye del líquido garantizado"
                                                    checked={formik.values.attributes.excluye_liquido_garantizado === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.excluye_liquido_garantizado', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.excluye_liquido_garantizado ? { content: formik.errors.attributes.excluye_liquido_garantizado, pointing: 'above' } : null}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <Form.Checkbox
                                                    id="es_bono_fijo"
                                                    name="es_bono_fijo"
                                                    label="Es bono fijo"
                                                    checked={formik.values.attributes.es_bono_fijo === 1}
                                                    onChange={(e, { checked }) => formik.setFieldValue('attributes.es_bono_fijo', checked ? 1 : 0)}
                                                    error={formik.errors.attributes?.es_bono_fijo ? { content: formik.errors.attributes.es_bono_fijo, pointing: 'above' } : null}
                                                />
                                            </Form.Field>
                                        </div>
                                    </Segment>
                                </GridColumn>
                            </Grid>
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