export default function Head() {
  return (
    <>
      <meta
        name="google-site-verification"
        content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
      />
      <link rel="canonical" href="https://www.djigeo.mn" />
    </>
  );
}
