import { B as BASE_API_URL } from './constants-CbUNxZZz.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch }) => {
  const endpoint = `${BASE_API_URL}/serdes/dump-db/`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Error fetching the dump file");
  }
  const fileName = `backup-${(/* @__PURE__ */ new Date()).toISOString()}.bak`;
  return new Response(await res.blob(), {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": `attachment; filename="${fileName}"`
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-BCr2_J3i.js.map
