import { Spec } from 'vega';
import { toDataUrl, toHtml, toSvg } from '../src';

const specs: { barChart: Spec; pieChart: Spec; } = {
  barChart: {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 400,
    height: 200,
    padding: 5,

    data: [
      {
        name: 'table',
        values: [
          { category: 'A', amount: 28 },
          { category: 'B', amount: 55 },
          { category: 'C', amount: 43 },
          { category: 'D', amount: 91 },
          { category: 'E', amount: 81 },
          { category: 'F', amount: 53 },
          { category: 'G', amount: 19 },
          { category: 'H', amount: 87 }
        ]
      }
    ],

    signals: [
      {
        name: 'tooltip',
        value: {},
        on: [
          { events: 'rect:mouseover', update: 'datum' },
          { events: 'rect:mouseout', update: '{}' }
        ]
      }
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        domain: { data: 'table', field: 'category' },
        range: 'width',
        padding: 0.05,
        round: true
      },
      {
        name: 'yscale',
        domain: { data: 'table', field: 'amount' },
        nice: true,
        range: 'height'
      }
    ],

    axes: [
      { orient: 'bottom', scale: 'xscale' },
      { orient: 'left', scale: 'yscale' }
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'xscale', field: 'category' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'amount' },
            y2: { scale: 'yscale', value: 0 }
          },
          update: {
            fill: { value: 'steelblue' }
          },
          hover: {
            fill: { value: 'red' }
          }
        }
      },
      {
        type: 'text',
        encode: {
          enter: {
            align: { value: 'center' },
            baseline: { value: 'bottom' },
            fill: { value: '#333' }
          },
          update: {
            x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
            y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
            text: { signal: 'tooltip.amount' },
            fillOpacity: [
              { test: 'datum === tooltip', value: 0 },
              { value: 1 }
            ]
          }
        }
      }
    ]
  },
  pieChart: {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 200,
    height: 200,
    autosize: 'none',

    signals: [
      {
        name: 'startAngle', value: 0,
        bind: { input: 'range', min: 0, max: 6.29, step: 0.01 }
      },
      {
        name: 'endAngle', value: 6.29,
        bind: { input: 'range', min: 0, max: 6.29, step: 0.01 }
      },
      {
        name: 'padAngle', value: 0,
        bind: { input: 'range', min: 0, max: 0.1 }
      },
      {
        name: 'innerRadius', value: 0,
        bind: { input: 'range', min: 0, max: 90, step: 1 }
      },
      {
        name: 'cornerRadius', value: 0,
        bind: { input: 'range', min: 0, max: 10, step: 0.5 }
      },
      {
        name: 'sort', value: false,
        bind: { input: 'checkbox' }
      }
    ],

    data: [
      {
        name: 'table',
        values: [
          { id: 1, field: 4 },
          { id: 2, field: 6 },
          { id: 3, field: 10 },
          { id: 4, field: 3 },
          { id: 5, field: 7 },
          { id: 6, field: 8 }
        ],
        transform: [
          {
            type: 'pie',
            field: 'field',
            startAngle: { signal: 'startAngle' },
            endAngle: { signal: 'endAngle' },
            sort: { signal: 'sort' }
          }
        ]
      }
    ],

    scales: [
      {
        name: 'color',
        type: 'ordinal',
        domain: { data: 'table', field: 'id' },
        range: { scheme: 'category20' }
      }
    ],

    marks: [
      {
        type: 'arc',
        from: { data: 'table' },
        encode: {
          enter: {
            fill: { scale: 'color', field: 'id' },
            x: { signal: 'width / 2' },
            y: { signal: 'height / 2' }
          },
          update: {
            startAngle: { field: 'startAngle' },
            endAngle: { field: 'endAngle' },
            padAngle: { signal: 'padAngle' },
            innerRadius: { signal: 'innerRadius' },
            outerRadius: { signal: 'width / 2' },
            cornerRadius: { signal: 'cornerRadius' }
          }
        }
      }
    ]
  }
};

describe('Tests for data URL', () => {
  test('Testing for valid data URLs', async () => {
    try {
      const barChart = await toDataUrl(specs.barChart);
      const pieChart = await toDataUrl(specs.pieChart, true);

      expect(barChart).toBeDefined();
      expect(barChart).toContain('data:image\/png;base64,');

      expect(pieChart).toBeDefined();
      expect(pieChart).not.toContain('data:image\/png;base64,');
    } catch (e) {
      throw e;
    }
  });

  test('Testing for not throwing errors', () => {
    expect(async () => await toDataUrl(specs.barChart)).not.toThrow();
    expect(async () => await toDataUrl(specs.pieChart)).not.toThrow();
  });
});

describe('Tests for HTML', () => {
  test('Testing for valid HTML markups', () => {
    const barChart = toHtml(specs.barChart, 'Bar Chart', 'default');
    const pieChart = toHtml(specs.pieChart, 'Pie Chart', 'latimes');

    expect(barChart).toBeDefined();
    expect(barChart).toContain('<title>Bar Chart</title>');
    expect(barChart).toContain(JSON.stringify(specs.barChart));
    expect(barChart).toContain(JSON.stringify({ theme: 'default' }));

    expect(pieChart).toBeDefined();
    expect(pieChart).toContain('<title>Pie Chart</title>');
    expect(pieChart).toContain(JSON.stringify(specs.pieChart));
    expect(pieChart).toContain(JSON.stringify({ theme: 'latimes' }));
  });
});

describe('Tests for SVG', () => {
  test('Testing for valid SVG strings', async () => {
    try {
      const barChart = await toSvg(specs.barChart);
      const pieChart = await toSvg(specs.pieChart);

      expect(barChart).toBeDefined();
      expect(barChart).toContain('<svg');
      expect(barChart).toContain('</svg>');

      expect(pieChart).toBeDefined();
      expect(pieChart).toContain('<svg');
      expect(pieChart).toContain('</svg>');
    } catch (e) {
      throw e;
    }
  });

  test('Testing for not throwing errors', () => {
    expect(async () => await toSvg(specs.barChart)).not.toThrow();
    expect(async () => await toSvg(specs.pieChart)).not.toThrow();
    expect(async () => await toSvg({})).not.toThrow();
  });
});
