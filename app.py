from flask import Flask, request, jsonify, render_template, flash, redirect, url_for, session
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo,MongoClient
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "asdfghjklpoiuytrewqzxcvbnm1245789630"
app.config["MONGO_URI"] = "mongodb+srv://nipotdar:niks1234@cluster0.sfi1ax8.mongodb.net/test"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
collection = mongo.db.venues



# @app.route('/home', methods = ["GET"])
# def home():
#     # sess = request.json.get("session")
#     # print(sess)
#     print(session)
#     if session:
#         if 'firstname' in session:
#             firstname = session['firstname']
#             email = session['email']
#     else:
#         firstname = ""
#         email = ""
#     print(email)
#     response = {
#         "session": session,
#         "firstname": firstname,
#         "email": email
#     }
#     return response

@app.route('/login', methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    response = {
        "email": email,
        "password": password,
        "message": "Received Details"
    }   

    found_user = mongo.db.users.find_one({"email": email})
    if found_user:
        if bcrypt.check_password_hash(found_user['password'], password):
            session['firstname'] = found_user['firstname']
            session['lastname'] = found_user['lastname']
            session['email'] = found_user['email']

            response = {
                "email": email,
                "password": password,
                "session": session['firstname'],
                "message": "Login Successful"
            }   
        
        else:
            response = {
               "message": "Wrong Password. Try Again."
            }
    else:

        response = {
            "message": "User not found"
        }

    print(session)
    return response
    
@app.route('/register', methods=["POST"])
def register():
    firstname = request.json.get("firstname")
    lastname = request.json.get("lastname")
    phone = request.json.get("phone")
    email = request.json.get("email")
    password = request.json.get("password")
    usertype = request.json.get("usertype")

    print("USER DEETS: " + firstname + ' ' + lastname)

    hash_pass = bcrypt.generate_password_hash(password).decode('utf-8')

    mongo.db.users.insert_one({
        "firstname": firstname,
        "lastname": lastname,
        "phone": phone,
        "usertype": usertype,
        "email": email,
        "password": hash_pass,
    })
    
    response = {
        "name": firstname + lastname,
        "message": "RECEIVED CREDS"
    }

    return response

@app.route('/profile')
def profile():
    return {
        "session_email": session['email']
    }

@app.route('/logout')
def logout():
    session.clear()

    return {
        "message": "Logout successful"
    }

@app.route("/data")
def get_documents():

    name=request.args.get('name',default=None)
    location=request.args.get('location',default=None)
    capacity=request.args.get('capacity',default=None)
    search_query=request.args.get('search_query',default=None)

    print(name or location or capacity)

    query={}

    if search_query:
        regex = { '$regex': search_query, '$options': 'i' }
        query = {'$or': [{ 'name': regex },{ 'location': regex }]}
    if name:
        query['name']=name
    if location:
        query['location']=location
    if capacity:
        query['capacity']=int(capacity)
    
    documents = list(collection.find(query))
    
    # convert from BSON to JSON format by converting all the values for the keys to string
    json_docs = []
    for doc in documents:
        json_doc = {}
        for key, value in doc.items():
            json_doc[key] = str(value)
        json_docs.append(json_doc)


    return jsonify(json_docs)

if __name__ == '__name__':
    app.secret_key = "asdfgh"
    #app.run(debug = True)
    app.run(host="0.0.0.0",port=8080,debug=True)