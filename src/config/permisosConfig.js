const membresiaLevels = {
  basico: 1,
  intermedio: 2,
  premium: 3,
};

const permisosConfig = {
  biblioteca: {
    basico: 5,
    intermedio: null,
    premium: null,
  },
  duelo: {
    basico: 3,
    intermedio: null,
    premium: null,
  },
  guias: {
    basico: 3,
    intermedio: null,
    premium: null,
  },
  podcast: {
    basico: 3,
    intermedio: null,
    premium: null,
  },

  test: {
    basico: 2,
    intermedio: 5,
    premium: null,
  },
  categories: {
    basico: 3,
    intermedio: null,
    premium: null,
  },
  blog: {
    basico: {
      readPosts: true,
      readComments: true,
      writeComments: true,
      deleteOwnComments: true,
      sendPrivateMessages: false,
    },
    intermedio: {
      readPosts: true,
      readComments: true,
      writeComments: true,
      deleteOwnComments: true,
      sendPrivateMessages: false,
    },
    premium: {
      readPosts: true,
      readComments: true,
      writeComments: true,
      deleteOwnComments: true,
      sendPrivateMessages: true,
    },
  },
};

const serviciosPagos = {
  talleres: {
    visibleAll: true,
    membresiaRequired: ["premium"],
    requierePago: ["basico", "intermedio"],
    beneficioPremium: "1 taller gratis incluido",
  },
  orientaciones: {
    visibleAll: true,
    membresiaRequired: ["premium"],
    requierePago: ["basico", "intermedio"],
    beneficioPremium: "1 orientación gratis incluida",
  },
  citas: {
    visibleAll: true,
    membresiaRequired: [],
    requierePago: ["basico", "intermedio", "premium"],
    beneficioPremium: null,
  },
};

const requisitoMembresia = (userLevel, requiredLevel) => {
  const userLevelNum = membresiaLevels[userLevel] || 0;
  const requiredLevelNum = membresiaLevels[requiredLevel] || 0;
  return userLevelNum >= requiredLevelNum;
};

const getSiguienteNivel = (currentLevel) => {
  const currentNum = membresiaLevels[currentLevel] || 0;
  const siguienteNivel = Object.entries(membresiaLevels)
    .filter(([_, value]) => value > currentNum)
    .sort(([_, a], [__, b]) => a - b);

  return siguienteNivel.length > 0 ? siguienteNivel[0][0] : null;
};

const getInfoPlan = (tipoPlan) => {
  const planes = {
    basico: {
      nombre: "basico",
      precio: "Gratis",
      descripcion: "Acceso limitado a contenido básico",
    },
    intermedio: {
      nombre: "intermedio",
      precio: "18€/mes",
      precioSemestral: "70€ (11.67€/mes)",
      precioAnual: "100€ (8.33€/mes)",
      descripcion: "Mayor parte del contenido desbloqueado",
    },
    premium: {
      nombre: "premium",
      precio: "150€/año (12.50€/mes)",
      descripcion: "Acceso completo + 1 taller y 1 orientación gratis",
    },
  };
  return planes[tipoPlan] || null;
};

module.exports = {
  membresiaLevels,
  permisosConfig,
  serviciosPagos,
  requisitoMembresia,
  getSiguienteNivel,
  getInfoPlan,

  
};
