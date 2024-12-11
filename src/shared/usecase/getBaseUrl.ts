export default function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.PROD_URL)
    // reference for vercel.com
    return `https://${process.env.PROD_URL}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
