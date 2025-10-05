import { useSelector } from "react-redux";

export const useAuth = () => {
  const authState = useSelector((state) => state.auth.value);

  const {
    user,
    idToken,
    localId,
    imageCamera,
    name,
    lastName,
    role,
    membresia,
  } = authState;

  const isAuthenticated = () => {
    return !!user && !!idToken;
  };
  const isAdmin = () => {
    return role === "admin";
  };

  const isMembresiaActive = () => {
    if (membresia?.estado !== "active") return false;
    if(membresia?.fechaFin){
      return new Date(membresia.fechaFin) > new Date();
    }
    return true;
  };
  
  const tipoMembresia = () => {
    return membresia?.tipo || null;
  };
  
  const membresiaExpired = () => {
    if(!membresia?.fechaFin) return false;
    return new Date(membresia.fechaFin) < new Date();
  }

  const diasRestantesMembresia = () => {
    if (!membresia?.fechaFin) return null;
    const ahora = new Date();
    const finalMembresia = new Date(membresia.fechaFin);
    const diferencia = finalMembresia - ahora;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };


  return {
    user,
    idToken,
    localId,
    imageCamera,
    name,
    lastName,
    role,
    membresia,

    isAuthenticated,
    isAdmin,

    isMembresiaActive,
    tipoMembresia,
    membresiaExpired,
    diasRestantesMembresia,
  };
};
