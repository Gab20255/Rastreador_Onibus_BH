// Guarda as configurações Padrões do sistema
export const CONFIGURACOES_APLICACAO = {
    urtApi: "https://corsproxy.io/?url=https://temporeal.pbh.gov.br/?param=D",

    intervaloAtualizacaoMs: 20 * 1000, // 20 segundos

    caminhosCsv: {
        linhas: "assets/data/bhtrans_bdlinhas.csv",
        pontos: "assets/data/20260401_ponto_onibus.csv"
    },

    mapa: {
        centro: [-19.9191, -43.9386],
    },

    marcadorOnibus: {
        raio: 4,
        espessuraBorda: 1,
        opacidadePreenchimento: 0.75
    },

    marcadorPonto: {
        raio: 5,
        espessuraBorda: 2,
        opacidadePreenchimento: 0.85
    },

    marcadorPontoMaisProximo: {
        raio: 8,
        espessuraBorda: 3,
        opacidadePreenchimento: 0.95
    },

    marcadorUsuario: {
        raio: 9,
        espessuraBorda: 3,
        opacidadePreenchimento: 0.9
    }
};

export const CONFIGURACOES_CAMADA_MAPA = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    atribuicao: "&copy; OpenStreetMap contributors"
};
