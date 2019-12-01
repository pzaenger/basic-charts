import { parse, Spec, View } from 'vega';

/**
 * Creates and returns a data URL representing the passed Vega specification.
 * @param spec Vega specification.
 * @param toBase64 True, if encoding within the data URL should be removed.
 * @returns Data URL.
 */
export async function toDataUrl(spec: Spec, toBase64: boolean = false): Promise<string> {
  try {
    const view = await new View(parse(spec), { renderer: 'none' });
    const canvas = await view.toCanvas();
    const dataURL = canvas.toDataURL();
    return toBase64 ? dataURL.replace(/^data:image\/png;base64,/, '') : dataURL;
  } catch (e) {
    throw e;
  }
}
