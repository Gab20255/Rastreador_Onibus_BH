// JA ESTA COMPLETO

import { CONFIGURACOES_APLICACAO } from "../configuracoes/configuracoesAplicacao.js";
import { mapearOnibus } from "../mapeadores/mapeadorOnibus.js";

function obterTimestampOnibus(onibus) {
  return onibus.horarioMs || 0;
}

function deduplicarOnibusPorVeiculo(onibus) {
  const onibusPorVeiculo = new Map();

  onibus.forEach((item) => {
    const existente = onibusPorVeiculo.get(item.veiculo);

    if (!existente || obterTimestampOnibus(item) > obterTimestampOnibus(existente)) {
      onibusPorVeiculo.set(item.veiculo, item);
    }
  });

  return [...onibusPorVeiculo.values()];
}

function aplicarMapaLinhas(onibus, mapaNumeroLinha) {
  return onibus.map((item) => ({
    ...item,
    linha: mapaNumeroLinha.get(item.linhaApi) ?? item.linhaApi
  }));
}

function filtrarPosicoesRecentes(onibus) {
  const agora = Date.now();
  const idadeMaximaMs = CONFIGURACOES_APLICACAO.idadeMaximaPosicaoMinutos * 60 * 1000;

  return onibus.filter((item) =>
    item.horarioMs && agora - item.horarioMs <= idadeMaximaMs
  );
}

async function buscarDadosEmUrl(url) {
  const controlador = new AbortController();

  const temporizador = setTimeout(() => {
    controlador.abort();
  }, CONFIGURACOES_APLICACAO.tempoLimiteApiMs);

  const resposta = await fetch(url, {
    signal: controlador.signal,
    cache: "no-store"
  });

  clearTimeout(temporizador);


  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }

  const dados = await resposta.json();

  const listaOnibus = Array.isArray(dados)
    ? dados
    : JSON.parse(dados.contents);

  return listaOnibus
    .map(mapearOnibus)
    .filter(Boolean);
}

export async function buscarOnibusAtivos(mapaNumeroLinha = new Map()) {
  const urls = [
    CONFIGURACOES_APLICACAO.urlApi,
    ...CONFIGURACOES_APLICACAO.urlsApiAlternativas
  ];
  const erros = [];

  for (const url of urls) {
    try {
      const onibus = await buscarDadosEmUrl(url);
      return aplicarMapaLinhas(
        filtrarPosicoesRecentes(deduplicarOnibusPorVeiculo(onibus)),
        mapaNumeroLinha
      );
    } catch (erro) {
      erros.push(erro.message);
    }
  }

  throw new Error(erros.join(" | "));
}
