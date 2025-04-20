from flask import Flask
from flask_cors import CORS
from db import db
from routes.cliente_routes import cliente_bp

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Gabriel1993***@localhost/taller_mecanico'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(cliente_bp, url_prefix='/api/clientes')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)