"""Tiny static server with live-reload for local preview only.

Serves the current directory, injects a small polling script into every
HTML response so the browser auto-reloads whenever a watched file
(.html/.css/.js) changes on disk. Nothing is written to disk — the
injection happens only in the HTTP response, never touching the real files.
"""
import http.server
import os
import socketserver
import sys

PORT = 8791
WATCH_EXT = (".html", ".css", ".js")

RELOAD_SNIPPET = b"""
<script>
(function () {
  var last = null;
  function poll() {
    fetch('/__mtime__', { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        if (last === null) { last = t; }
        else if (t !== last) { location.reload(); }
      })
      .catch(function () {})
      .finally(function () { setTimeout(poll, 700); });
  }
  poll();
})();
</script>
</body>"""


def latest_mtime(root):
    newest = 0.0
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if not d.startswith(".")]
        for name in filenames:
            if name.endswith(WATCH_EXT):
                path = os.path.join(dirpath, name)
                try:
                    newest = max(newest, os.path.getmtime(path))
                except OSError:
                    pass
    return newest


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def do_GET(self):
        if self.path == "/__mtime__":
            body = str(latest_mtime(".")).encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return

        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, "index.html")

        if path.endswith(".html") and os.path.isfile(path):
            with open(path, "rb") as f:
                content = f.read()
            if b"</body>" in content:
                content = content.replace(b"</body>", RELOAD_SNIPPET, 1)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(content)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(content)
            return

        super().do_GET()


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with ReusableTCPServer(("", PORT), Handler) as httpd:
        print(f"Live-reload server at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            sys.exit(0)
