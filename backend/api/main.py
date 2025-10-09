from flask import Flask
from flask_cors import CORS
from importlib import import_module

def create_app():
    app = Flask(__name__)
    CORS(app)

    modules = ["reports"]
    for module in modules:
        mod = import_module(f"modules.{module}.routes")
        app.register_blueprint(mod.bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

