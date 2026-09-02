import "server-only";

/**
 * Opaque link IDs → real destinations.
 * Only imported by server code so URLs never ship to the client bundle.
 */
export const PROTECTED_LINKS: Record<string, string> = {
  "mental-health": "https://www.beyondblue.org.au/",
  "financial-service": "https://www.cpf.gov.sg/member",
  "fishing-equipments-ecomm": "https://fish.shimano.com/ja-JP",
  "retirement-income-planning-tool":
    "https://www.challenger.com.au/RWC?step=super-assessment&substep=getting-started",
  "higher-ed-global-search":
    "https://www.search.uwa.edu.au/",
};

export function resolveProtectedLink(id: string): string | null {
  return PROTECTED_LINKS[id] ?? null;
}
