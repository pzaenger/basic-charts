import { Barchart, Chart, IOptions, validations } from '../src';

describe('Common tests', () => {

  test('Create a valid bar chart', () => {
    const options: IOptions = { height: 600, width: 500, padding: 5, theme: 'default', title: 'Chart' };
    const chart = new Barchart(options);

    expect(chart).toBeDefined();
    expect(chart).toBeInstanceOf(Barchart);

    for (const key in chart.options) {
      if (chart.options.hasOwnProperty(key) && options.hasOwnProperty(key)) {
        expect(chart.options[key]).toEqual(options[key]);
      }
    }
  });

  test('Create an invalid bar chart by invalid height', () => {
    expect(() => {
      const chart = new Barchart({
        height: 0,
        width: 600,
        padding: 5,
        theme: 'default',
        title: 'Chart'
      });
    }).toThrow();
  });

  test('Create an invalid bar chart by invalid theme', () => {
    expect(() => {
      const chart = new Barchart({
        height: 500,
        width: 600,
        padding: 5,
        theme: 'motley',
        title: 'Chart'
      });
    }).toThrow();
  });

  test('Validate validation of title', () => {
    for (const value of ['', ' ', 0, undefined, null]) {
      expect(() => validations.validate(value, validations.schemas.title)).toThrow();
    }
    for (const value of ['Chart']) {
      expect(() => validations.validate(value, validations.schemas.title)).not.toThrow();
    }
  });

});
