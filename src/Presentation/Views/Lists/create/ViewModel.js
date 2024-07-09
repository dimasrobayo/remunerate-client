import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useCreateInstitucionViewModel = () => { 
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ 
        sys_lists_id: '', 
        item: '', 
        name: '', 
        value_a: '', 
        value_b: '', 
        value_c: '' 
    });
    const [listsOptions, setListsOptions] = useState([]);
    const [selectedLists, setSelectedLists] = useState(null);
    
    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/lists/listsbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    console.log(data)
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
        setSelectedLists(value);
        formik.setFieldValue('sys_lists_id', value);
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            name: Yup.string()
                .required("La NOMBRE es requerida!")
                .min(3, 'El NOMBRE debe tener un minimo de 3 caracteres')
                .max(45, 'El NOMBRE debe tener un maximo de 45 caracteres'),
        }),
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

export default useCreateInstitucionViewModel;
