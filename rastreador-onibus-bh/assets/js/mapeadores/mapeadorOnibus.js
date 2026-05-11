// JA TA TOP

import { CONFIGURACOES_APLICACAO } from "../configuracoes/configuracoesAplicacao.js";
import { coordenadasValidas } from "../utilitarios/utilitariosCoordenadas.js";
import { normalizarCodigoLinha } from "../utilitarios/utilitariosLinha.js";

const TAMANHO_MINIMO_HORARIO_API = 14

function formatarHorarioApi(valor) {
  const texto = String(valor || "");

  if (texto.length !== TAMANHO_MINIMO_HORARIO_API) {
    return "Nao informado";
  }

  return `${texto.slice(8, 10)}:${texto.slice(10, 12)}:${texto.slice(12, 14)}`;
}

function obterDataHorarioApi(valor) {
  const texto = String(valor || "");

  if (texto.length !== TAMANHO_MINIMO_HORARIO_API) {
    return null;
  }

  return new Date(
    texto.slice(0, 4),     // ano
    texto.slice(4, 6) - 1, // mes
    texto.slice(6, 8),     // dia
    texto.slice(8, 10),    // hora
    texto.slice(10, 12),   // minuto
    texto.slice(12, 14)    // segundo
  );
}

export function mapearOnibus(registro) {

  const campos = CONFIGURACOES_APLICACAO.camposApi;
  const lat = Number.parseFloat(registro[campos.latitude]);
  const lng = Number.parseFloat(registro[campos.longitude]);
  const veiculo = String(registro[campos.veiculo] ?? "Nao informado");
  const linhaApi = normalizarCodigoLinha(registro[campos.linha]);
  const dataHorario = obterDataHorarioApi(registro[campos.horario]);

  if (!coordenadasValidas(lat, lng)) {
    return null;
  }

  return {
    id: veiculo !== "Nao informado" ? veiculo : `${lat},${lng}`,
    veiculo,
    linha: linhaApi,
    linhaApi,
    lat,
    lng,
    velocidade: Number.parseInt(registro[campos.velocidade] ?? 0, 10) || 0,
    direcao: Number.parseInt(registro[campos.direcao] ?? 0, 10) || 0,
    horario: String(registro[campos.horario] ?? ""),
    horarioMs: dataHorario ? dataHorario.getTime() : 0,
    horarioFormatado: formatarHorarioApi(registro[campos.horario])
  };
}
