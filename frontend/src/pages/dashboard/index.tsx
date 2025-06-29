import React from "react";
import AddNewDomainForm from "../../components/AddNewDomainForm";
import DomainList from "../../components/DomainList";

export default function Dashboard() {
  return (
    <div>
      <AddNewDomainForm />
      <DomainList />
    </div>
  );
}
