import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { allCompanies, softDeletedCompany } from '../../../../Store/Slices/companiesSlice';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con las companies.
 * Proporciona acceso a las companies, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const useCompaniesViewModel = () => {
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]); // Estado local para almacenar las companies
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar las companies desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener las companies desde la API
        ApiRemunerate.get(`/companies`)
        .then(response => {
            const { data } = response.data;

            // Almacenar las companies en el estado local y global
            setCompanies(data);
            dispatch(allCompanies(data));
        });
    }, [dispatch]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una company.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} companyId - ID de la company a eliminar
     */
    const deletedCompanies = (event, companyId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Petición DELETE para eliminar la company por ID
        ApiRemunerate.delete(`/companies/delete/${companyId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                // Eliminar visualmente la fila de la tabla
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con éxito!');
                // Actualizar estado global para marcar la categoría como eliminada
                dispatch(softDeletedCompany({id: companyId, deleted_at: deletedAt}));
            } else {
                toast.success('Algo ha salido mal, inténtelo más tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    // Función para filtrar las companies según el término de búsqueda
    const filteredCompanies = filter(companies, company => {
        return company.business_name.toLowerCase().includes(searchTerm.toLowerCase());
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

    // Aplicar paginación a las companies
    const paginatedCompanies = paginate(filteredCompanies, pageSize, currentPage);

    return {
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        companies,
        filteredCompanies,
        paginatedCompanies,
        setSearchTerm,
        setCurrentPage,
        deletedCompanies
    }
}

export default useCompaniesViewModel;
