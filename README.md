# TaskFlow Kanban

A minimal Kanban board built with HTML, CSS, and JavaScript,
served through Nginx in Docker.

## Features

- View tasks across To Do, In Progress, and Done columns
- Add tasks
- Move tasks between columns
- Delete tasks
- Responsive layout

## Run locally without Docker

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Run with Docker
Build the image:
```bash
docker build -t taskflow-kanban:1.0 .
```

Run the container:
```bash
docker run -d \
  --name taskflow-kanban \
  -p 8080:80 \
  taskflow-kanban:1.0
```

Open http://localhost:8080 

Stop and remove the container:
```bash
docker stop taskflow-kanban
docker rm taskflow-kanban
```

## Run with Kubernetes

Create a local cluster:

```bash
kind create cluster --name taskflow
```

Load the Docker image:
```bash
kind load docker-image taskflow-kanban:1.0 --name taskflow
```

Apply the Kubernetes resources:
```bash
kubectl apply -f k8s/
```

Check the deployment:
```bash
kubectl get pods -n taskflow
```

Access the application:
```bash
kubectl port-forward -n taskflow service/kanban 8080:80
```

Open http://localhost:8080 


Delete the cluster:
```bash
kind delete cluster --name taskflow
```