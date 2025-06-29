import React, { useState, useEffect } from "react";
import AddNewDomainForm from "../../components/AddNewDomainForm";
import DomainList from "../../components/DomainList";
import useDomainList from "../../api/useDomainList";
import DomainDetails from "../../components/DomainDetails";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { loading, error, domains, fetchDomains } = useDomainList();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Set selectedDomain to first domain when domains are loaded
  useEffect(() => {
    if (domains && domains.length > 0 && !selectedDomain) {
      setSelectedDomain(domains[0].name);
    }
  }, [domains, selectedDomain]);

  if (!isAuthenticated) {
    return;
  }

  const handleDomainSelect = (domainName: string) => {
    setSelectedDomain(domainName);
  };

  return (
    <div>
      <AddNewDomainForm
        onDomainAdded={fetchDomains}
        onDomainSelect={handleDomainSelect}
      />
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
