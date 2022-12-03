import {CreateEstablishmentDto} from "../dto/create-establishment.dto";

export const EstablishmentCreateStub = (): CreateEstablishmentDto => {
    return {
        address: {
            complement: "Casa 2",
            country: "BR",
            neighborhood: "Vila Industrial",
            number: "150",
            state: "SP",
            city: "São Paulo",
            street: "Rua Betânia",
            zipCode: "03253060"
        },
        carVacancies: 10,
        cnpj: '21690613000178',
        motorcycleVacancies: 10,
        name: 'Estacionamento João da Silva',
        phone: '41996719612',
    }
}
