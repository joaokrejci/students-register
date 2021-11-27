import { render, cleanup } from "@testing-library/react";
import Text from "./index";

describe("Text variants and sizes make sense", () => {
  afterEach(cleanup);

  it("Tags and classNames are different", () => {
    const { getByText } = render(
      <>
        <Text variant="title">Title</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="normal">Normal</Text>
        <Text variant="label">Label</Text>
      </>
    );

    const tags = {
      title: getByText(/Title/i),
      caption: getByText(/Caption/i),
      normal: getByText(/Normal/i),
      label: getByText(/Label/i),
    };

    const compare = (tag1: HTMLElement, tag2: HTMLElement) =>
      tag1.tagName !== tag2.tagName || tag1.className !== tag2.className;

    expect(compare(tags.title, tags.caption)).toBeTruthy();
    expect(compare(tags.title, tags.normal)).toBeTruthy();
    expect(compare(tags.title, tags.label)).toBeTruthy();
    expect(compare(tags.caption, tags.normal)).toBeTruthy();
    expect(compare(tags.caption, tags.label)).toBeTruthy();
    expect(compare(tags.normal, tags.label)).toBeTruthy();
  });

  it("Sizes make sense", () => {
    const { getByText } = render(
      <>
        <Text size="large">Large</Text>
        <Text size="normal">Normal</Text>
        <Text size="small">Small</Text>
      </>
    );

    const tags = {
      large: getByText(/Large/i),
      normal: getByText(/Normal/i),
      small: getByText(/Small/i),
    };

    expect(parseFloat(tags.large.style.fontSize)).toBeGreaterThan(
      parseFloat(tags.normal.style.fontSize)
    );

    expect(parseFloat(tags.normal.style.fontSize)).toBeGreaterThan(
        parseFloat(tags.small.style.fontSize)
      );
  });
});
