import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { size } from 'lodash';

const useCreateInternalCategoryViewModel = () => {
    const navigate = useNavigate();
    const [getListType, setGetListType] = useState([]);
    const [getInternalCategores, setGetInternalCategories] = useState([]);
    const [getListLRE, setGetListLRE] = useState([]);
    const [getListCategoriesINE, setGetListCategoriesINE] = useState([]);
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ 
        sys_types_concepts_id: '',
        sys_internal_categories_id: '',
        sys_libro_remuneraciones_electrico_id: '',
        sys_values_lists_id: '',
        name: '', 
        variable_unique: '',
        status: 0,
        value_contract: 0,
        comportamiento: '',
        formula: '',
        attributes: {
            se_rebaja_por_dias_no_trabajados: 0,
            suma_base_ias: 0,
            suma_base_provision_vacaciones: 0,
            suma_base_vacaciones_proporcionales: 0,
            se_debe_contabilizar: 0,
            se_puede_pagar_directo: 0,
            se_debe_agregar_institucion: 0,
            es_imprimibles: 0,
            es_preconcepto: 0,
            suma_base_exenta_ias: 0,
            suma_base_calculo_sil: 0,
            constituye_renta_no_gravada: 0,
            prorratea_compensacion_bruto: 0,
            permite_ajustar_nombre: 0,
            excluye_liquido_garantizado: 0,
            es_bono_fijo: 0
        }
    });

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/concepts/listbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    setInitialValues({
                        sys_types_concepts_id: data.sys_types_concepts_id,
                        sys_internal_categories_id: data.sys_internal_categories_id,
                        sys_libro_remuneraciones_electrico_id: data.sys_libro_remuneraciones_electrico_id,
                        sys_values_lists_id: data.sys_values_lists_id,
                        name: data.name, 
                        variable_unique: data.variable_unique,
                        status: data.status,
                        value_contract: data.value_contract,
                        comportamiento: data.comportamiento,
                        formula: data.formula,
                        attributes: {
                            se_rebaja_por_dias_no_trabajados: data.attributes.se_rebaja_por_dias_no_trabajados,
                            suma_base_ias: data.attributes.suma_base_ias,
                            suma_base_provision_vacaciones: data.attributes.suma_base_provision_vacaciones,
                            suma_base_vacaciones_proporcionales: data.attributes.suma_base_vacaciones_proporcionales,
                            se_debe_contabilizar: data.attributes.se_debe_contabilizar,
                            se_puede_pagar_directo: data.attributes.se_puede_pagar_directo,
                            se_debe_agregar_institucion: data.attributes.se_debe_agregar_institucion,
                            es_imprimibles: data.attributes.es_imprimibles,
                            es_preconcepto: data.attributes.es_preconcepto,
                            suma_base_exenta_ias: data.attributes.suma_base_exenta_ias,
                            suma_base_calculo_sil: data.attributes.suma_base_calculo_sil,
                            constituye_renta_no_gravada: data.attributes.constituye_renta_no_gravada,
                            prorratea_compensacion_bruto: data.attributes.prorratea_compensacion_bruto,
                            permite_ajustar_nombre: data.attributes.permite_ajustar_nombre,
                            excluye_liquido_garantizado: data.attributes.excluye_liquido_garantizado,
                            es_bono_fijo: data.attributes.es_bono_fijo
                        }
                    });
                })
                .catch(error => {
                    toast.error('Error al cargar los datos de del LRE');
                });
        }
    }, [id]);

    /**
     * Efecto para cargar los concepts types desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getListType || size(getListType) === 0) {
            ApiRemunerate.get(`/typesconcepts`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const typeConceptArray = data.map((type, index) => {
                        return {
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        };
                    });
                    setGetListType(typeConceptArray);
                }
            });
        }
    }, [getListType]);

    /**
     * Efecto para cargar las internal categories desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getInternalCategores || size(getInternalCategores) === 0) {
            ApiRemunerate.get(`/internalcategories`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const internalCategoryArray = data.map((type, index) => {
                        return {
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        };
                    });
                    setGetInternalCategories(internalCategoryArray);
                }
            });
        }
    }, [getInternalCategores]);

    /**
     * Efecto para cargar los LRE desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getListLRE || size(getListLRE) === 0) {
            ApiRemunerate.get(`/remunerationbook/listbynottype/1`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const LREArray = data.map((type, index) => {
                        return {
                            key: type.id || index,
                            value: type.id,
                            text: type.code + ' - ' + type.description
                        };
                    });
                    setGetListLRE(LREArray);
                }
            });
        }
    }, [getListLRE]);

    /**
     * Efecto para cargar las INE CATEGORI (id 10 sys_values_list) desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getListCategoriesINE || size(getListCategoriesINE) === 0) {
            ApiRemunerate.get(`/lists/listsvaluesbyid/10`)
            .then(response => {
                const { data } = response.data;
                console.log(data);
                if (data) {
                    const categoriesINEArray = data.values.map((category, index) => {
                        return {
                            key: category.id || index,
                            value: category.id,
                            text: category.name
                        };
                    });
                    setGetListCategoriesINE(categoriesINEArray);
                }
            });
        }
    }, [getListCategoriesINE]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            sys_types_concepts_id: Yup.number()
                .required('El tipo de concepto es requerido.'),
            sys_internal_categories_id: Yup.number()
                .required('La categoría interna es requerida.'),
            sys_libro_remuneraciones_electrico_id: Yup.number()
                .required('El libro de remuneraciones es requerido.'),
            name: Yup.string()
                .required('El nombre es requerido.'),
            comportamiento: Yup.string()
                .required('El comportamiento es requerido.'),
            attributes: Yup.object().shape({
                se_rebaja_por_dias_no_trabajados: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                suma_base_ias: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                suma_base_provision_vacaciones: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                suma_base_vacaciones_proporcionales: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                se_debe_contabilizar: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                se_puede_pagar_directo: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                se_debe_agregar_institucion: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                es_imprimibles: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                es_preconcepto: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                suma_base_exenta_ias: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                suma_base_calculo_sil: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                constituye_renta_no_gravada: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                prorratea_compensacion_bruto: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                permite_ajustar_nombre: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                excluye_liquido_garantizado: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.'),
                es_bono_fijo: Yup.number()
                    .required('Este campo es requerido.')
                    .typeError('Debe ser un número.')
            })
        }),
        onSubmit: async (formData) => {
            try {
                if (id) {
                    // Actualizar categoría interna existente
                    ApiRemunerate.put(`/concepts/update/${id}`, formData)
                        .then(response => {
                            toast.success('CONCEPTO actualizada con éxito');
                            navigate("/concepts");
                        })
                        .catch((error) => {
                            console.log(error)
                            toast.error('Error al actualizar CONCEPTO');
                        });
                } else {
                    ApiRemunerate.post(`/concepts/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('CONCEPTO registrado con exito');
                            navigate("/concepts");
                        }
                    })
                    .catch((error) => {
                        toast.warning(error.message)
                    })
                }
            } catch (error) {
                toast.warning(error.message)
            }
        }
    });

    return {
        formik,
        profile,
        getListLRE,
        getListType,
        getInternalCategores,
        getListCategoriesINE,
    }
}

export default useCreateInternalCategoryViewModel;
