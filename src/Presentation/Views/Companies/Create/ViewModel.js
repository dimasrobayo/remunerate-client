import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { size } from 'lodash';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { allRegions } from '../../../../Store/Slices/regionsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useCommpaniesViewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const getRegions = useSelector(state => state.regions.allRegions);
    const [getCommunes, setGetCommunes] = useState([]);
    const [getListCCAF, setGetListCCAF] = useState([]);
    const [getListMutual, setGetListMutual] = useState([]);
    const [initialValues, setInitialValues] = useState({ 
        sys_community_id: null,
        sys_institutions_id_ccaf: null,
        sys_institutions_id_mutual: null,
        national_identifier: '',
        business_name: '',
        email_human_resources: '',
        legal_representative_name: '',
        national_id_legal_representative: '',
        email_legal_representative: '',
        phone_legal_representative: '',
        cotizacion_mutual: '',
        actividad_economica: '',
        codigo_actividad_economina: '',
        street_name: '',
        street_number: '',
        postal_code: '',
        department_number: '',
        town: '',
        block: '',
        cutting_day: '',
        grouping_use: '',
        is_contracts_temporary_services: false,
        date_use_previred: '',
        use_cutoff_date_for_application_date: false,
        use_cutoff_date_for_disciplinary_events: false,
        vacation_days_remaining: '',
        consider_proportional_vacation_days: false,
        community: {
            province: {
                region_id: null
            }
        }
    });

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/companies/companybyid/${id}`)
                .then(response => {
                    const { data } = response.data;

                    // Llamada asíncrona a getListInstitutionsById y actualización de estados
                    Promise.all([
                        getListInstitutionsById(data.ccaf.sys_details_institutions_id),
                        getListInstitutionsById(data.mutual.sys_details_institutions_id)
                    ]).then(([ccafList, mutualList]) => {
                        setGetListCCAF(ccafList);
                        setGetListMutual(mutualList);
                    });

                    setInitialValues({ 
                        sys_community_id:                           data.sys_community_id,
                        sys_institutions_id_ccaf:                   data.sys_institutions_id_ccaf,
                        sys_institutions_id_mutual:                 data.sys_institutions_id_mutual,
                        national_identifier:                        data.national_identifier,
                        business_name:                              data.business_name,
                        ccaf:                                       data.ccaf,
                        mutual:                                     data.mutual,
                        community:                                  data.community || { province: { region_id: null } },
                        email_human_resources:                      data.email_human_resources,
                        legal_representative_name:                  data.legal_representative_name,
                        national_id_legal_representative:           data.national_id_legal_representative,
                        email_legal_representative:                 data.email_legal_representative,
                        phone_legal_representative:                 data.phone_legal_representative,
                        cotizacion_mutual:                          data.cotizacion_mutual,
                        actividad_economica:                        data.actividad_economica,
                        codigo_actividad_economina:                 data.codigo_actividad_economina,
                        street_name:                                data.street_name,
                        street_number:                              data.street_number,
                        postal_code:                                data.postal_code,
                        department_number:                          data.department_number,
                        town:                                       data.town,
                        block:                                      data.block,
                        cutting_day:                                data.cutting_day,
                        grouping_use:                               data.grouping_use,
                        is_contracts_temporary_services:            Boolean(data.is_contracts_temporary_services),
                        date_use_previred:                          data.date_use_previred,
                        use_cutoff_date_for_application_date:       Boolean(data.use_cutoff_date_for_application_date),
                        use_cutoff_date_for_disciplinary_events:    Boolean(data.use_cutoff_date_for_disciplinary_events),
                        vacation_days_remaining:                    data.vacation_days_remaining,
                        consider_proportional_vacation_days:        Boolean(data.consider_proportional_vacation_days)
                    });
                })
                .catch(error => {
                    if(error.response.status === 404){
                        toast.error('EMPRESA no encontrada');
                        navigate("/companies");
                    }
                });
        }else{
            // Llamada asíncrona a getListInstitutionsById y actualización de estados
            Promise.all([
                getListInstitutionsById(4),
                getListInstitutionsById(5)
            ]).then(([ccafList, mutualList]) => {
                setGetListCCAF(ccafList);
                setGetListMutual(mutualList);
            });
        }
    }, [id, navigate]);

    /**
     * Efecto para cargar las regiones desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getRegions || size(getRegions) === 0) {
            ApiRemunerate.get(`/utils/regions`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const regionsArray = data.map((region, index) => {
                        return {
                            key: region.id || index,
                            value: region.id,
                            text: region.region
                        };
                    });
                    dispatch(allRegions(regionsArray));
                }
            });
        }
    }, [getRegions, dispatch]);

    const getListInstitutionsById = async (id) => {
        if (id) {
            try {
                const response = await ApiRemunerate.get(`/institutions/listinstitutionsbycondition/${id}`);
                const { data } = response.data;
                console.log(data);
                if (data) {
                    return data.map((institution) => ({
                        key: institution.id,
                        value: institution.id,
                        text: institution.name
                    }));
                } else {
                    return []; // Devolver un array vacío si no hay datos
                }
            } catch (error) {
                console.error('Error fetching institutions:', error);
                return []; // Manejar errores y devolver un array vacío
            }
        } else {
            return []; // Devolver un array vacío si no hay ID válido
        }
    }

    const getAllCommunes = useCallback((idRegion) => {
        if(idRegion){
            ApiRemunerate.get(`/utils/communityByRegions/${idRegion}`)
            .then(response => {
                const { data } = response.data;
                if(data){
                    setGetCommunes(
                        data.map((commune) => {
                            return {
                                key: commune.id,
                                value: commune.id,
                                text: commune.comuna
                            }
                        })
                    )
                }
            })
        }
    }, []);

    const validationSchema = Yup.object().shape({
        sys_community_id: Yup.number()
            .typeError('Debe ser un número')
            .integer('Debe ser un número entero')
            .required('ID de comunidad es requerido'),
        sys_institutions_id_ccaf: Yup.number()
            .typeError('Debe ser un número')
            .integer('Debe ser un número entero')
            .required('ID de CCAF es requerido'),
        sys_institutions_id_mutual: Yup.number()
            .typeError('Debe ser un número')
            .integer('Debe ser un número entero')
            .required('ID de Mutual es requerido'),
        national_identifier: Yup.string()
            .required("Identificador nacional es requerido")
            .matches(/^\d{9}$/, 'Debe tener exactamente 9 dígitos'),
        business_name: Yup.string()
            .required("Nombre de la empresa es requerido")
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(45, 'Debe tener como máximo 45 caracteres'),
        email_human_resources: Yup.string()
            .email('Formato de correo electrónico inválido')
            .required('Email de recursos humanos es requerido'),
        legal_representative_name: Yup.string()
            .required("Nombre del representante legal es requerido"),
        national_id_legal_representative: Yup.string()
            .required("Identificador nacional del representante legal es requerido")
            .matches(/^\d{9}$/, 'Debe tener exactamente 9 dígitos'),
        email_legal_representative: Yup.string()
            .email('Formato de correo electrónico inválido')
            .required('Email del representante legal es requerido'),
        phone_legal_representative: Yup.string()
            .matches(/^\+\d{11}$/, 'Formato de teléfono inválido. Debe comenzar con "+" y tener 11 dígitos'),
        cotizacion_mutual: Yup.number()
            .typeError('Debe ser un número')
            .required('Cotización mutual es requerida'),
        actividad_economica: Yup.string()
            .required("Actividad económica es requerida"),
        codigo_actividad_economina: Yup.string()
            .required("Código de actividad económica es requerido"),
        street_name: Yup.string()
            .required("Nombre de calle es requerido"),
        street_number: Yup.string()
            .required("Número de calle es requerido"),
        postal_code: Yup.string()
            .required("Código postal es requerido"),
        department_number: Yup.string()
            .required("Número de departamento es requerido"),
        town: Yup.string(),
        block: Yup.string(),
        cutting_day: Yup.number()
            .typeError('Debe ser un número')
            .required('Día de corte es requerido'),
        grouping_use: Yup.string(),
        is_contracts_temporary_services: Yup.boolean(),
        date_use_previred: Yup.string(),
        use_cutoff_date_for_application_date: Yup.boolean(),
        use_cutoff_date_for_disciplinary_events: Yup.boolean(),
        vacation_days_remaining: Yup.string(),
        consider_proportional_vacation_days: Yup.boolean()
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema,
        onSubmit: async (formData) => {
            try {
                if (id) {
                    // Actualizar COMPANIAS existente
                    ApiRemunerate.put(`/companies/update/${id}`, formData)
                        .then(response => {
                            toast.success('EMPRESA actualizada con éxito');
                            navigate("/companies");
                        })
                        .catch((error) => {
                            toast.error('Error al actualizar EMPRESA');
                        });
                } else {
                    // Crear una nueva EMPRESA
                    
                    ApiRemunerate.post(`/companies/create`, {
                        ...formData,
                        sys_community_id: parseInt(formData.sys_community_id),
                        sys_institutions_id_ccaf: parseInt(formData.sys_institutions_id_ccaf),
                        sys_institutions_id_mutual: parseInt(formData.sys_institutions_id_mutual),
                    })
                    .then(response => {
                        if(response){
                            toast.success('EMPRESA registrado con exito');
                            navigate("/companies");
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
        getRegions,
        getCommunes,
        getListCCAF,
        getListMutual,
        getAllCommunes
    }
}

export default useCommpaniesViewModel;
