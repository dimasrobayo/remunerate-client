import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { allInternalCategories, softDeleteInternalCategories } from '../../../../Store/Slices/internalCategoriesSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con las categorías internas.
 * Proporciona acceso a las categorías internas, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const useInternalCategoriesViewModel = () => {
    const dispatch = useDispatch();
    const [internalCategories, setInternalCategories] = useState([]); // Estado local para almacenar las categorías internas
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar las categorías internas desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener las categorías internas desde la API
        ApiRemunerate.get(`/internalcategories`)
        .then(response => {
            const { data } = response.data;

            // Almacenar las categorías internas en el estado local y global
            setInternalCategories(data);
            dispatch(allInternalCategories(data));
        });
    }, [dispatch]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una categoría interna.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} internalCategoryId - ID de la categoría interna a eliminar
     */
    const deleteInternalCategories = (event, internalCategoryId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Petición DELETE para eliminar la categoría interna por ID
        ApiRemunerate.delete(`/internalcategories/delete/${internalCategoryId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                // Eliminar visualmente la fila de la tabla
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con éxito!');
                // Actualizar estado global para marcar la categoría como eliminada
                dispatch(softDeleteInternalCategories({id: internalCategoryId, deleted_at: deletedAt}));
            } else {
                toast.success('Algo ha salido mal, inténtelo más tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    return {
        internalCategories,
        currentPage,
        pageSize,
        setCurrentPage,
        profile,
        deleteInternalCategories
    }
}

export default useInternalCategoriesViewModel;
