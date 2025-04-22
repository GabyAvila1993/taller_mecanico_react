from db import db

class Reparacion(db.Model):
    __tablename__ = 'reparaciones'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(20), nullable=False)  # Campo obligatorio
    descripcion_problema = db.Column(db.Text, nullable=False)
    trabajos_realizados = db.Column(db.Text, nullable=False)
    costo = db.Column(db.Float, nullable=False)
    vehiculo_id = db.Column(db.Integer, db.ForeignKey('vehiculos.id'), nullable=False)