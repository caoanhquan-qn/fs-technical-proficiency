import React, { useState } from "react";
import useAddNewDomain from "../api/useAddNewDomain";

interface AddNewDomainFormProps {
  onDomainAdded: () => void;
}

const AddNewDomainForm: React.FC<AddNewDomainFormProps> = ({
  onDomainAdded,
}) => {
  const [domainName, setDomainName] = useState("");
  const { error, addNewDomain } = useAddNewDomain();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNewDomain(domainName);
    setDomainName("");
    onDomainAdded();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Add New Domain</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <label
          htmlFor="domain"
          className="block text-sm font-medium text-gray-700"
        >
          Domain Name
        </label>
        <input
          id="domain"
          type="text"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Domain
      </button>
    </form>
  );
};

export default AddNewDomainForm;
