// Commonly used classes
export { Chart } from './charts/chart';
export { Barchart } from './charts/barchart';

// Commonly used interfaces
export { IOptions } from './interfaces/options';
export { IValidations } from './interfaces/validations';

// Misc
export { validations } from './utils/validations';

// Shortcuts
// export async function dataToSVG(): Promise<string> {
//   return '';
// }
//
// export async function dataToHTML(): Promise<string> {
//   return '';
// }
//
// export async function dataToDataURL(): Promise<string> {
//   return '';
// }

// (async () => {
//   try {
//     const chart = new Barchart({
//       height: 600,
//       width: 600,
//       padding: 5,
//       theme: 'default',
//       title: 'Chart'
//     });
//
//     const dataURL = await chart.toDataURL();
//     const html = chart.toHTML();
//     const svg = await chart.toSVG();
//
//     console.log(dataURL);
//     console.log(html);
//     console.log(svg);
//   } catch (e) {
//     throw e;
//   }
// })().catch((reason) => console.error(reason));
