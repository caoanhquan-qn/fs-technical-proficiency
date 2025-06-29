import React from "react";
import useDomainList from "../api/useDomainList";

const DomainList: React.FC = () => {
  const { loading, error, domains } = useDomainList();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div style={{ marginLeft: "1rem" }}>
      <h2 className="text-xl font-bold mb-4">Domain List</h2>
      <ul style={{ paddingLeft: "1rem" }}>
        {domains?.map((domain) => (
          <li key={domain.name}>{domain.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;
