from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from pymongo import MongoClient
import cloudinary

from config import Config
import os

# ---------------------------
# CLOUDINARY CONFIG
# ---------------------------
cloudinary.config(
    cloud_name="Root",
    api_key="394717172676224",
    api_secret="MvuDdUDSIgP7Uw9KNfOy0IIJMM4"
)

print("MONGO_URI =", Config.MONGO_URI)
print("JWT_SECRET_KEY =", Config.JWT_SECRET_KEY)

# ---------------------------
# INIT APP
# ---------------------------
app = Flask(__name__)

# ---------------------------
# CONFIG
# ---------------------------
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY

# ---------------------------
# CORS
# ---------------------------
CORS(app)

# ---------------------------
# EXTENSIONS
# ---------------------------
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
# BLUEPRINTS
# ---------------------------
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.admin_routes import admin_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(product_bp, url_prefix="/api/products")
app.register_blueprint(admin_bp, url_prefix="/api/admin")

# ---------------------------
# HOME ROUTE
# ---------------------------
@app.route("/")
def home():
    return jsonify({"message": "Backend Running"})

# ---------------------------
# DB TEST
# ---------------------------
@app.route("/test-db")
def test_db():
    try:
        client.admin.command("ping")
        return {"status": "MongoDB Connected"}
    except Exception as e:
        return {"status": "Failed", "error": str(e)}


# ---------------------------
# RUN SERVER
# ---------------------------
if __name__ == "__main__":
    socketio.run(
        app,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        allow_unsafe_werkzeug=True
    )