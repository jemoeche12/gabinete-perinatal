import { useAuth } from "./useAuth";
import {
  membresiaLevels,
  permisosConfig,
  serviciosPagos,
  requisitoMembresia,
  getSiguienteNivel,
  getInfoPlan,
} from "../config/permisosConfig";

export const usePermisses = () => {
  const { membresia, role, isAdmin, isMembresiaActive } = useAuth(); 
  const tipoMembresia = membresia?.tipo || "basico";
  const nivelActual = membresiaLevels[tipoMembresia] || 1;

  if (isAdmin()) {
    return {
      getContenidoLimitado: () => null,
      canAccessServicio: () => true,
      canAccessContenido: () => true,
      canAccessByLevel: () => true,
      requierePagoServicio: () => false,
      isServicioVisible: () => true,
      mostrarActualizacionMembresia: () => false,
      getLevelRequiredForContent: () => null,
      getSiguienteNivelDisponible: () => null,
      
      tipoMembresia: "admin",
      nivelActual: 99,
      membresiaActiva: true,
    };
  }

  const getContenidoLimitado = (typeContent) => {
    if (!permisosConfig[typeContent]) {
      console.warn(`Tipo de contenido '${typeContent}' no configurado`);
      return null;
    }
    const limite = permisosConfig[typeContent][tipoMembresia];
    return limite;
  };

  const canAccessServicio = (typeServicio) => {
    if (!serviciosPagos[typeServicio]) {
      console.warn(`Servicio '${typeServicio}' no configurado`);
      return false;
    }
    const servicioInfo = serviciosPagos[typeServicio];
    return servicioInfo.membresiaRequired.includes(tipoMembresia);
  };

  const isServicioVisible = (typeServicio) => {
    if (!serviciosPagos[typeServicio]) {
      return false;
    }
    return serviciosPagos[typeServicio].visibleAll;
  };

  const requierePagoServicio = (typeServicio) => {
    if (!serviciosPagos[typeServicio]) {
      return true;
    }
    const servicioInfo = serviciosPagos[typeServicio];
    return servicioInfo.requierePago?.includes(tipoMembresia) || false;
  };

  const canAccessContenido = (typeContent, index) => {
    const limite = getContenidoLimitado(typeContent);
    if (limite === null) return true;
    if (limite === undefined) return false;
    return index < limite;
  };

  const canAccessByLevel = (requiredLevel) => {
    const normalizedRequiredLevel = requiredLevel
      ? requiredLevel.toLowerCase()
      : "basico";

    const levelRequired = membresiaLevels[normalizedRequiredLevel] || 0;
    return nivelActual >= levelRequired;
  };

  const getLevelRequiredForContent = (typeContent) => {
    const levelsContent = permisosConfig[typeContent];
    if (!levelsContent) return null;

    for (const [level, limit] of Object.entries(levelsContent)) {
      if (limit === null) {
        return level;
      }
    }
    return null;
  };

  const getSiguienteNivelDisponible = () => {
    return getSiguienteNivel(tipoMembresia);
  };

  const mostrarActualizacionMembresia = (typeContent, index) => {
    return !canAccessContenido(typeContent, index);
  };

  const getInfoPlanActual = () => {
    return getInfoPlan(tipoMembresia);
  };

  const getNombreMembresia = () => {
    const nombres = {
      basico: "basico",
      intermedio: "intermedio",
      premium: "premium",
    };
    return nombres[tipoMembresia] || "Desconocido";
  };

  const membresiaActiva = isMembresiaActive();

  return {
    getContenidoLimitado,
    canAccessServicio,
    canAccessContenido,
    canAccessByLevel,
    isServicioVisible,
    requierePagoServicio,
    getLevelRequiredForContent,
    getSiguienteNivelDisponible,
    getInfoPlanActual,
    getNombreMembresia,
    mostrarActualizacionMembresia,
    tipoMembresia,
    nivelActual,
    membresiaActiva,
  };
};
