"""
Hackathon @ DUK 2024 - Vyuahm

SeedLink -  Linking ideas with capitol 

The idea is to implement a startup director and funding source
This would help with fetching capital and ideas

Author : Danwand NS
"""


from flask import Flask, request, Response, jsonify
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt  # JWT library
from datetime import datetime, timedelta
from pytz import timezone 
from decorators import token_required
from extensions import db 
from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
# CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
from config import SECRET_KEY
app.config['SECRET_KEY'] = SECRET_KEY
db.init_app(app)

class User(db.Model):
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    is_admin = db.Column(db.String(1), nullable=True)


class Company(db.Model):
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    ceo = db.Column(db.String(80), nullable=False)
    cto = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    website = db.Column(db.String(80), nullable=False)
    following = db.Column(db.Integer(), nullable=False)
    donation = db.Column(db.Integer(), nullable=False)

class Donation(db.Model):
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone("Asia/Kolkata")))

with app.app_context():
    print("Pre flight check  " + str(app.name))
    db.create_all()    
    print("Database Initialized")

@app.route('/get_all_company', methods=['GET'])
def get_all_company():
    all_company = Company.query.all()
    result = []

    for company in all_company:
        company_data = {
            'id': company.id,
            'name': company.name,
            'ceo': company.ceo,
            'cto': company.cto,
            'address': company.address,
            'phone': company.phone,
            'email': company.email,
            'website': company.website,
            'following': company.following,
            'donation': company.donation
        }
        result.append(company_data)

    return jsonify(result)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if data.get('is_admin'):
        is_admin = data.get('is_admin')
    else:
        is_admin = None
    print(password)
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, is_admin=is_admin)

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        # Rollback the session and handle the integrity error
        db.session.rollback()
        return jsonify({'error': 'Username already exists'}), 409
    
    return jsonify({'message': 'User added successfully'})

@app.route('/donate', methods=['POST'])
@token_required
def donate(current_user):
    data = request.get_json()
    company_id = data.get('company_id')
    amount = data.get('amount')

    company = Company.query.get(company_id)
    if not company:
        return jsonify({'message': 'Company not found'}), 404

    # Create and save the donation
    donation = Donation(user_id=current_user.id, company_id=company_id, amount=amount)
    db.session.add(donation)
    db.session.commit()

    # Update the company's donation total
    company.donation += amount
    db.session.commit()

    return jsonify({'message': f'Donated {amount} to {company.name}'})

# @app.route('/admin/register_company')
# @app.route('/admin/delcompany')


# @app.route('/company_dashboard')
# @token_required

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    print(user)

    if user and bcrypt.check_password_hash(user.password, password):
        # Generate JWT token
        token = jwt.encode({
            'username': user.username,
            'is_admin': user.is_admin,
            'exp': datetime.now(timezone("Asia/Kolkata")) + timedelta(hours=4)  # Token expiration time
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'message': 'logged in',
            'id': user.id,
            'username': user.username,
            'token': token
        })
    else:
        return jsonify({'message': 'Invalid username or password'}), 401
    
@app.route('/admin/add_company', methods=['POST'])
@token_required
def add_company(current_user):
    # Check if the user is an admin
    if current_user.is_admin != 'x':
        return jsonify({'message': 'Admin access required'}), 403

    data = request.get_json()
    name = data.get('name')
    ceo = data.get('ceo')
    cto = data.get('cto')
    address = data.get('address')
    phone = data.get('phone')
    email = data.get('email')
    website = data.get('website')   
    following = data.get('following', 0)  # Set default following to 0
    donation = data.get('donation', 0)  # Set default donation to 0

    # Check if company already exists
    if Company.query.filter_by(name=name).first():
        return jsonify({'message': 'Company already exists'}), 409

    # Add the new company
    new_company = Company(
        name=name,
        ceo=ceo,
        cto=cto,
        address=address,
        phone=phone,
        email=email,
        website=website,
        following=following,
        donation=donation
    )
    db.session.add(new_company)
    db.session.commit()

    return jsonify({'message': f'Company {name} added successfully'}), 201

if __name__=="__main__":
    app.run(debug=True)
