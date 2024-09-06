export type Mail = {
  id: string;
  title: string;
  vendor: string;
  url: string;
  publication_date: string;
  read?: boolean;
  cves: string[];
  severity: string;
};
