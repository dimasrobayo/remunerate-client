import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con los empleados.
 * Proporciona acceso a los empleados, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const ContractsViewModel = () => {
    const { id } = useParams(); // Para obtener el ID de la URL
    const dispatch = useDispatch();
    const [contracts, setContracts] = useState([]); // Estado local para almacenar los contracts
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar los contracts desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener los contracts desde la API
        ApiRemunerate.get(`/contracts/${id}`)
        .then(response => {
            const { data } = response.data;

            // Almacenar los contracts en el estado local y global
            setContracts(data);
        });
    }, [id, dispatch]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una contracts.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} contractsId - ID de la contracts a eliminar
     */
    const deletedContracts = (event, contractsId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;

        // Petición DELETE para eliminar la contracts por ID
        ApiRemunerate.delete(`/contracts/delete/${contractsId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                // Eliminar visualmente la fila de la tabla
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con éxito!');
            } else {
                toast.success('Algo ha salido mal, inténtelo más tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    // Función para filtrar los empleados según el término de búsqueda
    const filteredContracts = filter(contracts, contract => {
        return contract.nombre_contrato.toLowerCase().includes(searchTerm.toLowerCase());
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

    // Aplicar paginación a los empleados
    const paginatedContracts = paginate(filteredContracts, pageSize, currentPage);

    return {
        profile,
        pageSize,
        contracts,
        searchTerm, 
        currentPage,
        filteredContracts,
        paginatedContracts,
        setSearchTerm,
        setCurrentPage,
        deletedContracts
    }
}

export default ContractsViewModel;
