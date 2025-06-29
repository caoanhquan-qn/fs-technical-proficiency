import React from "react";
import { IDomain } from "../interfaces";

type DomainListProps = {
  loading: boolean;
  error: string;
  domains: IDomain[];
  onDomainSelect?: (domainName: string) => void;
  selectedDomain?: string | null;
};

const DomainList: React.FC<DomainListProps> = ({
  loading,
  error,
  domains,
  onDomainSelect,
  selectedDomain,
}) => {
  const displayDomains = (domains: IDomain[]) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
      <ul style={{ paddingLeft: "1rem" }}>
        {domains?.map((domain) => (
          <li key={domain.id}>
            <button
              type="button"
              onClick={() => onDomainSelect?.(domain.name)}
              className="text-left w-full"
              style={{
                background: selectedDomain === domain.name ? "#e3f2fd" : "none",
                border:
                  selectedDomain === domain.name ? "1px solid #2196f3" : "none",
                borderRadius: selectedDomain === domain.name ? "4px" : "0",
                padding: selectedDomain === domain.name ? "4px 8px" : 0,
                margin: 0,
                cursor: "pointer",
              }}
            >
              {domain.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <h2 className="text-xl font-bold mb-4">Domain List</h2>
      {domains && displayDomains(domains)}
    </div>
  );
};

export default DomainList;
