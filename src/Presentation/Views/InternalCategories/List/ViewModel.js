import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { allInternalCategories, softDeleteInternalCategories } from '../../../../Store/Slices/internalCategoriesSlice';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con las categorías internas.
 * Proporciona acceso a las categorías internas, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const useInternalCategoriesViewModel = () => {
    const dispatch = useDispatch();
    const [internalCategories, setInternalCategories] = useState([]); // Estado local para almacenar las categorías internas
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
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

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredInternalCategories = filter(internalCategories, category => {
        return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    /**
    * Función utilitaria para paginar un array.
    * @param {Array} array - El array que se desea paginar.
    * @param {number} pageSize - Tamaño de la página.
    * @param {number} pageNumber - Número de la página actual.
    * @returns {Array} - Subconjunto paginado del array original.
    */
    const paginate = (array, pageSize, pageNumber) => {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    };

    // Aplicar paginación a las categorías internas
    const paginatedInternalCategories = paginate(filteredInternalCategories, pageSize, currentPage);

    return {
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        internalCategories,
        filteredInternalCategories,
        paginatedInternalCategories,
        setSearchTerm,
        setCurrentPage,
        deleteInternalCategories
    }
}

export default useInternalCategoriesViewModel;
