import React from 'react';
import useViewModel from './ViewModel';
import { Form, Button } from 'semantic-ui-react';
import { formatCurrency } from '../../../../utils/global'

export default function FormRegister() {
    const {
        profile,
        formik,
    } = useViewModel();

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <Form.Input  
                                id="value_uf"
                                name="value_uf" 
                                type="input"
                                label="VALOR UF" 
                                placeholder="INGRESAR VALOR DE UF" 
                                value={formatCurrency(formik.values.value_uf)}
                                onChange={formik.handleChange}
                                error={formik.errors.value_uf}
                            />

                            <Form.Input  
                                id="value_utm"
                                name="value_utm" 
                                type="input"
                                label="VALOR UTM" 
                                placeholder="INGRESAR VALOR DE UTM" 
                                value={formatCurrency(formik.values.value_utm)}
                                onChange={formik.handleChange}
                                error={formik.errors.value_utm}
                            />

                            <Form.Input  
                                id="renta_minima"
                                name="renta_minima" 
                                type="input"
                                label="VALOR DEL INGRESO MINIMO" 
                                placeholder="INGRESAR VALOR DEL INGRESO MINIMO" 
                                value={formatCurrency(formik.values.renta_minima)}
                                onChange={formik.handleChange}
                                error={formik.errors.renta_minima}
                            />

                            <Form.Input  
                                id="tope_imponible_afp"
                                name="tope_imponible_afp" 
                                type="input"
                                label="TOPE IMPONIBLE AFP (UF)" 
                                placeholder="INGRESAR TOPE IMPONIBLE AFP (UF)" 
                                value={formatCurrency(formik.values.tope_imponible_afp)}
                                onChange={formik.handleChange}
                                error={formik.errors.tope_imponible_afp}
                            />

                            <Form.Input  
                                id="tope_imponible_seguro_cesantia"
                                name="tope_imponible_seguro_cesantia" 
                                type="input"
                                label="TOPE IMPONIBLE SEGURO CESANTIA (UF)" 
                                placeholder="INGRESAR TOPE IMPONIBLE SEGURO CESANTIA (UF)" 
                                value={formatCurrency(formik.values.tope_imponible_seguro_cesantia)}
                                onChange={formik.handleChange}
                                error={formik.errors.tope_imponible_seguro_cesantia}
                            />

                            <Form.Input  
                                id="tope_imponible_sistema_antiguo"
                                name="tope_imponible_sistema_antiguo" 
                                type="input"
                                label="TOPE IMPONIBLE SISTEMA ANTIGUO" 
                                placeholder="INGRESAR TOPE IMPONIBLE SISTEMA ANTIGUO" 
                                value={formatCurrency(formik.values.tope_imponible_sistema_antiguo)}
                                onChange={formik.handleChange}
                                error={formik.errors.tope_imponible_sistema_antiguo}
                            />

                            <Form.Input  
                                id="seguro_invalidez_sobrevivencia"
                                name="seguro_invalidez_sobrevivencia" 
                                type="input"
                                label="SEGURO DE INVALIDEZ SOBREVIVENCIA" 
                                placeholder="INGRESAR SEGURO DE INVALIDEZ SOBREVIVENCIA" 
                                value={formatCurrency(formik.values.seguro_invalidez_sobrevivencia)}
                                onChange={formik.handleChange}
                                error={formik.errors.seguro_invalidez_sobrevivencia}
                            />

                            <Form.Input  
                                id="escala_1a"
                                name="escala_1a" 
                                type="input"
                                label="ESCALA 1A" 
                                placeholder="INGRESAR ESCALA 1A" 
                                value={formatCurrency(formik.values.escala_1a)}
                                onChange={formik.handleChange}
                                error={formik.errors.escala_1a}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button type="submit" style={{backgroundColor: profile.myColor, color: '#ffffff'}}>
                        ACTUALIZAR DATOS
                    </Button>
                </div>
            </Form>
        </div>
  )
}