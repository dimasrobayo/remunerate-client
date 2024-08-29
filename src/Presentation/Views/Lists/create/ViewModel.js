import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useCreateListViewModel = () => { 
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ 
        sys_lists_id: null, 
        item: '', 
        name: '', 
        value_a: 0, 
        value_b: 0, 
        value_c: 0
    });
    const [listsOptions, setListsOptions] = useState([]);
    const [selectedLists, setSelectedLists] = useState(null);
    
    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/lists/listsbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    setInitialValues({ 
                        sys_lists_id: data.sys_lists_id,
                        item: data.item, 
                        name: data.name,
                        value_a: data.value_a,
                        value_b: data.value_b,
                        value_c: data.value_c
                    });
                })
                .catch(error => {
                    toast.error('Error al cargar los datos de los tipos de conceptos');
                });
        }

        const fetchLists = async () => {
            try {
                const response = await ApiRemunerate.get('/onlylists');
                const { data } = response.data;
                const options = Array.isArray(data) ? data.map(list => ({
                    key: list.id,
                    text: list.name,
                    value: list.id
                })) : [];
                setListsOptions(options);
            } catch (error) {
                toast.error('Error al cargar los datos de los tipos de conceptos');
            }
        };
        
        fetchLists();
    }, [id]);

    const handleListChange = (e, { value }) => {
        formik.setFieldValue('sys_lists_id', value);
        setSelectedLists(value);
    };

    // Define el esquema de validación
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("La NOMBRE es requerida!")
            .max(100, 'El NOMBRE debe tener un máximo de 100 caracteres'),
        value_a: Yup.number()
            .required('El valor A es requerido')
            .typeError('El valor A debe ser un número')
            .positive('El valor A debe ser positivo')
            .min(0, 'El valor A debe ser mayor o igual a 0')
            .test('is-decimal', 'El valor A debe tener como máximo 2 decimales', value => {
                return /^\d+(\.\d{1,2})?$/.test(value);
            }),
        value_b: Yup.number()
            .required('El valor B es requerido')
            .typeError('El valor B debe ser un número')
            .positive('El valor B debe ser positivo')
            .min(0, 'El valor B debe ser mayor o igual a 0')
            .test('is-decimal', 'El valor B debe tener como máximo 2 decimales', value => {
                return /^\d+(\.\d{1,2})?$/.test(value);
            }),
        value_c: Yup.number()
            .required('El valor C es requerido')
            .typeError('El valor C debe ser un número')
            .positive('El valor C debe ser positivo')
            .min(0, 'El valor C debe ser mayor o igual a 0')
            .test('is-decimal', 'El valor C debe tener como máximo 2 decimales', value => {
                return /^\d+(\.\d{1,2})?$/.test(value);
            }),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema,
        onSubmit: async (formData) => {
            try {
                if (id) {
                    // Actualizar Institucion existente
                    ApiRemunerate.put(`/lists/update/${id}`, formData)
                    .then(response => {
                        toast.success('LISTA actualizada con éxito');
                        navigate("/lists");
                    })
                    .catch((error) => {
                        toast.error('Error al actualizar Lista');
                    });
                } else {
                    console.log(formData)
                    // Crear nueva Institucion
                    ApiRemunerate.post(`/lists/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('LISTA registrado con exito');
                            navigate("/lists");
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
        listsOptions,
        selectedLists,
        handleListChange
    }
}

export default useCreateListViewModel;
