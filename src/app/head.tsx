export default function Head() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.djigeo.mn',
    name: 'Инженер Геодези ХХК — DJI Enterprise Mongolia',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.djigeo.mn/dji?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
