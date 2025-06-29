import React from "react";
import { IDomain } from "../interfaces";

type DomainListProps = {
  loading: boolean;
  error: string;
  domains: IDomain[];
};

const DomainList: React.FC<DomainListProps> = ({ loading, error, domains }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div style={{ marginLeft: "1rem" }}>
      <h2 className="text-xl font-bold mb-4">Domain List</h2>
      <ul style={{ paddingLeft: "1rem" }}>
        {domains?.map((domain) => (
          <li key={domain.id}>{domain.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;
