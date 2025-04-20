from flask import Blueprint, request, jsonify
from models.reparacion import Reparacion
from db import db

reparacion_bp = Blueprint('reparacion_bp', __name__)

@reparacion_bp.route('/', methods=['GET'])
def get_reparaciones():
    reparaciones = Reparacion.query.all()
    return jsonify([{
        'id': r.id,
        'fecha': r.fecha,
        'descripcion_problema': r.descripcion_problema,
        'trabajos_realizados': r.trabajos_realizados,
        'costo': r.costo,
        'vehiculo_id': r.vehiculo_id
    } for r in reparaciones])

@reparacion_bp.route('/<int:id>', methods=['GET'])
def get_reparacion(id):
    reparacion = Reparacion.query.get_or_404(id)
    return jsonify({
        'id': reparacion.id,
        'fecha': reparacion.fecha,
        'descripcion_problema': reparacion.descripcion_problema,
        'trabajos_realizados': reparacion.trabajos_realizados,
        'costo': reparacion.costo,
        'vehiculo_id': reparacion.vehiculo_id
    })

@reparacion_bp.route('/', methods=['POST'])
def create_reparacion():
    data = request.json
    nueva = Reparacion(
        fecha=data['fecha'],
        descripcion_problema=data['descripcion_problema'],
        trabajos_realizados=data['trabajos_realizados'],
        costo=data['costo'],
        vehiculo_id=data['vehiculo_id']
    )
    db.session.add(nueva)
    db.session.commit()
    return jsonify({'message': 'Reparación creada'}), 201

@reparacion_bp.route('/<int:id>', methods=['PUT'])
def update_reparacion(id):
    data = request.json
    reparacion = Reparacion.query.get_or_404(id)
    reparacion.fecha = data['fecha']
    reparacion.descripcion_problema = data['descripcion_problema']
    reparacion.trabajos_realizados = data['trabajos_realizados']
    reparacion.costo = data['costo']
    reparacion.vehiculo_id = data['vehiculo_id']
    db.session.commit()
    return jsonify({'message': 'Reparación actualizada'})

@reparacion_bp.route('/<int:id>', methods=['DELETE'])
def delete_reparacion(id):
    reparacion = Reparacion.query.get_or_404(id)
    db.session.delete(reparacion)
    db.session.commit()
    return jsonify({'message': 'Reparación eliminada'})