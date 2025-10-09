from flask import Blueprint, jsonify

bp = Blueprint("reports", __name__, url_prefix="/api/reports")

@bp.route("/balance-sheet")
def balance_sheet():
    return jsonify({"report": "Balance Sheet", "data": []})

@bp.route("/profit-loss")
def profit_loss():
    return jsonify({"report": "Profit & Loss", "data": []})

