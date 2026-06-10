
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

# ----------------------------------
# REGISTER
# ----------------------------------
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json
    db = current_app.db

    email = data.get("email")

    existing = db.users.find_one({"email": email})

    if existing:
        return jsonify({"message": "Email already exists"}), 400

    db.users.insert_one({
        "name": data.get("name"),
        "email": email,
        "password": generate_password_hash(data.get("password")),
        "role": "user"
    })

    return jsonify({"message": "Registration successful"}), 201


# ----------------------------------
# LOGIN
# ----------------------------------
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json
    db = current_app.db

    user = db.users.find_one({"email": data.get("email")})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], data.get("password")):
        return jsonify({"message": "Invalid password"}), 401

    token = create_access_token(
    identity=str(user["_id"]),
    additional_claims={
        "role": user["role"],
        "email": user["email"]
    }
)

    return jsonify({
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200


# ----------------------------------
# 👇 ADD THIS (ADMIN CREATOR)
# ----------------------------------
@auth_bp.route("/create-admin", methods=["GET"])
def create_admin():
    db = current_app.db

    # remove old admin (optional)
    db.users.delete_one({"email": "admin@gmail.com"})

    db.users.insert_one({
        "name": "Admin",
        "email": "admin@gmail.com",
        "password": generate_password_hash("Admin@1234"),
        "role": "admin"
    })

    return jsonify({"message": "Admin created successfully"}), 201