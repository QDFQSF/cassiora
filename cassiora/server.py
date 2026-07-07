#!/usr/bin/env python3
"""
Cassiora Traiteur — Serveur local
Lance avec : python server.py
ou double-clic sur Cassiora.bat
"""
import http.server
import socketserver
import json
import os
import sys
import threading
import webbrowser
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import time

PORT = 5000
BASE_DIR = Path(__file__).parent
DOCS_DIR = BASE_DIR / "docs"
DOCS_DIR.mkdir(exist_ok=True)
DEPENSES_DIR = BASE_DIR / "depenses"
DEPENSES_DIR.mkdir(exist_ok=True)

class CassioraHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def log_message(self, format, *args):
        pass  # silence les logs

    def do_GET(self):
        parsed = urlparse(self.path)

        # API : liste des docs
        if parsed.path == "/api/docs":
            docs = []
            for f in sorted(DOCS_DIR.glob("*.json"), key=lambda x: x.stat().st_mtime, reverse=True):
                try:
                    data = json.loads(f.read_text(encoding="utf-8"))
                    docs.append(data)
                except:
                    pass
            self._json(docs)

        # API : liste dépenses
        elif parsed.path == "/api/depenses":
            deps = []
            for f in sorted(DEPENSES_DIR.glob("*.json"), key=lambda x: x.stat().st_mtime):
                try:
                    deps.append(json.loads(f.read_text(encoding="utf-8")))
                except:
                    pass
            self._json(deps)

        # API : un doc
        elif parsed.path.startswith("/api/docs/"):
            doc_id = parsed.path.split("/api/docs/")[1]
            doc_file = DOCS_DIR / f"{doc_id}.json"
            if doc_file.exists():
                self._json(json.loads(doc_file.read_text(encoding="utf-8")))
            else:
                self._err(404, "Document introuvable")

        # fichiers statiques
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)

        # API : sauvegarder doc
        if parsed.path == "/api/docs":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            try:
                doc = json.loads(body)
                doc_id = doc.get("id", f"doc_{int(time.time()*1000)}")
                doc["id"] = doc_id
                doc["savedAt"] = int(time.time() * 1000)
                doc_file = DOCS_DIR / f"{doc_id}.json"
                doc_file.write_text(json.dumps(doc, ensure_ascii=False, indent=2), encoding="utf-8")
                self._json({"ok": True, "id": doc_id})
            except Exception as e:
                self._err(500, str(e))
        # API : sauvegarder dépense
        elif parsed.path == "/api/depenses":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            try:
                dep = json.loads(body)
                dep_id = dep.get("id", f"dep_{int(time.time()*1000)}")
                dep["id"] = dep_id
                dep_file = DEPENSES_DIR / f"{dep_id}.json"
                dep_file.write_text(json.dumps(dep, ensure_ascii=False, indent=2), encoding="utf-8")
                self._json({"ok": True, "id": dep_id})
            except Exception as e:
                self._err(500, str(e))
        else:
            self._err(404, "Route inconnue")

    def do_DELETE(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/docs/"):
            doc_id = parsed.path.split("/api/docs/")[1]
            doc_file = DOCS_DIR / f"{doc_id}.json"
            if doc_file.exists():
                doc_file.unlink()
                self._json({"ok": True})
            else:
                self._err(404, "Document introuvable")
        elif parsed.path.startswith("/api/depenses/"):
            dep_id = parsed.path.split("/api/depenses/")[1]
            dep_file = DEPENSES_DIR / f"{dep_id}.json"
            if dep_file.exists():
                dep_file.unlink()
                self._json({"ok": True})
            else:
                self._err(404, "Dépense introuvable")
        else:
            self._err(404, "Route inconnue")

    def do_OPTIONS(self):
        self.send_response(200)
        self._cors_headers()
        self.end_headers()

    def _json(self, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def _err(self, code, msg):
        body = json.dumps({"error": msg}).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def _cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

def open_browser():
    time.sleep(0.8)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    print(f"""
╔══════════════════════════════════════╗
║       CASSIORA TRAITEUR              ║
║       Serveur local démarré          ║
╠══════════════════════════════════════╣
║  http://localhost:{PORT}               ║
║  Fermer cette fenêtre = arrêt        ║
╚══════════════════════════════════════╝
""")
    threading.Thread(target=open_browser, daemon=True).start()
    with socketserver.TCPServer(("", PORT), CassioraHandler) as httpd:
        httpd.allow_reuse_address = True
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServeur arrêté.")
