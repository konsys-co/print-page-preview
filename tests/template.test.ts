import { PageTemplate } from '../src'

test('Default A4', () => {
  const pages = [
    { content: 'Page 1' },
    { content: 'Page 2' },
    { content: 'Page 3' },
  ]
  const pageTemplate = new PageTemplate(pages)
  const printablePage = pageTemplate.generatePrintablePage()
  expect(printablePage).toMatchSnapshot()
})

test('Different cover page', () => {
  const pages = [
    { content: 'Cover Page', customConfig: { pageSize: 'A5LSC' } },
    { content: 'Page 1' },
    { content: 'Page 2' },
  ]
  const options = {
    title: 'Custom Cover Page',
    heads: '<style>body { font-family: sans-serif; }</style>',
    styles: 'body { background-color: #f0f0f0; }',
  }
  const pageTemplate = new PageTemplate(pages, options)
  const printablePage = pageTemplate.generatePrintablePage({ pageSize: 'A5' })
  expect(printablePage).toMatchSnapshot()
})

test('Custom size page', () => {
  const pages = [
    { content: 'Page 1' },
    { content: 'Page 2' },
    { content: 'Page 3' },
  ]
  const options = {
    title: 'Custom Size Page',
    heads: '<style>body { font-family: sans-serif; }</style>',
    styles: 'body { background-color: #f0f0f0; }',
  }
  const pageTemplate = new PageTemplate(pages, options)
  const printablePage = pageTemplate.generatePrintablePage({ pageSize: 'CUSTOM', width: 200, height: 300 })
  expect(printablePage).toMatchSnapshot()
})

test('Error on custom size page without width and height', () => {
  const pages = [
    { content: 'Custom Size Page', customConfig: { pageSize: 'CUSTOM' } },
    { content: 'Page 1' },
    { content: 'Page 2' },
  ]
  const options = {
    title: 'Custom Size Page',
    heads: '<style>body { font-family: sans-serif; }</style>',
    styles: 'body { background-color: #f0f0f0; }',
  }
  expect(() => new PageTemplate(pages, options)).toThrowError('Custom size must have width and height')
})