# Catalog

Every entry is a function from props to `HtmlString`, except `separatorComponent`, whose props are optional.

| Key | Props | Notes |
|---|---|---|
| `headingComponent` | `{ content }` | `<h3 class="mc-toc-title">` |
| `titleComponent` | `{ content }` | `<h1 class="mc-toc-title">` |
| `subtitleComponent` | `{ content }` | `<p><span><span><strong>` |
| `paragraphComponent` | `{ content }` | paragraph, no image |
| `paragraphComponentUpdated` | `{ content, src, altText? }` | paragraph plus an image |
| `strongComponent` | `{ content }` | `<strong>` |
| `italicComponent` | `{ content }` | italic text |
| `imageComponent` | `{ src, altText? }` | image |
| `imageLinkedComponent` | `{ src, altText? }` | linked image |
| `mainTitleImageComponent` | `{ src, altText? }` | same shape as image |
| `buttonComponent` | `{ href, content }` | `<a class="mlContentButton">` |
| `linkComponent` | `{ href, content }` | `<a target="_blank">` |
| `separatorComponent` | `{ src?, altText? }` optional | divider |
| `listComponent` | `{ content }` | `<ul>`; content is already joined items |
| `listItemComponent` | `{ content }` | `<li><p>` |

`atoms` is still `{ text, link, image, spacer, divider }` with `unknown` values. Do not treat it as a finished contract.
