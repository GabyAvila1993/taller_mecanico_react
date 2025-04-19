from flask import Flask
from config import db, DATABASE_URL
from models.cliente import Cliente
from models.vehiculo import Vehiculo
from models.reparacion import Reparacion 

from flask_cors import CORS  # para permitir peticiones del frontend

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db.init_app(app)

@app.route('/')
def index():
    return "API Taller Mecánico funcionando"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
