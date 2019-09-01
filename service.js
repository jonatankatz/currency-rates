const config = {
    ExRateDefault: "https://api.exchangeratesapi.io/latest?base=USD",
    ExRatesByCurrency: "https://api.exchangeratesapi.io/latest?base"
}


const api = {
    getRates: () => {
        return $.ajax({
            url:`${config.ExRateDefault}`,
            method: "GET"
        })
    },
    getBaseRates: (code) => {
        return $.ajax({
            url:`${config.ExRatesByCurrency}=${code}`,
            method:"GET"
        })
    }
}

