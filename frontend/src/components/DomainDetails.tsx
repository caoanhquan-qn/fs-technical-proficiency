import React, { useEffect } from "react";
import useValidateDomain from "../api/useValidateDomain";
import { IDomainDetail } from "../interfaces";

type TProps = {
  domainName: string | null;
};

const DomainDetails: React.FC<TProps> = ({ domainName }) => {
  const { loading, error, data, validateDomain } = useValidateDomain();

  useEffect(() => {
    if (domainName) {
      validateDomain(domainName);
    }
  }, [domainName]);

  const displayData = (data: IDomainDetail) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="mb-4">
        <h2 className="text-lg font-semibold text-blue-600">{key}</h2>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-medium ${
              value.status === "pass" ? "text-green-600" : "text-red-600"
            }`}
          >
            {value.status}
          </span>
        </p>
        <p className="text-sm text-gray-700 mt-1">
          <strong>Details:</strong> {value.details}
        </p>
      </div>
    ));
  };

  return (
    <div style={{ marginRight: "1rem" }}>
      <h2 className="text-xl font-bold mb-4">Domain Details</h2>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md">
        {data && displayData(data)}
      </div>
    </div>
  );
};

export default DomainDetails;
