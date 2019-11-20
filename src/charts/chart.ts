import { parse, View } from 'vega';
import { IOptions, validations } from '..';

export abstract class Chart {

  private static validate(options: IOptions): IOptions {

    for (const key in options) {
      if (options.hasOwnProperty(key) && validations.schemas.hasOwnProperty(key)) {
        const option = options[key];
        const schema = validations.schemas[key];
        const result = validations.validate(option, schema);
      }
    }

    return options;
  }

  public readonly options: IOptions;

  private readonly spec: any;

  private view: View;

  protected constructor(options: IOptions, spec: any) {
    this.options = Chart.validate(options);
    this.spec = spec;
  }

  public async toDataURL(toBase64: boolean = false): Promise<string> {
    try {
      const view = this.getView();
      const canvas = await view.toCanvas();
      const dataURL = canvas.toDataURL();
      return toBase64 ? dataURL.replace(/^data:image\/png;base64,/, '') : dataURL;
    } catch (e) {
      throw e;
    }
  }

  public async toSVG(): Promise<string> {
    try {
      const view = this.getView();
      return await view.toSVG();
    } catch (e) {
      throw e;
    }
  }

  public toHTML(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${this.options.title}</title>
  <meta charset="utf-8">
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@4"></script>
</head>
<body>
  <div id="vis"></div>
  <script type="text/javascript">
    vegaEmbed('#vis', ${JSON.stringify(this.spec)}, ${JSON.stringify({ theme: this.options.theme })}).then((result) => {}).catch(console.error);
  </script>
</body>
</html>
    `.trim();
  }

  private getView(): View {
    return this.view ? this.view : (this.view = new View(parse(this.spec), { renderer: 'none' }));
  }
}
