from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

# ----------------------------------
# REGISTER
# ----------------------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.json or {}
        db = current_app.db

        email = data.get("email")
        password = data.get("password")
        name = data.get("name")

        if not email or not password or not name:
            return jsonify({"message": "All fields are required"}), 400

        existing = db.users.find_one({"email": email})

        if existing:
            return jsonify({"message": "Email already exists"}), 400

        db.users.insert_one({
            "name": name,
            "email": email,
            "password": generate_password_hash(password),
            "role": "user"
        })

        return jsonify({"message": "Registration successful"}), 201

    except Exception as e:
        print("REGISTER ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# LOGIN (FIXED)
# ----------------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json or {}
        db = current_app.db

        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"message": "Email and password required"}), 400

        user = db.users.find_one({"email": email})

        if not user:
            return jsonify({"message": "User not found"}), 404

        if not check_password_hash(user["password"], password):
            return jsonify({"message": "Invalid password"}), 401

        token = create_access_token(
            identity=str(user["_id"]),
            additional_claims={
                "role": user.get("role", "user"),
                "email": user.get("email")
            }
        )

        return jsonify({
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "name": user.get("name"),
                "email": user.get("email"),
                "role": user.get("role", "user")
            }
        }), 200

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# ADMIN CREATOR
# ----------------------------------
@auth_bp.route("/create-admin", methods=["GET"])
def create_admin():
    try:
        db = current_app.db

        db.users.delete_one({"email": "admin@gmail.com"})

        db.users.insert_one({
            "name": "Admin",
            "email": "admin@gmail.com",
            "password": generate_password_hash("Admin@1234"),
            "role": "admin"
        })

        return jsonify({"message": "Admin created successfully"}), 201

    except Exception as e:
        print("ADMIN ERROR:", e)
        return jsonify({"error": str(e)}), 500