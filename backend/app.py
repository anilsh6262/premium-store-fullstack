from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from pymongo import MongoClient
from flask import send_from_directory

from config import Config

# ---------------------------
# INIT APP
# ---------------------------
app = Flask(__name__)


# ---------------------------
# CONFIG
# ---------------------------
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
from flask_cors import CORS
CORS(app, resources={r"/*": {"origins": "*"}})
# ---------------------------
# EXTENSIONS
# ---------------------------
CORS(app)

jwt = JWTManager(app)

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading"
)

# ---------------------------
# DATABASE
# ---------------------------
client = MongoClient(Config.MONGO_URI)
db = client["product_store"]

app.db = db
app.socketio = socketio

# ---------------------------
# IMPORT BLUEPRINTS (IMPORTANT)
# ---------------------------
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.admin_routes import admin_bp

# ---------------------------
# REGISTER BLUEPRINTS
# ---------------------------

# AUTH → /api/auth/login
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

# PRODUCTS → /api/products
app.register_blueprint(
    product_bp,
    url_prefix="/api/products"
)

# ADMIN → /api/admin
app.register_blueprint(
    admin_bp,
    url_prefix="/api/admin"
)
@app.route("/uploads/products/<filename>")
def uploaded_file(filename):
    return send_from_directory(
        "uploads/products",
        filename
    )
# ---------------------------
# RUN SERVER
# ---------------------------
# ---------------------------
# RUN SERVER
# ---------------------------
import os

# ---------------------------
# RUN SERVER
# ---------------------------
import os

if __name__ == "__main__":
    socketio.run(
        app,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        allow_unsafe_werkzeug=True
    )