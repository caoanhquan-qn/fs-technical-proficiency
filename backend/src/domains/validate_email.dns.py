import dns.resolver
import json

def check_spf(domain):
    try:
        answers = dns.resolver.resolve(domain, 'TXT')
        for rdata in answers:
            for txt_string in rdata.strings:
                if txt_string.decode().startswith("v=spf1"):
                    return {"status": "pass", "details": txt_string.decode()}
        return {"status": "fail", "details": "SPF record not found"}
    except Exception as e:
        return {"status": "fail", "details": str(e)}

def check_dmarc(domain):
    dmarc_domain = f"_dmarc.{domain}"
    try:
        answers = dns.resolver.resolve(dmarc_domain, 'TXT')
        for rdata in answers:
            for txt_string in rdata.strings:
                if txt_string.decode().startswith("v=DMARC1"):
                    return {"status": "pass", "details": txt_string.decode()}
        return {"status": "fail", "details": "DMARC record not found"}
    except Exception as e:
        return {"status": "fail", "details": str(e)}

def check_dkim(domain, selector='default'):
    dkim_domain = f"{selector}._domainkey.{domain}"
    try:
        answers = dns.resolver.resolve(dkim_domain, 'TXT')
        for rdata in answers:
            for txt_string in rdata.strings:
                if txt_string.decode().startswith("v=DKIM1"):
                    return {"status": "pass", "details": txt_string.decode()}
        return {"status": "fail", "details": "DKIM record not found or invalid selector"}
    except Exception as e:
        return {"status": "fail", "details": str(e)}

def validate_domain(domain, dkim_selector='default'):
    results = {
        "SPF": check_spf(domain),
        "DMARC": check_dmarc(domain),
        "DKIM": check_dkim(domain, selector=dkim_selector)
    }
    return results

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python validate_email_dns.py <domain> [dkim_selector]")
        sys.exit(1)

    domain = sys.argv[1]
    dkim_selector = sys.argv[2] if len(sys.argv) > 2 else 'default'
    result = validate_domain(domain, dkim_selector)
    print(json.dumps(result, indent=2))
