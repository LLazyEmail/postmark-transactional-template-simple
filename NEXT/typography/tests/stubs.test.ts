import {
  button,
  heading,
  image,
  imageLink,
  italic,
  link,
  list,
  listItem,
  mainTitle,
  mainTitleImage,
  paragraph,
  paragraphComponentUpdated,
  separator,
  strong,
  subtitle,
} from '../src/index';

type ComponentFn = () => string;

const cases: [ComponentFn, string][] = [
  [button, 'button'],
  [heading, 'heading'],
  [image, 'image'],
  [imageLink, 'imageLink'],
  [italic, 'italic'],
  [link, 'link'],
  [list, 'list'],
  [listItem, 'listItem'],
  [mainTitle, 'mainTitle'],
  [mainTitleImage, 'mainTitleImage'],
  [paragraph, 'paragraph'],
  [paragraphComponentUpdated, 'paragraphComponentUpdated'],
  [separator, 'separator'],
  [strong, 'strong'],
  [subtitle, 'subtitle'],
];

cases.forEach(([fn, expected]) => {
  const actual = fn();
  if (actual !== expected) {
    throw new Error(`${fn.name} should return "${expected}", got "${actual}"`);
  }
  console.log(`ok — ${fn.name}() -> "${actual}"`);
});

console.log(`\nAll ${cases.length} stub components returned their own name correctly.`);
