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


app = Flask(__name__)
# CORS(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY']='Lolalolalolla'
db = SQLAlchemy(app)

app.run()
