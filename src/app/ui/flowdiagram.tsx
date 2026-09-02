type FlowStepsProps = {
  steps: string[];
};

export function FlowSteps({ steps }: FlowStepsProps) {
  return (
    <div className="markdown-flow" role="list" aria-label="Process flow">
      {steps.map((step, index) => (
        <div key={step} className="markdown-flow-step" role="listitem">
          <span className="markdown-flow-box">{step}</span>
          {index < steps.length - 1 && (
            <span className="markdown-flow-arrow" aria-hidden="true">
              ↓
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

type FlowPairsProps = {
  pairs: [string, string][];
  destination?: string;
};

type SystemContentRow = {
  system: string;
  contentTypes: string[];
};

export function SystemContentMap({ rows }: { rows: SystemContentRow[] }) {
  return (
    <div
      className="markdown-flow markdown-system-map"
      aria-label="Systems mapped to content types"
    >
      <div className="markdown-system-map-header" aria-hidden="true">
        <span>System</span>
        <span>Content types</span>
      </div>
      {rows.map(({ system, contentTypes }) => (
        <div key={system} className="markdown-flow-row markdown-system-map-row">
          <span className="markdown-flow-box markdown-system-map-system">
            {system}
          </span>
          <span className="markdown-flow-connector" aria-hidden="true">
            →
          </span>
          <div className="markdown-system-map-targets">
            {contentTypes.map((contentType) => (
              <span
                key={contentType}
                className="markdown-flow-box markdown-flow-box-muted"
              >
                {contentType}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlowPairs({ pairs, destination }: FlowPairsProps) {
  return (
    <div className="markdown-flow" aria-label="Content ingestion flow">
      {pairs.map(([source, method]) => (
        <div key={source} className="markdown-flow-row">
          <span className="markdown-flow-box">{source}</span>
          <span className="markdown-flow-connector" aria-hidden="true">
            →
          </span>
          <span className="markdown-flow-box markdown-flow-box-muted">
            {method}
          </span>
        </div>
      ))}
      {destination && (
        <div className="markdown-flow-step">
          <span className="markdown-flow-arrow" aria-hidden="true">
            ↓
          </span>
          <span className="markdown-flow-box markdown-flow-box-highlight">
            {destination}
          </span>
        </div>
      )}
    </div>
  );
}

export function parseFlowSteps(content: string): string[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseFlowPairs(
  content: string
): { pairs: [string, string][]; destination?: string } {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const pairs: [string, string][] = [];
  let destination: string | undefined;

  for (const line of lines) {
    if (line.includes("→")) {
      const [source, method] = line.split("→").map((part) => part.trim());
      if (source && method) {
        pairs.push([source, method]);
      }
      continue;
    }

    destination = line;
  }

  return { pairs, destination };
}

export function parseSystemContentMap(content: string): SystemContentRow[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [system, contentTypesText] = line.split("|").map((part) => part.trim());
      const contentTypes = contentTypesText
        ? contentTypesText.split(",").map((part) => part.trim()).filter(Boolean)
        : [];

      return { system: system ?? "", contentTypes };
    })
    .filter((row) => row.system && row.contentTypes.length > 0);
}
