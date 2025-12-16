type PageSize = 'A4' | 'A4LSC' | 'A5' | 'A5LSC' | 'CUSTOM'

type PageConfig = {
  pageSize: PageSize | string
  width?: number
  height?: number
}

const getWidthHeight = (config: PageConfig): { width: number, height: number } => {
  const { pageSize, width, height } = config
  switch (pageSize) {
    case 'A4' :
      return { width: 210, height: 297 }
    case 'A4LSC' :
      return { width: 297, height: 210 }
    case 'A5' :
      return { width: 148, height: 210 }
    case 'A5LSC' :
      return { width: 210, height: 148 }
    case 'CUSTOM' :
      if (!width || !height) throw new Error('Custom size must have width and height')
      return { width, height }
    default :
      return { width: 210, height: 297 }
  }
}

class PageTemplate {
  pages: { content: string, customWidth?: number, customHeight?: number }[]
  title: string
  heads: string
  styles: string
  fontFamily: string
  constructor(
    pages: { content: string, customConfig?: PageConfig }[],
    options: { title?: string, heads?: string, styles?: string, fontFamily?: string } = {}
  ) {
    this.pages = pages.map(page => {
      const { content, customConfig } = page
      if (customConfig) {
        const { width, height } = getWidthHeight(customConfig)
        return { content, customWidth: width, customHeight: height }
      }
      return { content }
    })
    this.title = options.title || 'No Title'
    this.heads = options.heads || ''
    this.styles = options.styles || ''
    this.fontFamily = options.fontFamily || 'Arial, Helvetica, sans-serif'
  }

  public generatePrintablePage(defaultConfig: PageConfig = { pageSize: 'A4' }) {
    const { width, height } = getWidthHeight(defaultConfig)
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${this.title}</title>
    ${this.heads}
    <style>
      :root {
        --bleeding: 1cm;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0 auto;
        padding: 0;
        background: rgb(204, 204, 204);
        display: flex;
        flex-direction: column;
      }
      b {
        font-weight: 600;
      }
      .page {
        display: inline-block;
        position: relative;
        margin: 2em auto;
        padding: var(--bleeding);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
        background: white;
        font-family: ${this.fontFamily};
      }
      ${
        this.pages.map((page, i) => `
        @page page-${i} {
          size: ${page.customWidth || width}mm ${page.customHeight || height}mm;
          margin: 0;
        }
        .page-${i} {
          width: ${page.customWidth || width}mm;
          height: ${page.customHeight || height}mm;
        }
        `
        ).join('')
      }
      @media screen {
        .page::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: calc(100% - var(--bleeding) * 2);
          height: calc(100% - var(--bleeding) * 2);
          margin: var(--bleeding);
          outline: thin dashed rgba(0, 0, 0, 0.2);
          pointer-events: none;
          z-index: 9999;
        }
      }
      @media print {
        .page {
          margin: 0;
          overflow: hidden;
        }
        ${
          this.pages.map((_, i) => `
          .page-${i} {
            page: page-${i};
          }
          `
          ).join('')
        }
      }
      ${this.styles}
    </style>
  </head>
  <body>
    ${this.pages.map((page, i) => `<div class="page page-${i}">${page.content}</div>`).join('')}
  </body>
</html>
    `
  }
}

export { PageTemplate }