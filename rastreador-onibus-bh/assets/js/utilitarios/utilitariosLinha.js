// JA ESTA COMPLETO

export function normalizarCodigoLinha(valor) {
  return String(valor || "")
    .trim()
    .toUpperCase()
    .replaceAll(" ", "");
}

export function obterCodigoBaseLinha(valor) {
  return normalizarCodigoLinha(valor).split("-")[0];
}

function removerZerosIniciais(codigo) {
  return String(Number(codigo));
}

export function obterChavesLinha(valor) {
  const codigo = obterCodigoBaseLinha(valor);

  if (!codigo) return new Set();
  
  return new Set([
    codigo,
    removerZerosIniciais(codigo)
  ]);
}

export function linhasCorrespondem(linhaA, linhaB) {
  const chavesA = obterChavesLinha(linhaA);
  const chavesB = obterChavesLinha(linhaB);

  for (const chave of chavesA) {
    if (chavesB.has(chave)) {
      return true;
    }
  }

  return false;
}

export function ordenarLinhas(linhas) {
  return [...linhas].sort((linhaA, linhaB) =>
    linhaA.codigo.localeCompare(linhaB.codigo, "pt-BR", { numeric: true })
  );
}
