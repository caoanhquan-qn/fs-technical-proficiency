import React, { useState } from "react";
import AddNewDomainForm from "../../components/AddNewDomainForm";
import DomainList from "../../components/DomainList";
import useDomainList from "../../api/useDomainList";
import DomainDetails from "../../components/DomainDetails";

export default function Dashboard() {
  const { loading, error, domains, fetchDomains } = useDomainList();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleDomainSelect = (domainName: string) => {
    setSelectedDomain(domainName);
  };

  return (
    <div>
      <AddNewDomainForm onDomainAdded={fetchDomains} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <DomainList
          loading={loading}
          domains={domains}
          error={error}
          onDomainSelect={handleDomainSelect}
          selectedDomain={selectedDomain}
        />
        <DomainDetails domainName={selectedDomain} />
      </div>
    </div>
  );
}
