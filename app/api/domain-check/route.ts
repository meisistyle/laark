import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

function makeSuggestions(name: string): string[] {
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const year  = new Date().getFullYear();
  return [
    `${clean}${year}.com`,
    `${clean}studio.com`,
    `${clean}co.com`,
    `get${clean}.com`,
    `${clean}hq.com`,
    `${clean}online.com`,
  ];
}

export async function GET(req: NextRequest) {
  const name = (req.nextUrl.searchParams.get("name") ?? "").trim();
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const clean  = name.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const domain = clean + ".com";

  try {
    await dns.resolve4(domain);
    // Got A records → domain has DNS → likely registered/taken
    return NextResponse.json({
      domain,
      available:   false,
      suggestions: makeSuggestions(clean),
    });
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      // No DNS records → likely available
      return NextResponse.json({ domain, available: true });
    }
    // Lookup error (SERVFAIL etc.) — return uncertain
    return NextResponse.json({ domain, available: null });
  }
}
