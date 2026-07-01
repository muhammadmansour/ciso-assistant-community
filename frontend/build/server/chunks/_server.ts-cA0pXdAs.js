import { B as BASE_API_URL } from './constants-12fjCMiL.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, params }) => {
  const endpoint = `${BASE_API_URL}/accounts/saml/0/download-cert`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the cert");
  }
  const cert = await res.text();
  return new Response(cert, {
    headers: {
      "Content-Type": "application/x-pem-file",
      "Content-Disposition": 'attachment; filename="saml-public-cert.pem"'
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-cA0pXdAs.js.map
