import { openBrowserAsync } from "expo-web-browser";
import { Alert } from "react-native";


export const handleMpIntegrations = async () => {
    const preferencia = {
        "items": [{
            "title": "",
            "description": "",
            "quantity": 1,
            "currency_id": "$U",
            "unit_price": 10
     } ],
    }
    try {
        const response = await fetch("https://api.mercadopago.com/checkout/preferences",{
            method: "POST",
            headers: {
                'Authorization': Bearer ``,
                'Content-type': 'application.json'
            },
            body: JSON.stringify(preferencia)
        })
    } catch (error) {
        Alert.alert(error)
    }
}