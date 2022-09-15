FROM arm32v7/python:buster

#COPY qemu-arm-static /usr/bin/

COPY . .

EXPOSE 8000
CMD ["python3", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
