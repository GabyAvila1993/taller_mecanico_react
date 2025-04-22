from flask import Flask
from flask_cors import CORS
from db import db
from routes.cliente_routes import cliente_bp
from routes.vehiculo_routes import vehiculo_bp
from routes.reparacion_routes import reparacion_bp
from flask import Flask, flash

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/taller_mecanico'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Clave secreta para mensajes flash
app.secret_key = 'clave_secreta_para_mensajes_flash'

db.init_app(app)

app.register_blueprint(cliente_bp, url_prefix='/api/clientes')
app.register_blueprint(vehiculo_bp, url_prefix='/api/vehiculos')
app.register_blueprint(reparacion_bp, url_prefix='/api/reparaciones')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)