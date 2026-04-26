import { B as BASE_API_URL } from './constants-B8vm30bZ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-B_ICGJZJ.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, url, params }) => {
  const URLModel = "loaded-libraries";
  const endpoint = `${BASE_API_URL}/${URLModel}/${params.id}/`;
  const contentEndpoint = `${BASE_API_URL}/${URLModel}/${params.id}/content/`;
  const [res, contentRes] = await Promise.all([fetch(endpoint), fetch(contentEndpoint)]);
  if (!res.ok) error(res.status, await res.json());
  if (!contentRes.ok) error(contentRes.status, await contentRes.json());
  const data = await res.json();
  const content = await contentRes.json();
  data.objects = content;
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-1YD1Xwlg.js.map
