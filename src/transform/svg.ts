import { parse, Spec, View } from 'vega';

/**
 * Creates and returns a SVG containing the passed Vega specification.
 * @param spec Vega specification.
 * @returns SVG.
 */
export async function toSvg(spec: Spec): Promise<string> {
  try {
    return (await new View(parse(spec), { renderer: 'none' })).toSVG();
  } catch (e) {
    throw e;
  }
}
