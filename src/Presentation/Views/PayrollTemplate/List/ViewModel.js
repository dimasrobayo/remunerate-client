import { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

/**
 * Hook personalizado que gestiona la lógica de negocio relacionada con los empleados.
 * Proporciona acceso a los empleados, paginación, perfil de usuario y funciones para eliminar categorías.
 */
const PayrollTemplateViewModel = () => {
    const { id } = useParams(); // Para obtener el ID de la URL
    const [concepts, setConcepts] = useState([]); // Estado local para almacenar los contracts
    const [plantillaOwner, setPlantillaOwner] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Página actual de la paginación
    const [pageSize] = useState(10); // Número de elementos por página
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile'))); // Perfil de usuario almacenado localmente

    /**
     * Efecto para cargar los contracts desde la API al cargar el componente.
     */
    useEffect(() => {
        // Petición GET para obtener los contracts desde la API
        ApiRemunerate.get(`/payrolltemplate/show/${id}`)
        .then(response => {
            const { data } = response.data;

            // Almacenar los contracts en el estado local
            setConcepts(data.payrollTemplates);
            // Almacenar nombre del dueno de la plantilla
            const name = data.name || '';
            const lastname = data.lastname || '';
            const motherLastname = data.mother_lastname || '';

            // Crear la cadena con manejo de espacios y posibles valores faltantes
            const fullName = [name, lastname, motherLastname].filter(Boolean).join(' ').trim();

            // Establecer el valor con la función
            setPlantillaOwner(fullName);
        });
    }, [id]); // Se ejecuta solo al montar el componente o cuando dispatch cambia

    /**
     * Función para eliminar una contracts.
     * @param {Event} event - Evento del botón de eliminación
     * @param {number} contractsId - ID de la contracts a eliminar
     */
    const deletedConcepts = (event, contractsId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;

        // Petición DELETE para eliminar la contracts por ID
        ApiRemunerate.delete(`/payrolltemplate/delete/${contractsId}`)
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
    const filteredResults = filter(concepts, concept => {
        return concept.sysConcept.name.toLowerCase().includes(searchTerm.toLowerCase());
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
    const paginatedResults = paginate(filteredResults, pageSize, currentPage);

    return {
        profile,
        pageSize,
        concepts,
        searchTerm, 
        currentPage,
        plantillaOwner,
        filteredResults,
        paginatedResults,
        setSearchTerm,
        setCurrentPage,
        deletedConcepts
    }
}

export default PayrollTemplateViewModel;
