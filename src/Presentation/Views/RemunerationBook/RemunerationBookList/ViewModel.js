import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { allRemunerationBook, softDeleteRemunerationBook } from '../../../../Store/Slices/remunerationBookSlice';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con las categorías internas.
 * Proporciona acceso a las categorías internas, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const useRemunerationBookViewModel = () => {
    const dispatch = useDispatch();
    const [remunerationBook, setRemunerationBook] = useState([]); // Estado local para almacenar las categorías internas
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar las categorías internas desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener las categorías internas desde la API
        ApiRemunerate.get(`/remunerationbook`)
        .then(response => {
            const { data } = response.data;
            // Almacenar las categorías internas en el estado local y global
            setRemunerationBook(data);
            dispatch(allRemunerationBook(data));
        });
    }, [dispatch]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una categoría interna.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} remunerationBookId - ID de la categoría interna a eliminar
     */
    const deleteRemunerationBook = (event, remunerationBookId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Petición DELETE para eliminar la categoría interna por ID
        ApiRemunerate.delete(`/remunerationbook/delete/${remunerationBookId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                // Eliminar visualmente la fila de la tabla
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con éxito!');
                // Actualizar estado global para marcar la categoría como eliminada
                dispatch(softDeleteRemunerationBook({id: remunerationBookId, deleted_at: deletedAt}));
            } else {
                toast.success('Algo ha salido mal, inténtelo más tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredRemunerationBook = filter(remunerationBook, value => {
        return value.description.toLowerCase().includes(searchTerm.toLowerCase());
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
    const paginatedRemunerationBook = paginate(filteredRemunerationBook, pageSize, currentPage);

    return {
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        remunerationBook,
        filteredRemunerationBook,
        paginatedRemunerationBook,
        setSearchTerm,
        setCurrentPage,
        deleteRemunerationBook
    }
}

export default useRemunerationBookViewModel;
