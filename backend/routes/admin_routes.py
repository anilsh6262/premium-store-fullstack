import os
from datetime import datetime

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt
from bson import ObjectId
import cloudinary.uploader

admin_bp = Blueprint("admin_bp", __name__)

# ----------------------------------
# ADMIN CHECK (SIMPLE FIXED VERSION)
# ----------------------------------
def is_admin():
    claims = get_jwt()
    return claims.get("role") == "admin"


# ----------------------------------
# ADD PRODUCT (CLOUDINARY)
# ----------------------------------
@admin_bp.route("/product", methods=["POST"])
@jwt_required()
def add_product():

    if not is_admin():
        return jsonify({"message": "Admin only access"}), 403

    db = current_app.db

    try:
        name = request.form.get("name")
        description = request.form.get("description")
        price = request.form.get("price")

        if not name:
            return jsonify({"message": "Product name required"}), 400

        image_urls = []

        files = request.files.getlist("images")

        for file in files:
            if file.filename == "":
                continue

            # upload to cloudinary
            result = cloudinary.uploader.upload(file)
            image_urls.append(result["secure_url"])

        product = {
            "name": name,
            "description": description,
            "price": float(price),
            "images": image_urls,
            "createdAt": datetime.utcnow()
        }

        result = db.products.insert_one(product)

        current_app.socketio.emit(
            "new_product",
            {
                "message": f"{name} added",
                "productId": str(result.inserted_id)
            }
        )

        return jsonify({
            "message": "Product added successfully",
            "product_id": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# UPDATE PRODUCT
# ----------------------------------
@admin_bp.route("/product/<product_id>", methods=["PUT"])
@jwt_required()
def update_product(product_id):

    if not is_admin():
        return jsonify({"message": "Admin only access"}), 403

    db = current_app.db

    try:
        data = request.json or {}
        update_data = {}

        if "name" in data:
            update_data["name"] = data["name"]

        if "description" in data:
            update_data["description"] = data["description"]

        if "price" in data:
            update_data["price"] = float(data["price"])

        result = db.products.update_one(
            {"_id": ObjectId(product_id)},
            {"$set": update_data}
        )

        if result.modified_count == 0:
            return jsonify({"message": "No changes made"}), 200

        return jsonify({"message": "Product updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# DELETE PRODUCT
# ----------------------------------
@admin_bp.route("/product/<product_id>", methods=["DELETE"])
@jwt_required()
def delete_product(product_id):

    if not is_admin():
        return jsonify({"message": "Admin only access"}), 403

    db = current_app.db

    try:
        product = db.products.find_one({"_id": ObjectId(product_id)})

        if not product:
            return jsonify({"message": "Product not found"}), 404

        # NOTE: Cloudinary delete can be added later if needed

        db.products.delete_one({"_id": ObjectId(product_id)})

        return jsonify({"message": "Product deleted"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# ADMIN PRODUCT LIST
# ----------------------------------
@admin_bp.route("/products", methods=["GET"])
@jwt_required()
def admin_products():

    if not is_admin():
        return jsonify({"message": "Admin only access"}), 403

    db = current_app.db

    products = []

    for product in db.products.find():
        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),
            "images": product.get("images", []),
            "createdAt": str(product.get("createdAt"))
        })

    return jsonify(products), 200