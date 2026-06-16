from flask import Blueprint, jsonify, request, current_app
from bson import ObjectId

product_bp = Blueprint("product_bp", __name__)

BASE_URL = "https://premium-store-fullstack-1.onrender.com"


# ---------------------------
# GET ALL PRODUCTS
# ---------------------------
@product_bp.route("/", methods=["GET"])
def get_products():
    db = current_app.db

    products = []

    for product in db.products.find().sort("createdAt", -1):

        images = product.get("images", [])

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),

            # ✅ FIXED IMAGE URL
            "images": [
                f"{BASE_URL}/uploads/products/{img.split('/')[-1]}"
                for img in images
            ],

            "createdAt": str(product.get("createdAt"))
        })

    return jsonify(products), 200


# ---------------------------
# GET SINGLE PRODUCT
# ---------------------------
@product_bp.route("/<product_id>", methods=["GET"])
def get_product(product_id):
    db = current_app.db

    try:
        product = db.products.find_one({"_id": ObjectId(product_id)})

        if not product:
            return jsonify({"message": "Product not found"}), 404

        images = product.get("images", [])

        return jsonify({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),

            # ✅ FIXED HERE ALSO
            "images": [
                f"{BASE_URL}/uploads/products/{img.split('/')[-1]}"
                for img in images
            ],

            "createdAt": str(product.get("createdAt"))
        }), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# ---------------------------
# SEARCH PRODUCTS
# ---------------------------
@product_bp.route("/search", methods=["GET"])
def search_products():
    db = current_app.db

    keyword = request.args.get("keyword", "")

    query = {"name": {"$regex": keyword, "$options": "i"}}

    products = []

    for product in db.products.find(query):

        images = product.get("images", [])

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),

            # ✅ FIXED
            "images": [
                f"{BASE_URL}/uploads/products/{img.split('/')[-1]}"
                for img in images
            ],
        })

    return jsonify(products), 200


# ---------------------------
# LATEST PRODUCTS
# ---------------------------
@product_bp.route("/latest", methods=["GET"])
def latest_products():
    db = current_app.db

    products = []

    cursor = db.products.find().sort("createdAt", -1).limit(8)

    for product in cursor:

        images = product.get("images", [])

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),

            # ✅ FIXED
            "images": [
                f"{BASE_URL}/uploads/products/{img.split('/')[-1]}"
                for img in images
            ],
        })

    return jsonify(products), 200