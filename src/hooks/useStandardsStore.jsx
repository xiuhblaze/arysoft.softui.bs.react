import { useDispatch, useSelector } from "react-redux";
import { formatISO } from "date-fns";

import { 
  onStandardsLoading, 
  setStandards,

  onStandardLoading, 
  setStandard,
  onStandardsFullListLoading,
  setStandardsFullList,

  onStandardCreating,
  isStandardCreated,
  onStandardSaving,
  isStandardSaved,
  onStandardDeleting,
  isStandardDeleted,  

  setStandardsErrorMessage,
  clearStandardsErrorMessage,
  clearStandard,
} from "../store/slices/standardsSlice";

import envVariables from "../helpers/envVariables";
import getErrorMessages from "../helpers/getErrorMessages";
import enums from "../helpers/enums";
import cortanaApi from "../api/cortanaApi";

const { VITE_DEFAULT_PAGESIZE } = envVariables();

const getSearchQuery = (options = {}) => {
  let query = '';

  query = `?pagesize=${ options?.pageSize ?? VITE_DEFAULT_PAGESIZE }`;
  query += options?.pageNumber ? `&pagenumber=${ options.pageNumber }` : '&pagenumber=1';

  query += options?.text ? `&text=${ options.text }` : '';
  query += options?.status ? `&status=${ options.status }` : '';
  query += options?.includeDeleted ? `&includeDeleted=${ options.includeDeleted }` : '';

  query += options?.order ? `&order=${ options.order }` : '';
  return query;
};

export const useStandardsStore = () => {
  const dispatch = useDispatch();
  const {
    isStandardsLoading,
    standards,
    standardsMeta,
    isStandardsFullListLoading,
    standardsFullList,

    isStandardLoading,
    isStandardCreating,
    standardCreatedOk,
    isStandardSaving,
    standardSavedOk,
    isStandardDeleting,
    standardDeletedOk,
    standard,

    standardsErrorMessage
  } = useSelector(state => state.standards)

  const { user } = useSelector(state => state.auth);
  const {
    EstatusType,
    StandardsOrdenType
  } = enums();

  // Methods

  const setError = (message) => {

    if (message.length === 0) return;

    dispatch(setStandardsErrorMessage(message));
    setTimeout(() => {
      dispatch(clearStandardsErrorMessage());
    }, 10);
  };

  //* Export Methods

  /**
   * Obtiene un listado de registros de acuerdo a los filtros establecidos, estableciendo pagesize = 0, devuelve todos los registros.
   * @param {Text, Status, Order, PageSize, PageMumber} options Objeto con las opciones para filtrar busquedas
   */
  const standardsAsync = async (options = {}) => {
    dispatch(onStandardsLoading());

    try {
      const query = getSearchQuery(options);
      const resp = await cortanaApi.get(`/standards${ query }`);
      const { Data, Meta } = await resp.data;

      dispatch(setStandards({ 
        standards: Data,
        standardsMeta: Meta }));
    } catch (error) {
      const message = getErrorMessages(error);
      setError(message);
    }
  };

  /**
   * Obtiene un listado general de todas las áreas activas
   */
  const standardsFullListAsync = async () => {
    dispatch(onStandardsFullListLoading());

    try {
      const query = getSearchQuery({
        pageSize: 0,
        estatus: EstatusType.activo,
        orden: StandardsOrdenType.nombre,
      });

      const resp = await cortanaApi.get(`/standards${ query }`);
      const { Data } = await resp.data;
      
      dispatch(setStandardsFullList({ standards: Data, }));
    } catch (error) {
      dispatch(setStandardsFullList({ standards: [] }));
    }
  };

  /**
   * Obtiene un registro de acuerdo al identificador recibido
   * @param {guid} id Identificador del registro a obtener
   * @returns null
   */
  const standardAsync = async (id) => {
    dispatch(onStandardLoading());

    if (!id) {
      setError('You must specify the ID');
      return ;
    }

    try {
      const resp = await cortanaApi.get(`/standards/${ id }`);
      const { data } = await resp.data;

      dispatch(setStandard(data));
    } catch (error) {
      const message = getErrorMessages(error);
      setError(message);
    }
  };

  /**
   * Crea un registro en limpio con sus propiedades en blanco
   * @param {string} username Nombre del usuario que realiza la creación del registro
   */
  const standardCreateAsync = async () => {
    dispatch(onStandardCreating());

    try {
      const params = {
        UpdatedUser: user.username,
      };
      const resp = await cortanaApi.post('/standards', params);
      const { Data } = await resp.data;

      dispatch(setStandard(Data));
      dispatch(isStandardCreated());
    } catch (error) {
      const message = getErrorMessages(error);
      setError(message);
    }
  };

  /**
   * Llama al endpoint para actualizar la información de un registro existente en la base de datos
   * @param {StandardID, Name, Description, Status, UpdatedUser} item Objeto tipo Standard
   */
  const standardSaveAsync = async (item) => {
    dispatch(onStandardSaving());

    const toSave = {
      ...item,
      usuarioActualizacion: user.username,
    }
    try {
      const resp = await cortanaApi.put(`/standards/${ toSave.id }`, toSave);
      const { Data } = await resp.data;

      dispatch(setStandard(Data));
      dispatch(isStandardSaved(Data));
    } catch (error) {
      const message = getErrorMessages(error);
      setError(message);
    }
  };

  /**
   * Elimina o marca como eliminado a un registro de la base de datos
   * @param {guid} id identificador del registro a eliminar
   */
  const standardDeleteAsync = async (id) => {
    dispatch(onStandardDeleting());

    const toDelete = {
      id: id,
      usuarioActualizacion: user.username,
    }

    try {
      const resp = await cortanaApi.delete(`/standards/${ id }`, { data: toDelete });
      dispatch(isStandardDeleted());
    } catch (error) {
      //console.log(error);
      const message = getErrorMessages(error);
      setError(message);
    }
  }

  const standardClear = () => {
    dispatch(clearStandard());
  }

  return {
    // properties
    isStandardsLoading,
    standards,
    standardsMeta,
    isStandardsFullListLoading,
    standardsFullList,

    isStandardLoading,
    isStandardCreating,
    standardCreatedOk,
    isStandardSaving,
    standardSavedOk,
    isStandardDeleting,
    standardDeletedOk,
    standard,

    standardsErrorMessage,

    // methods
    standardsAsync,
    standardsFullListAsync,
    standardAsync,
    standardCreateAsync,
    standardSaveAsync,
    standardDeleteAsync,
    standardClear,
  }
};