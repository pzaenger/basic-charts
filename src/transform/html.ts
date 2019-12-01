import { Spec } from 'vega';

/**
 * Creates and returns a HTML markup, which contains Vega-Embed rendering the passed Vega specification.
 * @param spec Vega specification.
 * @param title Title.
 * @param theme Theme for Vega-Embed.
 * @returns HTML markup.
 */
export function toHtml(spec: Spec, title: string, theme: 'default' | 'excel' | 'ggplot2' | 'quartz' | 'vox' | 'fivethirtyeight' | 'dark' | 'latimes' | 'urbaninstitute' = 'default'): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
  <meta charset="utf-8">
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@4"></script>
</head>
<body>
  <div id="vis"></div>
  <script type="text/javascript">
    vegaEmbed('#vis', ${JSON.stringify(spec)}, ${JSON.stringify({ theme })}).then((result) => {}).catch(console.error);
  </script>
</body>
</html>`;
}
