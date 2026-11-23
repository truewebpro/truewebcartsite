// Cut from the approved mockup by buildtmp/gen_site_pieces.py. Edit the mockup, then run the script again.
import { DEMO_SHOP_URL } from "../../../site/links";

export function TplButtonsLight() {
  return (
<div style={{ position: "relative", display: "flex", gap: "12px" }}><a className="h-dlink" href="/websites#templates" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", borderRadius: "99px", background: "#081F45", color: "#FFFFFF", fontSize: "17px", fontWeight: "800" }}>Browse all templates <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a><a className="h-dlink" href={DEMO_SHOP_URL} style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: "99px", border: "2px solid #081F45", fontSize: "17px", fontWeight: "800", color: "#081F45" }}>Preview</a></div>
  );
}

export function TplButtonsDark() {
  return (
<div style={{ position: "relative", display: "flex", gap: "12px" }}><a className="h-dlink" href="/websites#templates" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", borderRadius: "99px", background: "#FFFFFF", color: "#081F45", fontSize: "17px", fontWeight: "800" }}>Browse all templates <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#081F45" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a><a className="h-dlink" href={DEMO_SHOP_URL} style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: "99px", border: "2px solid #FFFFFF", fontSize: "17px", fontWeight: "800", color: "#FFFFFF" }}>Preview</a></div>
  );
}
