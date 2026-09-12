#!/usr/bin/env python3
"""Soumet les URL du sitemap a IndexNow.

A relancer apres chaque mise en ligne qui modifie des pages.
Bing, Yandex, Seznam et Naver partagent les soumissions entre eux.
Google ne participe pas au protocole.

    python3 outils/indexnow.py              # tout le sitemap
    python3 outils/indexnow.py /contact/    # une ou plusieurs pages
"""
import json, re, sys, pathlib, urllib.request, urllib.error

CLE = "bd24c847e1e8caa795384ebb7ffba15a"
HOTE = "www.lcc-espacesverts.fr"
RACINE = pathlib.Path(__file__).resolve().parent.parent
POINT = "https://api.indexnow.org/indexnow"


def urls_du_sitemap():
    sm = (RACINE / "sitemap.xml").read_text(encoding="utf-8")
    # Les entrees en commentaire sont ignorees, comme par les moteurs.
    sm = re.sub(r"<!--.*?-->", "", sm, flags=re.S)
    return re.findall(r"<loc>([^<]+)</loc>", sm)


def main():
    if len(sys.argv) > 1:
        urls = [u if u.startswith("http") else f"https://{HOTE}{u}" for u in sys.argv[1:]]
    else:
        urls = urls_du_sitemap()

    # La cle doit etre lisible en ligne, sinon la soumission est rejetee.
    cle_url = f"https://{HOTE}/{CLE}.txt"
    try:
        with urllib.request.urlopen(cle_url, timeout=15) as r:
            if r.read().decode().strip() != CLE:
                sys.exit(f"Le fichier {cle_url} ne contient pas la cle attendue.")
    except urllib.error.HTTPError as e:
        sys.exit(f"Le fichier de cle repond {e.code}. Verifiez qu'il est bien deploye.")

    charge = {"host": HOTE, "key": CLE, "keyLocation": cle_url, "urlList": urls}
    rq = urllib.request.Request(
        POINT, data=json.dumps(charge).encode("utf-8"), method="POST",
        headers={"Content-Type": "application/json; charset=utf-8"})
    try:
        with urllib.request.urlopen(rq, timeout=30) as r:
            print(f"{len(urls)} URL soumises, HTTP {r.status} {r.reason}")
    except urllib.error.HTTPError as e:
        print(f"Echec, HTTP {e.code} {e.reason}")
        print(e.read().decode()[:400])
        sys.exit(1)


if __name__ == "__main__":
    main()
