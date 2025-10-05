const membresiaLevels = {
    free: 1,
    premium: 2,
    superPremium: 3,
}

const permisosConfig = {
    recursos: {
        free: 3,
        premium: null,
        superPremium: null
    },
    test: {
        free: 3,
        premium: null,
        superPremium: null
    },
    podcast: {
        free: 3,
        premium: null,
        superPremium: null
    }


}

const serviciosPagos = {
    talleres: {
        visibleAll: true,
        membresiaRequired: ['superPremium']
    },
    asesorias: {
        visibleAll: true,
        membresiaRequired: ['superPremium']
    },
    guias: {
        visibleAll: true,
        membresiaRequired: ['superPremium']
    }
}

const requisitoMembresia = (userLevel, requiredLevel) => {
    return membresiaLevels[userLevel] >= membresiaLevels[requiredLevel];
}

exports = {
    membresiaLevels,
    permisosConfig,
    serviciosPagos,
    requisitoMembresia
};