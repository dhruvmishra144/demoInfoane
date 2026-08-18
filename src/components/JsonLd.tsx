/**
 * Renders a JSON-LD block.
 *
 * The `<` escape is not cosmetic: without it, any content containing the string
 * "</script>" would terminate the tag early and turn structured data into an
 * HTML-injection vector.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
