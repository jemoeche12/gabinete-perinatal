import { useAuth } from "./useAuth";
import {
  membresiaLevels,
  permisosConfig,
  serviciosPagos,
  requisitoMembresia,
} from "../config/permisosConfig";

export const usePermisses = () => {
  const { membresia, role, isAdmin, isMembresiaActive } = useAuth();

  const tipoMembresia = membresia?.tipo || "free";

  if (isAdmin()) {
    return {
      getContenidoLimitado: () => null,
      canAccessServicio: () => true,
      canAccessContenido: () => true,
      mostrarActualizacionMembresia: () => false,
      getNivelMembresia: () => 99,
      tipoMembresia: "admin",
    };
  }

  const getContenidoLimitado = (typeContent) => {
    if (!permisosConfig[typeContent]) {
      return null;
    }
    const limite = permisosConfig[typeContent][tipoMembresia];
    return limite;
  };

  const canAccessServicio = (typeServicio) => {
    if (!serviciosPagos[typeServicio]) {
      return false;
    }

    const servicioInfo = serviciosPagos[typeServicio];
    return servicioInfo.membresiaRequired.includes(tipoMembresia);
  };

  const canAccessContenido = (typeContent, index) => {
    const limite = getContenidoLimitado(typeContent);
    if(limite === null) return true;
    if (limite === undefined) return false;
    return index < limite;
  }

  
};
