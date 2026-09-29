/**
 * Sender branding shared by every Postmark-style transactional template.
 * Reference HTML hardcodes these as "[Product Name]", "[Company Name, LLC]",
 * the street lines, and https://example.com. Buildable templates take them
 * as props.
 */
export interface EmailBrandProps {
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}
