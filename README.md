Backend Setup (Django)

Create a virtual environment and activate it:

Windows:

python -m venv venv
venv\Scripts\activate


Mac/Linux:

python3 -m venv venv
source venv/bin/activate


Install backend dependencies:

pip install -r requirements.txt


Run migrations:

python manage.py migrate

Frontend Setup (Angular)

Navigate to the frontend folder:

cd frontend


Install Node.js dependencies:

npm install


Start Angular development server:

ng serve


Start the Django server:

python manage.py runserver
