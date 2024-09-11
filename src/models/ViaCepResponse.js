export default class ViaCepAddress {
        cep;
        logradouro;
        complemento;
        unidade;
        bairro;
        localidade;
        uf;
        estado;
        regiao;
        ibge;
        gia;
        ddd;
        siafi;
    constructor()(
        cep,
        logradouro,
        complemento,
        unidade,
        bairro,
        localidade,
        uf,
        estado,
        regiao,
        ibge,
        gia,
        ddd,
        siafi
    ) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.complemento = complemento;
        this.unidade = unidade;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
        this.estado = estado;
        this.regiao = regiao;
        this.ibge = ibge;
        this.gia = gia;
        this.ddd = ddd;
        this.siafi = siafi;
    }
    constructor( error ) {
        this.error = error
    }
};

