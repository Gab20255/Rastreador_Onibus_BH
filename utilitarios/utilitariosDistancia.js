const RAIO_TERRA_METROS = 6371000;

function grausParaRadianos(valor) {
  return valor * Math.PI / 180;
}

export function calcularDistanciaMetros(origem, destino) {
  const diferencaLat = grausParaRadianos(destino.lat - origem.lat);
  const diferencaLng = grausParaRadianos(destino.lng - origem.lng);
  const latOrigem = grausParaRadianos(origem.lat);
  const latDestino = grausParaRadianos(destino.lat);

  const a = Math.sin(diferencaLat / 2) ** 2
    + Math.cos(latOrigem) * Math.cos(latDestino)
    * Math.sin(diferencaLng / 2) ** 2;

  return 2 * RAIO_TERRA_METROS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatarDistancia(metros) {
  if (!Number.isFinite(metros)) {
    return "";
  }

  if (metros < 1000) {
    return `${Math.round(metros)} m`;
  }

  return `${(metros / 1000).toFixed(2).replace(".", ",")} km`;
}
