export interface IDomain {
  id: string;
  name: string;
}

export interface IDomainDetail {
  SPF: {
    status: string;
    details: string;
  };
  DKIM: {
    status: string;
    details: string;
  };
  DMARC: {
    status: string;
    details: string;
  };
}
