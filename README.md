# Print Page Preview

A template module to generate printable HTML pages of varying sizes.

## Usage

```ts
import { PageTemplate } from "@konsys.co/print"

const pages = [
  { content: "<h1>Cover Page</h1>", customConfig: { pageSize: 'A4' } },
  { content: "Page 2", customConfig: { pageSize: 'A4LSC' } },
  { content: "Page 3", customConfig: { pageSize: 'A4LSC' } },
]
const pageTemplate = new PageTemplate(pages)
const html = pageTemplate.generatePrintablePage()
```

The above will generate 3 HTML pages:
- The first page will be A4 portrait.
- The next two pages will be A4 landscape.

## API Reference

### `new PageTemplate(pages, options?)`

Create a new printable page template.

#### Arguments

- `pages` (Array):  
  List of page objects, each with:
  - `content`: (string) HTML string for that page.
  - `customConfig` (optional):  
    ```ts
    {
      pageSize: 'A4' | 'A4LSC' | 'A5' | 'A5LSC' | 'CUSTOM' | string,
      width?: number, // mm (required for CUSTOM)
      height?: number // mm (required for CUSTOM)
    }
    ```
    If omitted, the default size (or the value you pass to `generatePrintablePage`) is used for that page.

- `options` (Object, optional):
  - `title`: (string) Sets the `<title>` of the HTML page. Default: 'No Title'.
  - `heads`: (string) Inject raw HTML into `<head>`. Useful for extra meta tags or styles.
  - `styles`: (string) Additional CSS styles to add.
  - `fontFamily`: (string) Font for all pages (default: Arial, Helvetica, sans-serif).
  - `enableAutoPrint`: (boolean) Whether to auto-invoke the browser's print dialog on load (default: `false`).

---

### `generatePrintablePage(defaultConfig?)`

Generate the full printable preview HTML for your pages.

- `defaultConfig` (Object, optional):  
  Fallback config used for pages missing `customConfig`. Same structure as above.

- **Returns**: (string) The assembled HTML document (including head, CSS, and page content).

---

## Extended Example

```ts
import { PageTemplate } from "@konsys.co/print"

const pages = [
  { content: "<h1>Cover Page (A5 landscape)</h1>", customConfig: { pageSize: 'A5LSC' } },
  { content: "<div>Second Page (A4 portrait)</div>", customConfig: { pageSize: 'A4' } },
  { content: "<div>Third Page (custom 200x300mm)</div>", customConfig: { pageSize: 'CUSTOM', width: 200, height: 300 } }
]

const options = {
  title: "Document Example",
  heads: '<meta name="author" content="Your Name">',
  styles: "body { background: #eee; }",
  fontFamily: "Times New Roman",
  enableAutoPrint: true
}

const pageTemplate = new PageTemplate(pages, options)
const html = pageTemplate.generatePrintablePage({ pageSize: 'A4' })

// html can be directly written to a file or served for printing.
```

---

## Notes

- Each page can have its own size; if not specified, the default is used.
- CSS for print and preview is included (outlines, margins, shadows, etc. for clarity).
- With `CUSTOM` size, **both** `width` and `height` are required (in millimeters).
- Use the `styles` option to add custom CSS to all pages.
- The output HTML is a full document suitable for printing or PDF export.

---
