FROM python:3.11-slim-buster

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8080

#CMD [ "python3", "-m" , "flask","--app=main", "run", "--host=0.0.0.0"]
#CMD [ "python3", "fileone.py"]
CMD ["functions-framework" "--target hello" "--debug"]