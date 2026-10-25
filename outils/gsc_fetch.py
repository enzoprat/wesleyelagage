#!/usr/bin/env python3
"""Extraction Google Search Console vers CSV. Pagine, throttle, idempotent.

Les donnees brutes vont dans un dossier de travail (--out), pas dans le depot.
Seul l'historique agrege, outils/historique-gsc.csv, est versionne.
"""
import os, json, time, argparse, pathlib, datetime as dt
import pandas as pd
from google.oauth2 import service_account
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
MAX_ROWS = 25000
DEFAUT_SA = pathlib.Path.home() / ".config/gsc/sa.json"


def client():
    sa = os.environ.get("GSC_SA_JSON") or (str(DEFAUT_SA) if DEFAUT_SA.exists() else None)
    if not sa or not pathlib.Path(sa).exists():
        raise SystemExit("Aucun credential GSC.")
    creds = service_account.Credentials.from_service_account_file(sa, scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def query(svc, site, start, end, dims, dtype="web", state="all"):
    rows, start_row = [], 0
    while True:
        body = {"startDate": start, "endDate": end, "dimensions": dims,
                "type": dtype, "rowLimit": MAX_ROWS, "startRow": start_row,
                "dataState": state}
        resp = svc.searchanalytics().query(siteUrl=site, body=body).execute()
        batch = resp.get("rows", [])
        for r in batch:
            rec = dict(zip(dims, r.get("keys", [])))
            rec.update(clicks=r["clicks"], impressions=r["impressions"],
                       ctr=r["ctr"], position=r["position"])
            rows.append(rec)
        if len(batch) < MAX_ROWS:
            break
        start_row += MAX_ROWS
        time.sleep(0.2)
    return rows


def window(j_debut, j_fin, lag=3):
    """Fenetre glissante, les `lag` derniers jours sont exclus (non finalises)."""
    today = dt.date.today()
    return ((today - dt.timedelta(days=lag + j_debut)).isoformat(),
            (today - dt.timedelta(days=lag + j_fin)).isoformat())


def dump(rows, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(rows).to_csv(path, index=False)
    print(f"{path.name:24s} {len(rows):5d} lignes")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site")
    ap.add_argument("--out", default="data")
    ap.add_argument("--list-sites", action="store_true")
    a = ap.parse_args()
    svc = client()

    if a.list_sites:
        for s in svc.sites().list().execute().get("siteEntry", []):
            print(s["permissionLevel"], s["siteUrl"])
        return

    out = pathlib.Path(a.out)
    f = {"d28": window(28, 0), "prev": window(56, 28), "yoy": window(365 + 28, 365),
         "d90": window(90, 0), "d16m": window(485, 0)}

    dump(query(svc, a.site, *f["d16m"], ["date"]), out / "daily.csv")
    dump(query(svc, a.site, *f["d28"], ["query"]), out / "query_28.csv")
    dump(query(svc, a.site, *f["prev"], ["query"]), out / "query_28_prev.csv")
    dump(query(svc, a.site, *f["yoy"], ["query"]), out / "query_28_yoy.csv")
    dump(query(svc, a.site, *f["d28"], ["page"]), out / "page_28.csv")
    dump(query(svc, a.site, *f["prev"], ["page"]), out / "page_28_prev.csv")
    dump(query(svc, a.site, *f["d90"], ["query", "page"]), out / "query_page_90.csv")
    dump(query(svc, a.site, *f["d16m"], ["page", "date"]), out / "page_month.csv")
    dump(query(svc, a.site, *f["d90"], ["query", "device"]), out / "query_device.csv")
    dump(query(svc, a.site, *f["d90"], ["query", "country"]), out / "query_country.csv")
    dump(query(svc, a.site, *f["d90"], ["searchAppearance"]), out / "appearance.csv")

    totals = {}
    for nom, w in (("d28", f["d28"]), ("prev", f["prev"]), ("d90", f["d90"])):
        r = query(svc, a.site, *w, [])
        totals[nom] = {"fenetre": w, **(r[0] if r else {})}
    (out / "totals.json").write_text(json.dumps(totals, indent=2))
    print("totals.json")


if __name__ == "__main__":
    main()
