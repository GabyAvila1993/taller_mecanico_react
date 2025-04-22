from db import db

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(200), nullable=False)

    # Relación con Vehiculo (sin backref)
    lista_vehiculos = db.relationship('Vehiculo', lazy=True)