from functools import wraps
from flask import jsonify
from flask import current_app

from flask_jwt_extended import (
    get_jwt_identity,
    verify_jwt_in_request
)

from bson import ObjectId


def admin_required(fn):

    @wraps(fn)
    def wrapper(*args, **kwargs):

        verify_jwt_in_request()

        user_id = get_jwt_identity()

        db = current_app.db

        user = db.users.find_one({
            "_id": ObjectId(user_id)
        })

        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        if user.get("role") != "admin":
            return jsonify({
                "message": "Admin access required"
            }), 403

        return fn(*args, **kwargs)

    return wrapper