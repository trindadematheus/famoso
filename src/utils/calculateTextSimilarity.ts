export function calculateTextSimilarity(
  lyrics: string,
  textSung: string
): number {
  const originalWords = lyrics.toLowerCase().split(/\s+/);
  const sungWords = textSung.toLowerCase().split(/\s+/);

  const originalSet = new Set(originalWords);
  const sungSet = new Set(sungWords);

  const intersec = new Set(
    [...originalSet].filter((palavra) => sungSet.has(palavra))
  );
  const union = new Set([...originalSet, ...sungSet]);

  const tamanhoIntersecao = intersec.size;
  const tamanhoUniao = union.size;

  const percent = (tamanhoIntersecao / tamanhoUniao) * 100;

  return Math.round(percent);
}
