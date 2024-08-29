import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import '../../../../utils/yupRutValidator';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useCreateInstitucionViewModel = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [initialValues, setInitialValues] = useState({ 
        sys_details_institutions_id: '', 
        rut: '', 
        name: '', 
        value: '', 
        aditional_data: '', 
        equivalencia_previred: '' 
    });
    
    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/institutions/institutionsbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    setInitialValues({ 
                        sys_details_institutions_id: data.sys_details_institutions_id,
                        rut_institution: data.rut_institution, 
                        name: data.name,
                        value: data.value,
                        aditional_data: data.aditional_data,
                        equivalencia_previred: data.equivalencia_previred
                    });
                })
                .catch(error => {
                    toast.error('Error al cargar los datos de los tipos de conceptos');
                });
        }
        
        const fetchInstitutionTypes = async () => {
            try {
                const response = await ApiRemunerate.get('/institutionstypes');
                const { data } = response.data;
                const options = Array.isArray(data) ? data.map(institution => ({
                    key: institution.id,
                    text: institution.name,
                    value: institution.id
                })) : [];
                setInstitutionOptions(options);
            } catch (error) {
                toast.error('Error al cargar los datos de los tipos de conceptos');
            }
        };
        
        fetchInstitutionTypes();
    }, [id]);

    const handleInstitutionChange = (e, { value }) => {
        setSelectedInstitution(value);
        formik.setFieldValue('sys_details_institutions_id', value);
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            rut_institution: Yup.string()
                .max(12, 'El RUT debe tener un máximo de 12 caracteres'),
            name: Yup.string()
                .required("La NOMBRE es requerida!")
                .min(3, 'El NOMBRE debe tener un minimo de 3 caracteres')
                .max(45, 'El NOMBRE debe tener un maximo de 45 caracteres'),
            value: Yup.number()
                .required('El valor es requerido')
                .typeError('El valor debe ser un número')
                .positive('El valor debe ser positivo')
                .min(0, 'El valor debe ser mayor o igual a 0')
                .test('is-decimal', 'El valor debe tener como máximo 2 decimales', value => {
                    return /^\d+(\.\d{1,2})?$/.test(value);
                }),
        }),
        onSubmit: async (formData) => {
            try {
                if (id) {
                    // Actualizar Institucion existente
                    ApiRemunerate.put(`/institutions/update/${id}`, formData)
                        .then(response => {
                            toast.success('Institución actualizada con éxito');
                            navigate("/institutions");
                        })
                        .catch((error) => {
                            toast.error('Error al actualizar Institución');
                        });
                } else {
                    // Crear nueva Institucion
                    ApiRemunerate.post(`/institutions/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('INSTITUCIÓN registrado con exito');
                            navigate("/institutions");
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
        profile,
        formik,
        institutionOptions,
        selectedInstitution,
        handleInstitutionChange
    }
}

export default useCreateInstitucionViewModel;
