from http.server import BaseHTTPRequestHandler


from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://2298641141:Cjry9feGtROWe4ei@shortcutconfig.ugbga01.mongodb.net/?retryWrites=true&w=majority&appName=shortcutConfig"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection

    
 
class handler(BaseHTTPRequestHandler):
 
    def do_POST(self):
        try:
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write('Hello, world!'.encode('utf-8'))
        return