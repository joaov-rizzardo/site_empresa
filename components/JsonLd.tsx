/**
 * Injeta dados estruturados (JSON-LD) no HTML. Server component — o objeto é
 * serializado no servidor e renderizado como <script type="application/ld+json">.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
