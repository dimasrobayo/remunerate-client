import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { allConcepts, softDeleteConcepts } from '../../../../Store/Slices/conceptsSlice';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con las concepts.
 * Proporciona acceso a las concepts, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const useConceptsViewModel = () => {
    const dispatch = useDispatch();
    const [concepts, setConcepts] = useState([]); // Estado local para almacenar las concepts
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar las concepts desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener las concepts desde la API
        ApiRemunerate.get(`/concepts`)
        .then(response => {
            const { data } = response.data;
            
            // Almacenar las concepts en el estado local y global
            setConcepts(data);
            dispatch(allConcepts(data));
        });
    }, [dispatch]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una concepts.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} conceptsId - ID de la concepts a eliminar
     */
    const deleteConcepts = (event, conceptsId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Petición DELETE para eliminar la concepts por ID
        ApiRemunerate.delete(`/concepts/delete/${conceptsId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                // Eliminar visualmente la fila de la tabla
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con éxito!');

                // Actualizar estado global para marcar la categoría como eliminada
                dispatch(softDeleteConcepts({id: conceptsId, deleted_at: deletedAt}));
            } else {
                toast.success('Algo ha salido mal, inténtelo más tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    // Función para filtrar las concepts según el término de búsqueda
    const filteredConcepts = filter(concepts, value => {
        return value.name.toLowerCase().includes(searchTerm.toLowerCase());
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

    // Aplicar paginación a las concepts
    const paginatedConcepts = paginate(filteredConcepts, pageSize, currentPage);

    return {
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        concepts,
        filteredConcepts,
        paginatedConcepts,
        setSearchTerm,
        setCurrentPage,
        deleteConcepts
    }
}

export default useConceptsViewModel;
