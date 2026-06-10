from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth_bp", __name__)

# demo users (replace with MongoDB later)
USERS = {
    "admin@gmail.com": {
        "password": "admin123",
        "role": "admin"
    },
    "user@gmail.com": {
        "password": "user123",
        "role": "user"
    }
}

@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = USERS.get(email)

    if not user or user["password"] != password:
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity={
        "email": email,
        "role": user["role"]
    })

    return jsonify({
        "token": token,
        "user": {
            "email": email,
            "role": user["role"]
        }
    }), 200