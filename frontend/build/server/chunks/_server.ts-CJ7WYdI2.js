import { B as BASE_API_URL } from './constants-QzmVibOJ.js';
import { e as error } from './index-BWA_9C9m.js';
import './shared-server-BU2DVf8Q.js';
import './runtime-BKo9q3Zd.js';
import './utils-FiC4zhrQ.js';

const GET = async ({ fetch, url }) => {
  const operationalScenarioId = url.searchParams.get("operational_scenario");
  const endpoint = `${BASE_API_URL}/ebios-rm/operating-modes/default_ref_id/?operational_scenario=${operationalScenarioId}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    error(400, "Failed to fetch default ref_id");
  }
  const logo = await res.json();
  return new Response(JSON.stringify(logo), {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-CJ7WYdI2.js.map
