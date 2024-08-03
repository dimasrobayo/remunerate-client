import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useCreateInternalCategoryViewModel = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ name: '' });

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/internalcategories/internalcategoriesbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    setInitialValues({ name: data.name });
                })
                .catch(error => {
                    toast.error('Error al cargar los datos de la categoría interna');
                });
        }
    }, [id]);

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
                    // Actualizar categoría interna existente
                    ApiRemunerate.put(`/internalcategories/update/${id}`, formData)
                        .then(response => {
                            toast.success('Categoría interna actualizada con éxito');
                            navigate("/internalcategories");
                        })
                        .catch((error) => {
                            toast.error('Error al actualizar la categoría interna');
                        });
                } else {
                    ApiRemunerate.post(`/internalcategories/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('CATEGORIA INTERNA registrado con exito');
                            navigate("/internalcategories");
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
        formik
    }
}

export default useCreateInternalCategoryViewModel;
