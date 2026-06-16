from flask import Blueprint, jsonify, request, current_app
from bson import ObjectId

product_bp = Blueprint("product_bp", __name__)


# ---------------------------
# GET ALL PRODUCTS
# ---------------------------
@product_bp.route("/", methods=["GET"])
def get_products():
    db = current_app.db

    products = []

    for product in db.products.find().sort("createdAt", -1):

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),

            # RETURN ORIGINAL URL
            "images": product.get("images", []),

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
        product = db.products.find_one({
            "_id": ObjectId(product_id)
        })

        if not product:
            return jsonify({"message": "Product not found"}), 404

        return jsonify({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),
            "images": product.get("images", []),
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

    query = {
        "name": {
            "$regex": keyword,
            "$options": "i"
        }
    }

    products = []

    for product in db.products.find(query):

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),
            "images": product.get("images", [])
        })

    return jsonify(products), 200


# ---------------------------
# LATEST PRODUCTS
# ---------------------------
@product_bp.route("/latest", methods=["GET"])
def latest_products():
    db = current_app.db

    products = []

    cursor = db.products.find().sort(
        "createdAt",
        -1
    ).limit(8)

    for product in cursor:

        products.append({
            "_id": str(product["_id"]),
            "name": product.get("name"),
            "description": product.get("description"),
            "price": product.get("price"),
            "images": product.get("images", [])
        })

    return jsonify(products), 200