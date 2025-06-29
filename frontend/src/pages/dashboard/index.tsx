import React from "react";
import AddNewDomainForm from "../../components/AddNewDomainForm";
import DomainList from "../../components/DomainList";
import useDomainList from "../../api/useDomainList";

export default function Dashboard() {
  const { loading, error, domains, fetchDomains } = useDomainList();
  return (
    <div>
      <AddNewDomainForm onDomainAdded={fetchDomains} />
      <DomainList loading={loading} domains={domains} error={error} />
    </div>
  );
}
