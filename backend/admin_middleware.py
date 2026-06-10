from flask_jwt_extended import get_jwt_identity
from flask import current_app, jsonify

def check_admin():

    user_id = get_jwt_identity()

    user = current_app.db.users.find_one(
        {"_id": user_id}
    )

    if not user:
        return False

    return user["role"] == "admin"