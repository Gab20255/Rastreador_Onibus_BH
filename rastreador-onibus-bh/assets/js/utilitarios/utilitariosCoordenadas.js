// JA ESTA COMPLETO

import { CONFIGURACOES_APLICACAO } from "../configuracoes/configuracoesAplicacao.js";

export function registrarProjecaoUtm() {
  const { utm, definicaoUtm } = CONFIGURACOES_APLICACAO.projecao;
  window.proj4.defs(utm, definicaoUtm);
}

export function extrairCoordenadasUtm(geometria) {
  const resultado = String(geometria ?? "").match(
    /POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)/i
  );

  if (!resultado) {
    return null;
  }

  return {
    x: Number(resultado[1]),
    y: Number(resultado[2])
  };
}

export function converterUtmParaLatLng(x, y) {
  const { utm, latLng } = CONFIGURACOES_APLICACAO.projecao;
  const [lng, lat] = window.proj4(utm, latLng, [x, y]);

  return { lat, lng };
}

export function coordenadasValidas(lat, lng) {
  return Number.isFinite(lat)
    && Number.isFinite(lng)
    && lat >= -90
    && lat <= 90
    && lng >= -180
    && lng <= 180;
}
