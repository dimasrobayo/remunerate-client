import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { size } from 'lodash';

const useFormRegisterViewModel = () => {
    const { userId, conceptId } = useParams();
    const navigate = useNavigate();
    const [concepts, setConcepts] = useState([]); // Estado local para almacenar las concepts
    const [getPayrollTemplatesType, setGetPayrollTemplatesType] = useState([]);
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [conceptPayrollId, setConceptPayrollId] = useState(null); 
    const [initialValues, setInitialValues] = useState({ 
        user_personal_info_id: userId,
        sys_concept_id: null,
        payroll_templates_type: null,
        amount: null
    });

    useEffect(() => {
        if (userId && conceptId) {
            ApiRemunerate.get(`/payrolltemplate/conceptsbyuser/${userId}/${conceptId}`)
            .then(response => {
                const { data } = response.data;

                setConceptPayrollId(data[0].id);
                setInitialValues({
                    user_personal_info_id: data[0].user_personal_info_id,
                    sys_concept_id: data[0].sys_concept_id,
                    payroll_templates_type: data[0].payroll_templates_type,
                    amount: data[0].amount
                });
            })
            .catch(error => {
                toast.error('Error al cargar los datos del concepto.');
            });
        }
    }, [userId, conceptId]);

    /**
     * Efecto para cargar los concepts desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!concepts || size(concepts) === 0) {
            // Petición GET para obtener las concepts desde la API
            ApiRemunerate.get(`/concepts/list`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const conceptsArray = data.map((concept, index) => {
                        return {
                            key: concept.id || index,
                            value: concept.id,
                            text: concept.remunerationBook.code + ' - ' + concept.name
                        };
                    });
                    setConcepts(conceptsArray);
                }
                // Almacenar las concepts en el estado local y global
            })
            .catch(error => {
                console.log('ERROR: ' + error);
                toast.error('Error al cargar los datos del concepto.');
            });
        }
    }, [concepts]);

    /**
     * Efecto para cargar los payrolltemplatestype desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getPayrollTemplatesType || size(getPayrollTemplatesType) === 0) {
            ApiRemunerate.get(`/payrolltemplatestype`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const payrolltemplatestypeArray = data.map((type, index) => {
                        return {
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        };
                    });
                    setGetPayrollTemplatesType(payrolltemplatestypeArray);
                }
            });
        }
    }, [getPayrollTemplatesType]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            sys_concept_id: Yup.string()
                .required('El concepto es requerido.'),
            payroll_templates_type: Yup.string()
                .required('El tipo de registro es requerida.')
        }),
        onSubmit: async (formData) => {
            try {
                if (userId && conceptId) {
                    // Actualizar CONTRATO existente
                    ApiRemunerate.put(`/PayrollTemplate/update/${conceptPayrollId}`, {
                        ...formData
                    })
                    .then(response => {
                        toast.success('CONTRATO actualizada con éxito');
                        navigate(`/PayrollTemplate/${userId}`);
                    })
                    .catch((error) => {
                        toast.error('Error al actualizar CONTRATO');
                    });
                } else {
                    formData.user_personal_info_id = parseInt(userId, 10);
                    ApiRemunerate.post(`/PayrollTemplate/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('CONCEPTO registrado con exito');
                            navigate(`/PayrollTemplate/${userId}`);
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
        concepts,
        getPayrollTemplatesType,
    }
}

export default useFormRegisterViewModel;
