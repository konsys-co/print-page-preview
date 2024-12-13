# Print Page Preview

Template module to generate printable page in HTML.

## Usage

```ts
import { PageTemplate } from "@konsys/print"
const coverPageContent = "<h1>Cover Page</h1>"
const pages = [
  { content: coverPageContent, customConfig: { pageSize: 'A4' } }
  { content: "Page 2" },
  { content: "Page 3" },
]
const pageTemplate = new PageTemplate(pages)
const html = pageTemplate.generatePrintablePage({ pageSize: 'A4LSC' })
```

For this example, we will get the html of 3 pages. The first page will be in A4 portrait. And the others will be in A4 landscape.